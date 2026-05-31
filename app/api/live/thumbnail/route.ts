import { NextResponse } from 'next/server';

const normalizeThumbnailUrl = (url?: string) => url?.replace(/^http:\/\//i, 'https://') || '';

const getAuthHeaders = () => {
  const tcClientId = process.env.TWITCASTING_CLIENT_ID;
  const tcClientSecret = process.env.TWITCASTING_CLIENT_SECRET;

  const headers: Record<string, string> = {
    'X-Api-Version': '2.0',
  };

  if (tcClientId && tcClientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${tcClientId}:${tcClientSecret}`).toString('base64')}`;
  }

  return headers;
};

const imageResponse = async (res: Response) => {
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok || !contentType.startsWith('image/')) return null;

  return new NextResponse(await res.arrayBuffer(), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=30',
    },
  });
};

const fetchImageUrl = async (url: string) => {
  const res = await fetch(normalizeThumbnailUrl(url), {
    redirect: 'follow',
    cache: 'no-store',
  });
  return imageResponse(res);
};

export async function GET() {
  const tcUserId = process.env.TWITCASTING_USER_ID;

  if (!tcUserId) {
    return new NextResponse('Not configured', { status: 404 });
  }

  const authHeaders = getAuthHeaders();

  try {
    const thumbApiRes = await fetch(
      `https://apiv2.twitcasting.tv/users/${tcUserId}/live/thumbnail?size=large&position=latest`,
      {
        headers: { ...authHeaders, Accept: 'image/*' },
        redirect: 'follow',
        cache: 'no-store',
      }
    );

    const thumbResponse = await imageResponse(thumbApiRes);
    if (thumbResponse) return thumbResponse;

    const liveRes = await fetch(`https://apiv2.twitcasting.tv/users/${tcUserId}/current_live`, {
      headers: { ...authHeaders, Accept: 'application/json' },
      cache: 'no-store',
    });

    if (liveRes.ok) {
      const liveData = await liveRes.json();
      const directUrl =
        normalizeThumbnailUrl(liveData.movie?.large_thumbnail) ||
        normalizeThumbnailUrl(liveData.movie?.small_thumbnail);

      if (directUrl) {
        const directResponse = await fetchImageUrl(directUrl);
        if (directResponse) return directResponse;
      }
    }

    const legacyRes = await fetch(
      `https://twitcasting.tv/api/live/thumbnail.php?user=${tcUserId}&size=large`,
      { redirect: 'follow', cache: 'no-store' }
    );

    const legacyResponse = await imageResponse(legacyRes);
    if (legacyResponse) return legacyResponse;
  } catch (error) {
    console.error('TwitCastingサムネイル取得失敗:', error);
  }

  return new NextResponse('Thumbnail not found', { status: 404 });
}

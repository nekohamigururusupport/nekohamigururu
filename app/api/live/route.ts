// app/api/live/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // ① 鍵の準備
  const tcClientId = process.env.TWITCASTING_CLIENT_ID;
  const tcClientSecret = process.env.TWITCASTING_CLIENT_SECRET;
  const tcUserId = process.env.TWITCASTING_USER_ID;
  const ytApiKey = process.env.YOUTUBE_API_KEY;
  const ytChannelId = process.env.YOUTUBE_CHANNEL_ID;

  let liveData = { isLive: false, platform: '', title: '', url: '', thumbnail: '' };

  // =========================================
  // 🔴 1. YouTubeの配信チェック（優先）
  // =========================================
  if (ytApiKey && ytChannelId) {
    try {
      // YouTubeのAPIは制限が厳しいから、next: { revalidate: 300 } で5分間キャッシュ（一時保存）する！
      const ytRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${ytChannelId}&eventType=live&type=video&key=${ytApiKey}`,
        { next: { revalidate: 300 } } 
      );
      
      const ytData = await ytRes.json();

      if (ytData.items && ytData.items.length > 0) {
        const video = ytData.items[0];
        liveData = {
          isLive: true,
          platform: 'youtube',
          title: video.snippet.title,
          url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          thumbnail: video.snippet.thumbnails?.high?.url || '',
        };
        return NextResponse.json(liveData); // YouTubeが配信中なら即返す！
      }
    } catch (error) {
      console.error('YouTubeの取得失敗:', error);
    }
  }

  // =========================================
  // 🟢 2. ツイキャスの配信チェック
  // =========================================
  if (tcClientId && tcClientSecret && tcUserId) {
    const authString = Buffer.from(`${tcClientId}:${tcClientSecret}`).toString('base64');
    try {
      const tcRes = await fetch(`https://apiv2.twitcasting.tv/users/${tcUserId}/current_live`, {
        headers: {
          'Accept': 'application/json',
          'X-Api-Version': '2.0',
          'Authorization': `Basic ${authString}`,
        },
        cache: 'no-store', // ツイキャスは毎回取りに行く
      });

      if (tcRes.ok) {
        const tcData = await tcRes.json();
        if (tcData.movie) {
          liveData = {
            isLive: true,
            platform: 'twitcasting',
            title: tcData.movie.title || 'ゲリラ配信中🐾',
            url: `https://twitcasting.tv/${tcUserId}`,
            thumbnail: '', // ツイキャスはデフォルトサムネで対応
          };
          return NextResponse.json(liveData);
        }
      }
    } catch (error) {
      console.error('ツイキャスの取得失敗:', error);
    }
  }

  // どっちも配信してない時
  return NextResponse.json({ isLive: false });
}
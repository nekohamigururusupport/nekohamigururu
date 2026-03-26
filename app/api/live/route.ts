// app/api/live/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.TWITCASTING_CLIENT_ID;
  const clientSecret = process.env.TWITCASTING_CLIENT_SECRET;
  const userId = process.env.TWITCASTING_USER_ID;

  if (!clientId || !clientSecret || !userId) {
    return NextResponse.json({ isLive: false, error: 'APIキーが設定されてないぜ🐾' }, { status: 500 });
  }

  // ツイキャスのAPIは、IDとSecretを合体させてBase64（暗号化）したものをカギとして使うルールだ
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    // ぐるるちゃん（userId）の現在の配信情報を取得するAPIを叩く！
    const res = await fetch(`https://apiv2.twitcasting.tv/users/${userId}/current_live`, {
      headers: {
        'Accept': 'application/json',
        'X-Api-Version': '2.0',
        'Authorization': `Basic ${authString}`,
      },
      // 毎回最新の情報を取るためにキャッシュを無効化
      cache: 'no-store',
    });

    if (!res.ok) {
      // 配信してない時（404）は普通のことだからエラーにしない
      if (res.status === 404) {
        return NextResponse.json({ isLive: false });
      }
      throw new Error(`ツイキャスAPIエラー: ${res.status}`);
    }

    const data = await res.json();
    
    // 配信中なら詳細データを返す
    if (data.movie) {
      return NextResponse.json({
        isLive: true,
        title: data.movie.title || 'ゲリラ配信中🐾',
        url: `https://twitcasting.tv/${userId}`,
      });
    }

    return NextResponse.json({ isLive: false });

  } catch (error) {
    console.error('ライブ状態の取得に失敗:', error);
    return NextResponse.json({ isLive: false, error: '取得失敗' }, { status: 500 });
  }
}
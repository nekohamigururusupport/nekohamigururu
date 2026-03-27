// app/api/calendar/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const CALENDAR_ID = 'nekohami.gururu.support@gmail.com';
  // 手元の .env.local や Vercelから鍵を読み込むぜ！
  const API_KEY = process.env.YOUTUBE_API_KEY; 

  if (!API_KEY) {
    return NextResponse.json({ error: 'APIキーが見つからないぜ！' }, { status: 500 });
  }

  const timeMin = new Date().toISOString();
  // ★ ここでYouTubeの鍵（Google共通）を使ってカレンダーを取得する！
  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=4`;

  try {
    // 1分（60秒）に1回、最新の予定をGoogleに見に行く設定だ！
    const res = await fetch(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      throw new Error('Googleカレンダーからデータが取れなかったぜ');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('カレンダーの取得エラー:', error);
    return NextResponse.json({ error: '取得に失敗したぜ' }, { status: 500 });
  }
}
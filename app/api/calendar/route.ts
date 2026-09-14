import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const CALENDAR_ID = 'nekohami.gururu.support@gmail.com';
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'APIキーが見つからないぜ！' }, { status: 500 });
  }

  const timeMin = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${encodeURIComponent(timeMin)}&singleEvents=true&orderBy=startTime&maxResults=4`;

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Googleカレンダーからデータが取れなかったぜ');
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('カレンダーの取得エラー:', error);
    return NextResponse.json({ error: '取得に失敗したぜ' }, { status: 500 });
  }
}

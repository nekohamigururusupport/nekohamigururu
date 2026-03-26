import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // ▼ 検索結果やブラウザのタブに出る基本情報
  title: "猫喰ぐるる🐾 公式サイト",
  description: "新人VTuber 猫喰ぐるる（Nekohami Gururu）の公式サイト。ゲーム実況や歌ってみたを中心に気まぐれ配信中！🐈‍⬛⛓️",
  
  // ▼ 検索エンジンに「まだ内緒ね！」と伝える設定（デビューしたらここを丸ごと消す！）
  robots: {
    index: false,
    follow: false,
  },

  // ▼ X(Twitter)やLINEなどでURLを貼った時の「デカいカード表示」の設定
  openGraph: {
    title: "猫喰ぐるる🐾 公式サイト",
    description: "ポップな可愛さの裏に鋭いこだわりを隠し持つ新人Vチューバー！",
    url: "https://nekohami-gururu.com",
    siteName: "猫喰ぐるる 公式サイト",
    images: [
      {
        url: "https://nekohami-gururu.com/ogp.png", // publicフォルダに入れる画像
        width: 1200,
        height: 630,
        alt: "猫喰ぐるる",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  
  // ▼ X(Twitter)専用の設定
  twitter: {
    card: "summary_large_image", // デカい画像で表示する指定
    title: "猫喰ぐるる🐾 公式サイト",
    description: "ポップな可愛さの裏に鋭いこだわりを隠し持つ新人Vチューバー！",
    creator: "@h_neko20", // ぐるるちゃんのXアカウント
    images: ["https://nekohami-gururu.com/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
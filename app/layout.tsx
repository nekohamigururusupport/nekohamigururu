import type { Metadata } from "next";
// ▼ 変更：可愛い丸ゴシックフォントを読み込む！ ▼
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

// ▼ 変更：フォントの太さを設定（細い〜極太まで対応） ▼
const roundedFont = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "猫喰ぐるる🐾 公式サイト",
  description: "新人VTuber 猫喰ぐるる（Nekohami Gururu）の公式サイト。ゲーム実況や歌ってみたを中心に気まぐれ配信中！🐈‍⬛⛓️",
  
  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "猫喰ぐるる🐾 公式サイト",
    description: "ポップな可愛さの裏に鋭いこだわりを隠し持つ新人Vチューバー！",
    url: "https://nekohami-gururu.com",
    siteName: "猫喰ぐるる 公式サイト",
    images: [
      {
        url: "https://nekohami-gururu.com/ogp.png", 
        width: 1200,
        height: 630,
        alt: "猫喰ぐるる",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "猫喰ぐるる🐾 公式サイト",
    description: "ポップな可愛さの裏に鋭いこだわりを隠し持つ新人Vチューバー！",
    creator: "@h_neko20", 
    images: ["https://nekohami-gururu.com/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      {/* ▼ 変更：サイト全体の基準フォントを可愛い丸ゴシックにする！ ▼ */}
      <body className={roundedFont.className}>{children}</body>
    </html>
  );
}
import type { Metadata } from "next";
// 👇 Next.jsに内蔵されているGoogleフォントを呼び出す
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

// 👇 フォントの太さや設定を準備する
const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "700", "800"], // 通常、太字、極太 を使う
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: '猫喰ぐるる | Nekohami Gururu Official',
  description: '新人Vtuber「猫喰ぐるる」の公式ポートフォリオサイト。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      {/* 👇 サイト全体（body）にこのフォントを適用！ */}
      <body className={mPlusRounded.className}>{children}</body>
    </html>
  );
}
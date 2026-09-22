import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c, Yomogi } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const roundedFont = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const yomogi = Yomogi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yomogi",
});

const releasedMetadata: Metadata = {
  title: "猫喰ぐるる🐾 公式サイト",
  description:
    "新人VTuberを目指す猫喰ぐるる（Nekohami Gururu）の公式サイト。ゲーム実況や歌ってみたを中心に気まぐれ配信中！🐈‍⬛⛓️",
  robots: { index: false, follow: false },
  openGraph: {
    title: "猫喰ぐるる🐾 公式サイト",
    description: "ポップな可愛さの裏に鋭いこだわりを隠し持つ、新人Vチューバーを目指す！",
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
  icons: {
    icon: [
      { url: "/favicons/released.ico", sizes: "48x48" },
      { url: "/favicons/released.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/favicons/released.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "猫喰ぐるる🐾 公式サイト",
    description: "ポップな可愛さの裏に鋭いこだわりを隠し持つ、新人Vチューバーを目指す！",
    creator: "@h_neko20",
    images: ["https://nekohami-gururu.com/ogp.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = releasedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`scroll-smooth ${yomogi.variable}`}>
      <body className={roundedFont.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

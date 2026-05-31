import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { isSiteReleased, PRE_RELEASE_SITE_TITLE } from "@/lib/site-release";
import "./globals.css";

const roundedFont = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
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
  twitter: {
    card: "summary_large_image",
    title: "猫喰ぐるる🐾 公式サイト",
    description: "ポップな可愛さの裏に鋭いこだわりを隠し持つ、新人Vチューバーを目指す！",
    creator: "@h_neko20",
    images: ["https://nekohami-gururu.com/ogp.png"],
  },
};

const preReleaseMetadata: Metadata = {
  title: PRE_RELEASE_SITE_TITLE,
  description: "2026 DEBUT — Official site opening soon.",
  robots: { index: false, follow: false },
  openGraph: {
    title: PRE_RELEASE_SITE_TITLE,
    description: "2026 DEBUT — Official site opening soon.",
    url: "https://nekohami-gururu.com",
    siteName: PRE_RELEASE_SITE_TITLE,
    images: [
      {
        url: "https://nekohami-gururu.com/ogp.png",
        width: 1200,
        height: 630,
        alt: PRE_RELEASE_SITE_TITLE,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PRE_RELEASE_SITE_TITLE,
    description: "2026 DEBUT — Official site opening soon.",
    creator: "@h_neko20",
    images: ["https://nekohami-gururu.com/ogp.png"],
  },
};

export const metadata: Metadata = isSiteReleased() ? releasedMetadata : preReleaseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={roundedFont.className}>{children}</body>
    </html>
  );
}

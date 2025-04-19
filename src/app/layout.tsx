import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EMo Script - 絵文字で楽しく学べるプログラミング入門",
  description:
    "EMo Scriptは、絵文字を使って楽しくプログラミングを学べるサービスです。初心者や子供でも簡単にプログラミングの基礎を学べます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta
          name="description"
          content="EMo Scriptは、絵文字を使って楽しくプログラミングを学べるサービスです。初心者や子供でも簡単にプログラミングの基礎を学べます。"
        />
        <meta
          property="og:title"
          content="EMo Script - 絵文字で楽しく学べるプログラミング入門"
        />
        <meta
          property="og:description"
          content="EMo Scriptは、絵文字を使って楽しくプログラミングを学べるサービスです。初心者や子供でも簡単にプログラミングの基礎を学べます。"
        />
        <meta property="og:image" content="URL_TO_IMAGE" />
        <meta property="og:url" content="/public/readme/level1.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EMo Script - 絵文字で楽しく学べるプログラミング入門"
        />
        <meta
          name="twitter:description"
          content="EMo Scriptは、絵文字を使って楽しくプログラミングを学べるサービスです。初心者や子供でも簡単にプログラミングの基礎を学べます。"
        />
        <meta name="twitter:image" content="URL_TO_IMAGE" />

        <link rel="canonical" href="/public/readme/level1.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

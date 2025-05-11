"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import i18n from "../i18n/i18n";
import { useEffect } from "react";
import { useTranslation } from "../../node_modules/react-i18next";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe"; // 🔑 PUBLISHABLE KEY 用意しておいて

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language || "ja";
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  return (
    <html lang={i18n.language}>
      <head>
        <meta name="description" content={t("description")} />
        <meta property="og:title" content={t("og:title")} />
        <meta property="og:description" content={t("og:description")} />
        <meta property="og:image" content="URL_TO_IMAGE" />
        <meta property="og:url" content="/public/readme/level1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("twitter:title")} />
        <meta name="twitter:description" content={t("twitter:description")} />
        <meta name="twitter:image" content="URL_TO_IMAGE" />
        <link rel="canonical" href="/public/readme/level1.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Elements stripe={stripePromise}>
          {children}
        </Elements>
      </body>
    </html>
  );
}

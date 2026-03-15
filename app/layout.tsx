import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DropPost — Schedule, Approve & Publish Social Media",
    template: "%s | DropPost",
  },
  description: "The all-in-one social media management tool for agencies, creators & teams. Schedule posts, get client approvals, and publish across YouTube, Facebook, Instagram, TikTok & LinkedIn — from one dashboard.",
  keywords: [
    "social media scheduler", "social media management", "content calendar",
    "post scheduler", "social media tool", "agency tool", "approval workflow",
    "multi-platform publishing", "YouTube scheduler", "Instagram scheduler",
    "Facebook scheduler", "TikTok scheduler", "LinkedIn scheduler",
    "content planner", "social media automation", "team collaboration",
    "DropPost", "Inspired Marketing Agency",
  ],
  authors: [{ name: "Inspired Marketing Agency", url: "https://droppost.app" }],
  creator: "Inspired Marketing Agency",
  publisher: "Inspired Marketing Agency",
  metadataBase: new URL("https://droppost.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "nl_NL",
    url: "https://droppost.app",
    siteName: "DropPost",
    title: "DropPost — Schedule, Approve & Publish Social Media",
    description: "The all-in-one social media management tool for agencies, creators & teams. Plan content, get approvals, and publish across all platforms from one dashboard.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DropPost — Social Media Scheduling & Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DropPost — Schedule, Approve & Publish Social Media",
    description: "The all-in-one social media management tool for agencies, creators & teams.",
    images: ["/og-image.png"],
    creator: "@inspiredmktgsr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#7C3AED" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://mallord-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MALLORD — Creative Studio",
    template: "%s — MALLORD",
  },
  description:
    "MALLORD is an independent creative studio focused on AI-assisted visuals, short-form content, web experiences and creative direction.",
  keywords: [
    "MALLORD",
    "Creative Studio",
    "Creative Direction",
    "AI Visuals",
    "AI Content",
    "Short-form Content",
    "Video Editing",
    "Web Design",
    "Digital Experiences",
  ],
  authors: [{ name: "MALLORD" }],
  creator: "MALLORD",
  publisher: "MALLORD",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MALLORD — Creative Studio",
    description:
      "AI-assisted visuals, short-form content, web experiences and creative direction.",
    url: siteUrl,
    siteName: "MALLORD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MALLORD — Creative Studio",
    description:
      "AI-assisted visuals, short-form content, web experiences and creative direction.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#060608",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

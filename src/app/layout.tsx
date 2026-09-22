import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MALLORD — Creative Studio",
  description:
    "MALLORD — creative studio focused on AI content, short-form video, web design and digital experiences.",
  keywords: [
    "MALLORD",
    "Creative Studio",
    "AI Content",
    "Short-form Video",
    "Web Design",
    "Digital Experiences",
  ],
  authors: [
    {
      name: "MALLORD",
    },
  ],
  creator: "MALLORD",

  openGraph: {
    title: "MALLORD — Creative Studio",
    description:
      "AI content, short-form video, web design and digital experiences.",
    url: "https://mallord-portfolio.vercel.app",
    siteName: "MALLORD",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
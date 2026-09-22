import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Creative Portfolio | Full Stack Developer & Designer",
  description:
    "Cinematic, scroll-driven developer portfolio built with Next.js, Framer Motion & TypeScript. Showcasing full stack projects, animations, and UI/UX work.",
  keywords: [
    "Full Stack Developer",
    "Next.js Portfolio",
    "React Developer",
    "Framer Motion",
    "TypeScript",
    "Web Developer Lahore",
    "The Coding Hub",
  ],
  authors: [{ name: "Saad", url: "https://creative-portfolio.vercel.app" }],
  creator: "The Coding Hub by Saad & Team",
  openGraph: {
    title: "Creative Portfolio | Full Stack Developer & Designer",
    description:
      "Cinematic portfolio with magnetic buttons, text scramble, parallax scroll & animated skill bars.",
    url: "https://creative-portfolio.vercel.app",
    siteName: "Creative Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Portfolio | Full Stack Developer",
    description:
      "Built with Next.js 16, Framer Motion & TypeScript. Smooth animations, dark theme, zero icon libraries.",
    creator: "@saad",
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
      <body className={`${syne.variable} antialiased`}>{children}</body>
    </html>
  );
}
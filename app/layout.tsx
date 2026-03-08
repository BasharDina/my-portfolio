import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "./components/ui/SmoothScroll";
import MotionProvider from "./components/ui/MotionProvider";
import Cursor from "./components/experience/Cursor";
import PageTransition from "./components/ui/PageTransition";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://my-portfolio-neon-xi-47.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bashar Emad — Graphic Designer & UI/UX",
    template: "%s — Bashar Emad",
  },
  description:
    "Senior Graphic Designer crafting premium visuals, branding systems, and clean UI/UX experiences.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Bashar Emad — Graphic Designer & UI/UX",
    description: "Premium visuals • Branding • UI/UX — agency-level finish.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bashar Emad Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bashar Emad — Graphic Designer & UI/UX",
    description: "Premium visuals • Branding • UI/UX — agency-level finish.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MotionProvider>
          <SmoothScroll />
          <Cursor />
          <TooltipProvider delayDuration={150}>
            <PageTransition>{children}</PageTransition>
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
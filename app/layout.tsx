import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "./components/ui/SmoothScroll";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "http://localhost:3000"; // لاحقًا بدّلها للدومين الحقيقي

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bashar Emad — Graphic Designer & UI/UX",
    template: "%s — Bashar Emad",
  },
  description:
    "Senior Graphic Designer crafting premium visuals, branding systems, and clean UI/UX experiences.",
  keywords: [
    "Bashar Emad",
    "Graphic Designer",
    "UI UX",
    "Branding",
    "Motion Design",
    "Portfolio",
    "Figma",
    "Adobe",
  ],
  authors: [{ name: "Bashar Emad" }],
  creator: "Bashar Emad",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Bashar Emad — Graphic Designer & UI/UX",
    description:
      "Premium visuals • Branding • UI/UX — agency-level finish with case studies and galleries.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bashar Emad Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bashar Emad — Graphic Designer & UI/UX",
    description:
      "Premium visuals • Branding • UI/UX — agency-level finish with case studies and galleries.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll />
        <TooltipProvider delayDuration={150}>
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </body>
    </html>
  );
}
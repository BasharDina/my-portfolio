"use client";

import { usePathname } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/app/components/sections/Navbar";
import Footer from "@/app/components/sections/Footer";
import SmoothScroll from "./SmoothScroll";
import MotionProvider from "./MotionProvider";
import BackgroundTracker from "./BackgroundTracker";
import PageTransition from "./PageTransition";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <MotionProvider>
      <SmoothScroll />
      <BackgroundTracker />
      <div className="vignette-overlay" aria-hidden="true" />

      <TooltipProvider delayDuration={150}>
        <Navbar />

        {/* spacer under fixed navbar */}
        <div className="h-[78px] sm:h-[86px]" />

        <PageTransition>{children}</PageTransition>

        <Footer />
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </MotionProvider>
  );
}
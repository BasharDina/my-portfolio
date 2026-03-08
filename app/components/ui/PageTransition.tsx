"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

const SESSION_KEY = "hasSeenInitialPreloader";

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showFirstLoadPreloader, setShowFirstLoadPreloader] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    if (typeof window === "undefined") return;

    const hasSeenPreloader = window.sessionStorage.getItem(SESSION_KEY) === "true";

    if (!hasSeenPreloader) {
      setShowFirstLoadPreloader(true);
      window.sessionStorage.setItem(SESSION_KEY, "true");
    }
  }, []);

  useEffect(() => {
    if (!showFirstLoadPreloader) return;

    const timeout = window.setTimeout(() => {
      setShowFirstLoadPreloader(false);
    }, prefersReducedMotion ? 0 : 650);

    return () => window.clearTimeout(timeout);
  }, [showFirstLoadPreloader, prefersReducedMotion]);

  const transition = {
    duration: prefersReducedMotion ? 0 : 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <>
      <AnimatePresence>
        {isHydrated && showFirstLoadPreloader && (
          <m.div
            key="first-load-preloader"
            className="page-preloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: "easeOut" }}
            aria-hidden="true"
          >
            <m.div
              className="page-preloader__dot"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: [0.4, 1, 0.4],
                      scale: [0.92, 1.08, 0.92],
                    }
              }
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={pathname}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(8px)", scale: 0.992 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(6px)", scale: 1.004 }}
          transition={transition}
          style={{ willChange: prefersReducedMotion ? "auto" : "opacity, filter, transform" }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </>
  );
}
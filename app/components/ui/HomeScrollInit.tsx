"use client";

import { useEffect, useRef } from "react";
import { initHomeScrollTriggers } from "./scroll-trigger";

export default function HomeScrollInit() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const root = document.querySelector("main");
    if (!root) return;

    const cleanup = initHomeScrollTriggers(root as HTMLElement);
    return cleanup;
  }, []);

  return null;
}
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  if (!window.gtag || !GA_ID) return;

  window.gtag("event", eventName, params);
}
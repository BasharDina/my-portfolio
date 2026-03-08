"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export default function Navbar() {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/experience", label: "Experience" },
      { href: "/#contact", label: "Contact" },
    ],
    []
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  function getActiveHref() {
    if (pathname === "/") return "/";
    if (pathname.startsWith("/projects")) return "/projects";
    if (pathname.startsWith("/experience")) return "/experience";
    return "/";
  }

  const activeHref = getActiveHref();

  function updateIndicator(href: string) {
    const el = linkRefs.current[href];
    const container = containerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    setIndicator({ left: elRect.left - cRect.left, width: elRect.width });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    updateIndicator(activeHref);
    const onResize = () => updateIndicator(activeHref);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeHref]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top accent line */}
      <div className="h-[2px] w-full">
        <div
          className="h-full w-full opacity-90"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(64,255,0,0.9), transparent)",
          }}
        />
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#050812]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#050812]/60"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-3 py-4 sm:px-4 lg:px-5">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="text-lg">
              <span className="text-foreground">Bashar</span>
              <span className="text-primary">.</span>
            </span>
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-4 md:flex">
            <div
              ref={containerRef}
              onMouseLeave={() => updateIndicator(activeHref)}
              className="relative rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 backdrop-blur-md"
            >
              <span
                className="pointer-events-none absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  background: "linear-gradient(90deg, rgba(64,255,0,0.22), rgba(124,58,237,0.10))",
                  boxShadow: "0 0 26px rgba(64,255,0,0.18)",
                }}
              />

              <nav className="relative flex items-center gap-1 text-sm" aria-label="Main navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    ref={(el) => {
                      linkRefs.current[item.href] = el;
                    }}
                    href={item.href}
                    onMouseEnter={() => updateIndicator(item.href)}
                    className={[
                      "relative rounded-full px-4 py-2 transition-colors duration-200",
                      item.href === activeHref
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Link
              href="/#contact"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-primary/60 hover:shadow-[0_0_18px_rgba(64,255,0,0.18)] active:scale-[0.98]"
            >
              Hire me
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-foreground active:scale-[0.98]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl px-6 pb-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "text-left rounded-xl px-4 py-3 text-sm font-semibold transition",
                      item.href === activeHref
                        ? "bg-primary/15 text-foreground shadow-[0_0_18px_rgba(64,255,0,0.14)]"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground transition hover:brightness-110 active:scale-[0.98]"
                >
                  Hire me
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

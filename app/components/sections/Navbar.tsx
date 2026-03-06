"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { id: string; label: string };

export default function Navbar() {
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Services" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  function updateIndicator(id: string) {
    const el = linkRefs.current[id];
    const container = containerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    setIndicator({ left: elRect.left - cRect.left, width: elRect.width });
  }

  function scrollToId(id: string) {
    setMobileOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  }

  useEffect(() => {
    const sections = navItems
      .map((n) => (n.id === "home" ? null : document.getElementById(n.id)))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.2, 0.35, 0.5] }
    );

    sections.forEach((s) => obs.observe(s));

    const onScroll = () => {
      if (window.scrollY < 80) setActiveId("home");
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [navItems]);

  useEffect(() => {
    updateIndicator(activeId);
    const onResize = () => updateIndicator(activeId);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[2px] w-full">
        <div
          className="h-full w-full opacity-90"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(64,255,0,0.9), transparent)",
          }}
        />
      </div>

      <div className="border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
<div className="mx-auto flex max-w-[1320px] items-center justify-between px-3 py-4 sm:px-4 lg:px-5">
                  <button onClick={() => scrollToId("home")} className="flex items-center gap-2 font-bold">
            <span className="text-lg">
              <span className="text-foreground">My</span>
              <span className="text-primary">Website</span>
            </span>
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
          </button>

          <div className="hidden items-center gap-4 md:flex">
            <div
              ref={containerRef}
              onMouseLeave={() => updateIndicator(activeId)}
              className="relative rounded-full border bg-card px-2 py-1"
            >
              <span
                className="pointer-events-none absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  background:
                    "linear-gradient(90deg, rgba(64,255,0,0.22), rgba(124,58,237,0.10))",
                  boxShadow: "0 0 26px rgba(64,255,0,0.18)",
                }}
              />

              <nav className="relative flex items-center gap-1 text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    ref={(el) => {
                      linkRefs.current[item.id] = el;
                    }}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                    onMouseEnter={() => updateIndicator(item.id)}
                    className={[
                      "relative rounded-full px-4 py-2 transition-colors duration-200",
                      item.id === activeId
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <button
              onClick={() => scrollToId("contact")}
              className="rounded-xl border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:shadow-[0_0_18px_rgba(64,255,0,0.18)] active:scale-[0.98]"
            >
              Hire me
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="rounded-xl border bg-card px-3 py-2 text-sm text-foreground active:scale-[0.98]"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl px-6 pb-5">
            <div className="rounded-2xl border bg-card p-3">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToId(item.id)}
                    className={[
                      "text-left rounded-xl px-4 py-3 text-sm font-semibold transition",
                      item.id === activeId
                        ? "bg-primary/15 text-foreground shadow-[0_0_18px_rgba(64,255,0,0.14)]"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  onClick={() => scrollToId("contact")}
                  className="mt-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110 active:scale-[0.98]"
                >
                  Hire me
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
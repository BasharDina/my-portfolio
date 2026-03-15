"use client";

import Link from "next/link";
import { Mail, Linkedin, Globe, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pb-8 pt-6 sm:pb-10">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
        <div className="glass glass-highlight rounded-[2rem] border border-white/10 px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Link href="/" className="inline-block">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Bashar <span className="text-[#40FF00]">Emad</span>
                </h3>
              </Link>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/72">
                Specialized in social media, branding, print, and packaging design —
                delivering modern visual solutions with strong creative direction and AI-enhanced workflow.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:hello@basharemad.com"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-[#40FF00]/40 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#40FF00]" />
                  Email
                </a>

                <a
                  href="https://www.linkedin.com/in/bashar-emad-b10959391?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-[#40FF00]/40 hover:text-white"
                >
                  <Linkedin className="h-4 w-4 text-[#40FF00]" />
                  LinkedIn
                </a>

                <a
                  href="https://www.upwork.com/freelancers/~011e85b2b4e8f06247?companyReference=1323252692283457537&mp_source=share"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-[#40FF00]/40 hover:text-white"
                >
                  <Globe className="h-4 w-4 text-[#40FF00]" />
                  Upwork
                </a>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <nav className="flex flex-col items-start gap-3 text-lg font-medium text-white/80 lg:items-end">
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
                <Link href="/projects" className="transition hover:text-white">
                  Projects
                </Link>
                <Link href="/experience" className="transition hover:text-white">
                  Experience
                </Link>
                <Link href="/#contact" className="transition hover:text-white">
                  Contact
                </Link>
              </nav>

              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-[#40FF00]/40 hover:text-white"
              >
                Back to top
                <ArrowUp className="h-4 w-4 text-[#40FF00]" />
              </a>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mt-6 flex flex-col gap-3 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Bashar Emad. All rights reserved.</p>

            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#40FF00]" />
              Crafted with a premium finish
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
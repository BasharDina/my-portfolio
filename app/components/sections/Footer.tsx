"use client";

import Link from "next/link";
import { ArrowUp, Mail, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-white/10 bg-transparent">
      <div className="mx-auto max-w-[1320px] px-3 py-10 sm:px-4 lg:px-5">
        <div className="glass glass-highlight rounded-3xl p-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand */}
            <div>
              <div className="text-lg font-bold text-white">
                Bashar <span className="text-[#40FF00]">Emad</span>
              </div>
              <div className="mt-2 max-w-sm text-sm text-white/65">
                Premium visuals • UI/UX • Branding — built with a cinematic, agency-level finish.
              </div>

              {/* Social */}
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="mailto:basharabushaban1999@gmail.com"
                  className="glass glow-hover inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-white/80"
                >
                  <Mail className="h-4 w-4 text-[#40FF00]" />
                  Email
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="glass glow-hover inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-white/80"
                >
                  <Linkedin className="h-4 w-4 text-[#40FF00]" />
                  LinkedIn
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="glass glow-hover inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-white/80"
                >
                  <Globe className="h-4 w-4 text-[#40FF00]" />
                  Upwork
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="grid gap-2 text-sm text-white/70 sm:text-right">
              <Link className="hover:text-white transition-colors" href="/">Home</Link>
              <Link className="hover:text-white transition-colors" href="/projects">Projects</Link>
              <Link className="hover:text-white transition-colors" href="/experience">Experience</Link>
              <Link className="hover:text-white transition-colors" href="/#contact">Contact</Link>

              <button
                onClick={backToTop}
                className="glass glow-hover mt-3 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white/85"
              >
                Back to top <ArrowUp className="h-4 w-4 text-[#40FF00]" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Bashar Emad. All rights reserved.</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#40FF00]" />
              Crafted with a premium finish
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

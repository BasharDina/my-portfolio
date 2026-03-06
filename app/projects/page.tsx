import Navbar from "../components/sections/Navbar";
import Projects from "../components/sections/Projects";
import Footer from "../components/sections/Footer";
import { GlowLink } from "../components/ui/GlowButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full portfolio case studies and galleries by Bashar Emad.",
};
export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Page header */}
      <section className="border-b">
        <div className="mx-auto max-w-[1320px] px-3 py-14 sm:px-4 lg:px-5">
          <div className="glass glass-highlight rounded-3xl p-8">
           <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/60">
  <a href="/#home" className="glass rounded-full border border-white/10 px-3 py-1 hover:text-white">
    Home
  </a>
  <span className="text-white/35">/</span>
  <span className="glass rounded-full border border-white/10 px-3 py-1 text-white/80">
    Projects
  </span>
</div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              Projects <span className="text-[#40FF00]">Portfolio</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              Full case studies + galleries. Filter by category and open any project
              to view details.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <GlowLink href="/#contact" variant="primary" className="shine-btn">
                Start a project
              </GlowLink>
              <GlowLink href="/#home" variant="secondary" className="shine-btn">
                Back to Home
              </GlowLink>
            </div>
          </div>
        </div>
      </section>

      {/* Full projects section */}
      <Projects />

      <Footer />
    </main>
  );
}
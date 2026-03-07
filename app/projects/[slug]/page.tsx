import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, getCaseStudy } from "@/app/data/case-studies";
import LightboxClient from "./lightbox-client";

export async function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getCaseStudy(params.slug);
  if (!p) return { title: "Project not found" };

  return {
    title: `${p.title} — Bashar Emad`,
    description: p.subtitle,
    openGraph: {
      title: `${p.title} — Bashar Emad`,
      description: p.subtitle,
      images: [{ url: p.cover }],
    },
  };
}

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = getCaseStudy(params.slug);

  if (!p) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-white">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link className="mt-6 inline-block text-[#40FF00]" href="/projects">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1320px] px-4 py-10 text-white">
      <div className="flex items-center justify-between gap-4">
        <Link href="/projects" className="text-sm text-white/70 hover:text-white">
          ← Back to projects
        </Link>
        <Link
          href="/#contact"
          className="text-sm font-semibold text-[#40FF00] hover:opacity-90"
        >
          Hire me →
        </Link>
      </div>

      {/* Header */}
      <section className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div className="glass glass-highlight rounded-3xl border border-white/10 p-7">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {p.category}
            </span>
            {p.year ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {p.year}
              </span>
            ) : null}
            {p.role ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {p.role}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            {p.title}
          </h1>
          <p className="mt-3 text-white/70">{p.subtitle}</p>

          {p.tools?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Cover */}
        <div className="glass glass-highlight rounded-3xl border border-white/10 overflow-hidden">
          <div className="relative aspect-[16/10] w-full">
            <Image src={p.cover} alt={p.title} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {p.sections.map((s) => (
          <div
            key={s.heading}
            className="glass glass-highlight rounded-3xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-bold">{s.heading}</h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </section>

      {/* Gallery */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Gallery</h2>
          <p className="text-sm text-white/60">Click any image to preview.</p>
        </div>

        <LightboxClient images={p.gallery} />
      </section>

      {/* CTA */}
      <div className="mt-12 glass glass-highlight rounded-3xl border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-lg font-bold">Want similar work?</div>
          <div className="text-sm text-white/70">
            Send a message — I’ll reply with next steps.
          </div>
        </div>

        <Link
          href="/#contact"
          className="rounded-2xl bg-[#40FF00] px-5 py-3 text-sm font-bold text-black hover:brightness-110"
        >
          Contact →
        </Link>
      </div>
    </main>
  );
}
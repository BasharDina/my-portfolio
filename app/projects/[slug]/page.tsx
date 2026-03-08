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
  const currentIndex = CASE_STUDIES.findIndex((item) => item.slug === params.slug);
  const prevProject = currentIndex > 0 ? CASE_STUDIES[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < CASE_STUDIES.length - 1 ? CASE_STUDIES[currentIndex + 1] : null;
  const relatedProjects = CASE_STUDIES.filter(
    (item) => item.slug !== params.slug && (item.category === p?.category || item.tags?.some((tag) => p?.tags?.includes(tag)))
  ).slice(0, 3);

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
    <main className="mx-auto max-w-[1320px] px-4 py-10 text-white md:py-12">
      <div className="glass glass-highlight rounded-2xl border border-white/10 px-4 py-3 md:px-5">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <span>/</span>
          <span className="text-white">{p.title}</span>
        </nav>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
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
      <section className="mt-6 grid gap-7 lg:grid-cols-[1.12fr_.88fr]">
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

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            {p.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
            {p.subtitle}
          </p>

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
      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {p.sections.map((s) => (
          <div
            key={s.heading}
            className="glass glass-highlight rounded-3xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-bold tracking-tight">{s.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/72">
              {s.body}
            </p>
          </div>
        ))}
      </section>

      {/* Gallery */}
      <section className="mt-11">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
          <p className="text-sm text-white/60">Click any image to preview in lightbox.</p>
        </div>

        <LightboxClient images={p.gallery} />
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="glass glass-highlight rounded-3xl border border-white/10 p-5 md:p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">Previous</div>
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="mt-2 inline-block text-lg font-bold tracking-tight hover:text-[#40FF00]">
              ← {prevProject.title}
            </Link>
          ) : (
            <p className="mt-2 text-sm text-white/65">You are viewing the first project.</p>
          )}
        </div>

        <div className="glass glass-highlight rounded-3xl border border-white/10 p-5 md:p-6 text-left lg:text-right">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">Next</div>
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="mt-2 inline-block text-lg font-bold tracking-tight hover:text-[#40FF00]">
              {nextProject.title} →
            </Link>
          ) : (
            <p className="mt-2 text-sm text-white/65">You are viewing the latest project.</p>
          )}
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight">Related Projects</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group glass glass-highlight overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative aspect-[16/10] w-full bg-white/5">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-[0.16em] text-white/55">
                    {item.category}
                  </div>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

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
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/app/data/case-studies";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[1320px] px-4 py-10 text-white md:py-14">
      <section className="glass glass-highlight rounded-3xl border border-white/10 p-7 md:p-9">
        <p className="text-xs uppercase tracking-[0.22em] text-white/55">Selected Work</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          Projects & Case Studies
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
          A curated collection of branding, social, and packaging projects. Explore
          each case study for process notes, outcomes, and full visual galleries.
        </p>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CASE_STUDIES.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group glass glass-highlight overflow-hidden rounded-3xl border border-white/10 transition-all hover:-translate-y-1 hover:border-white/20"
          >
            <div className="relative aspect-[4/3] w-full bg-white/5">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>

            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-white/55">
                <span>{project.category}</span>
                {project.year ? <span>{project.year}</span> : null}
              </div>

              <h2 className="text-xl font-bold tracking-tight">{project.title}</h2>
              <p className="text-sm leading-relaxed text-white/70">{project.subtitle}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {(project.tags ?? []).slice(0, 3).map((tag) => (
                  <span
                    key={`${project.slug}-${tag}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
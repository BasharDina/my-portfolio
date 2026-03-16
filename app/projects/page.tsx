export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
type SanityProject = {
  _id: string;
  title: string;
  slug?: { current: string };
  category: string;
  subtitle: string;
  year?: string;
  role?: string;
  tags?: string[];
  cover?: any;
};

export default async function ProjectsPage() {
const projects: SanityProject[] = await client.fetch(
  projectsQuery,
  {},
  { cache: "no-store" }
);
  return (
    <main className="mx-auto max-w-[1320px] px-4 py-10 text-white md:py-12">
      <section className="glass glass-highlight rounded-3xl border border-white/10 p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40FF00]">
          Portfolio
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
          A curated selection of branding, social media, packaging, and visual design work.
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const imageUrl = project.cover
            ? urlFor(project.cover).width(1200).height(900).url()
            : null;

          return (
            <Link
              key={project._id}
              href={`/projects/${project.slug?.current}`}
              className="group glass glass-highlight glow-hover overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="rounded-full border border-[#40FF00]/20 bg-[#40FF00]/10 px-3 py-1 text-[#40FF00]">
                    {project.category}
                  </span>

                  {project.year ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {project.year}
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-3 text-xl font-bold tracking-tight">
                  {project.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">
                  {project.subtitle}
                </p>

                {project.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
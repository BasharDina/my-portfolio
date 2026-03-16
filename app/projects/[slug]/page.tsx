export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, projectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import LightboxClient from "./lightbox-client";

type ProjectSection = {
  heading: string;
  body: string;
};

type GalleryImage = {
  asset?: any;
  alt?: string;
};

type GalleryGroup = {
  title: string;
  images: GalleryImage[];
};

type SanityProject = {
  _id: string;
  title: string;
  slug?: { current: string };
  category: string;
  subtitle: string;
  year?: string;
  role?: string;
  tools?: string[];
  tags?: string[];
  cover?: any;
  sections?: ProjectSection[];
  galleryGroups?: GalleryGroup[];
};

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
 const project: SanityProject | null = await client.fetch(
  projectBySlugQuery,
  { slug },
  { cache: "no-store" }
);

const allProjects: SanityProject[] = await client.fetch(
  projectsQuery,
  {},
  { cache: "no-store" }
);

  if (!project) return { title: "Project not found" };

  const imageUrl = project.cover ? urlFor(project.cover).width(1200).height(630).url() : undefined;

  return {
    title: `${project.title} — Bashar Emad`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Bashar Emad`,
      description: project.subtitle,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function ProjectCaseStudyPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const project: SanityProject | null = await client.fetch(projectBySlugQuery, { slug });
  const allProjects: SanityProject[] = await client.fetch(projectsQuery);

  if (!project) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-white">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link className="mt-6 inline-block text-[#40FF00]" href="/projects">
          ← Back to projects
        </Link>
      </div>
    );
  }

  const currentIndex = allProjects.findIndex(
    (item) => item.slug?.current === project.slug?.current
  );

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const relatedProjects = allProjects
    .filter(
      (item) =>
        item.slug?.current !== project.slug?.current &&
        (item.category === project.category ||
          item.tags?.some((tag) => project.tags?.includes(tag)))
    )
    .slice(0, 3);

  const coverUrl = project.cover
    ? urlFor(project.cover).width(1600).height(1000).url()
    : null;

  const galleryGroups =
    project.galleryGroups?.map((group) => ({
      title: group.title,
      images:
        group.images?.map((image) => ({
          src: image.asset ? urlFor(image).url() : "",
          alt: image.alt,
        })).filter((image) => image.src) ?? [],
    })) ?? [];

  return (
    <main className="mx-auto max-w-[1320px] px-4 py-10 text-white md:py-12">
      <div className="glass glass-highlight rounded-2xl border border-white/10 px-4 py-3 md:px-5">
        <nav
          className="flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link href="/projects" className="transition-colors hover:text-white">
            Projects
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">{project.title}</span>
        </nav>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <Link
          href="/projects"
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          ← Back to projects
        </Link>
        <Link
          href="/#contact"
          className="text-sm font-semibold text-[#40FF00] transition-opacity hover:opacity-90"
        >
          Hire me →
        </Link>
      </div>

      <section className="mt-6 grid gap-7 lg:grid-cols-[1.12fr_.88fr]">
        <div className="glass glass-highlight rounded-3xl border border-white/10 p-7">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span className="rounded-full border border-[#40FF00]/20 bg-[#40FF00]/10 px-3 py-1 text-[#40FF00]">
              {project.category}
            </span>

            {project.year ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {project.year}
              </span>
            ) : null}

            {project.role ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {project.role}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
            {project.subtitle}
          </p>

          {project.tools?.length ? (
            <div className="mt-5">
              <p className="mb-2 text-[11px] uppercase tracking-[0.15em] text-white/50">
                Tools Used
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="glass glass-highlight overflow-hidden rounded-3xl border border-white/10">
          <div className="relative aspect-[16/10] w-full">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : null}
          </div>
        </div>
      </section>

      {project.sections?.length ? (
        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {project.sections.map((section, i) => (
            <div
              key={`${section.heading}-${i}`}
              className="glass glass-highlight rounded-3xl border border-white/10 p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#40FF00]/15 text-xs font-bold text-[#40FF00]">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold tracking-tight">{section.heading}</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/72">{section.body}</p>
            </div>
          ))}
        </section>
      ) : null}

      {galleryGroups.length ? (
        <section className="mt-11">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
              <p className="mt-1 text-sm text-white/60">
                Work grouped by client / brand
              </p>
            </div>

            <p className="text-sm text-white/60">
              Click any image to preview in lightbox
            </p>
          </div>

          <LightboxClient groups={galleryGroups} />
        </section>
      ) : null}

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="glass glass-highlight rounded-3xl border border-white/10 p-5 md:p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">
            Previous
          </div>
          {prevProject?.slug?.current ? (
            <Link
              href={`/projects/${prevProject.slug.current}`}
              className="mt-2 inline-block text-lg font-bold tracking-tight transition-colors hover:text-[#40FF00]"
            >
              ← {prevProject.title}
            </Link>
          ) : (
            <p className="mt-2 text-sm text-white/65">
              You are viewing the first project.
            </p>
          )}
        </div>

        <div className="glass glass-highlight rounded-3xl border border-white/10 p-5 text-left md:p-6 lg:text-right">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">
            Next
          </div>
          {nextProject?.slug?.current ? (
            <Link
              href={`/projects/${nextProject.slug.current}`}
              className="mt-2 inline-block text-lg font-bold tracking-tight transition-colors hover:text-[#40FF00]"
            >
              {nextProject.title} →
            </Link>
          ) : (
            <p className="mt-2 text-sm text-white/65">
              You are viewing the latest project.
            </p>
          )}
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight">Related Projects</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProjects.map((item) => {
              const relatedCoverUrl = item.cover
                ? urlFor(item.cover).width(1200).height(900).url()
                : null;

              return (
                <Link
                  key={item._id}
                  href={`/projects/${item.slug?.current}`}
                  className="group glass glass-highlight glow-hover overflow-hidden rounded-3xl border border-white/10"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
                    {relatedCoverUrl ? (
                      <Image
                        src={relatedCoverUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <div className="text-xs uppercase tracking-[0.16em] text-white/55">
                      {item.category}
                    </div>
                    <h3 className="mt-2 text-lg font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <div className="mt-12 glass glass-highlight flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 p-6 sm:flex-row sm:items-center">
        <div>
          <div className="text-lg font-bold">Want similar work?</div>
          <div className="text-sm text-white/70">
            Send a message — I&apos;ll reply with next steps.
          </div>
        </div>

        <Link
          href="/#contact"
          className="rounded-2xl bg-[#40FF00] px-5 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(64,255,0,0.2)] transition hover:brightness-110"
        >
          Contact →
        </Link>
      </div>
    </main>
  );
}
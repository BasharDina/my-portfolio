export type CaseStudy = {
  slug: string;
  title: string;
  category: "Social" | "Branding" | "Packaging";
  subtitle: string;
  year?: string;
  role?: string;
  tools?: string[];
  tags?: string[];
  cover: string; // shown in cards + header
  gallery: string[]; // images for lightbox/grid
  sections: Array<{ heading: string; body: string }>;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "social-media",
    title: "Social Media Album",
    category: "Social",
    subtitle: "A curated set of social media posts and ad creatives.",
    year: "2025",
    role: "Designer",
    tools: ["Photoshop", "Illustrator"],
    tags: ["Social", "Campaign", "Design"],
    cover: "/projects/social/todos/01.png",
    gallery: [
      "/projects/social/todos/01.png",
      "/projects/social/todos/02.png",
      "/projects/social/todos/03.png",
    ],
    sections: [
      {
        heading: "Goal",
        body: "Create a consistent, high-performing social campaign system with strong hierarchy and brand consistency.",
      },
      {
        heading: "Process",
        body: "Designed a modular layout system, built templates, then iterated on typography, color, and visual balance for different messages.",
      },
      {
        heading: "Result",
        body: "A flexible set of creatives that stays consistent across posts and ads while adapting to different offers and audiences.",
      },
    ],
  },
  {
    slug: "branding-identity",
    title: "Branding Identity",
    category: "Branding",
    subtitle: "Logo + identity system + guidelines and applications.",
    year: "2025",
    role: "Brand Designer",
    tools: ["Illustrator", "InDesign"],
    tags: ["Branding", "Identity", "System"],
    cover: "/projects/branding/brandbook/01.png",
    gallery: [
      "/projects/branding/brandbook/01.png",
      "/projects/branding/brandbook/02.png",
      "/projects/branding/brandbook/03.png",
      "/projects/branding/brandbook/04.png",
    ],
    sections: [
      {
        heading: "Goal",
        body: "Build a complete brand identity system that scales across social, print, and digital touchpoints.",
      },
      {
        heading: "System",
        body: "Defined logo rules, typography scale, spacing, color system, and a set of ready-to-use templates.",
      },
      {
        heading: "Deliverables",
        body: "Brand book pages + export-ready assets + clear usage rules for fast future production.",
      },
    ],
  },
  {
    slug: "packaging-design",
    title: "Packaging Design",
    category: "Packaging",
    subtitle: "Packaging concepts with mockups and print-ready layout.",
    year: "2024",
    role: "Packaging Designer",
    tools: ["Illustrator", "Photoshop"],
    tags: ["Packaging", "Print", "Mockup"],
    cover: "/projects/packaging/01.png",
    gallery: [
      "/projects/packaging/01.png",
      "/projects/packaging/02.png",
      "/projects/packaging/03.png",
    ],
    sections: [
      {
        heading: "Goal",
        body: "Create premium packaging that looks strong on shelf and stays legible with clear hierarchy.",
      },
      {
        heading: "Concept",
        body: "Balanced typography + visual motif + structured layout for variants and product line expansion.",
      },
      {
        heading: "Production",
        body: "Prepared print-ready files, dieline alignment, and mockups for presentation.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((p) => p.slug === slug);
}
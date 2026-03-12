export type GalleryGroup = {
  title: string;
  images: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: "Social" | "Branding" | "Packaging";
  subtitle: string;
  year?: string;
  role?: string;
  tools?: string[];
  tags?: string[];
  cover: string;
  galleryGroups: GalleryGroup[];
  sections: Array<{ heading: string; body: string }>;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "social-media",
    title: "Social Media Campaign",
    category: "Social",
    subtitle:
      "A curated set of social media posts and ad creatives designed for maximum engagement and brand consistency across platforms.",
    year: "2025",
    role: "Lead Designer",
    tools: ["Photoshop", "Illustrator", "Figma"],
    tags: ["Social", "Campaign", "Ads", "Design"],
    cover: "/projects/social/todos/01.png",
    galleryGroups: [
      {
        title: "Todos",
        images: [
          "/projects/social/todos/01.png",
          "/projects/social/todos/02.png",
          "/projects/social/todos/03.png",
        ],
      },
      {
        title: "Study Lleap",
        images: [
          "/projects/social/Study Lleap/01.png",
          "/projects/social/Study Lleap/02.png",
          "/projects/social/Study Lleap/03.png",
        ],
      },
    ],
    sections: [
      {
        heading: "Goal",
        body: "Create a consistent, high-performing social campaign system with strong hierarchy and brand consistency. The client needed a scalable template system that could adapt to different messages while maintaining visual cohesion.",
      },
      {
        heading: "Process",
        body: "Designed a modular layout system starting with wireframes, then built reusable templates. Iterated on typography, color, and visual balance for different messages. Tested multiple variations for engagement optimization.",
      },
      {
        heading: "Result",
        body: "A flexible set of creatives that stays consistent across posts and ads while adapting to different offers and audiences. Engagement rates improved by 40% compared to previous campaigns.",
      },
    ],
  },
  {
    slug: "branding-identity",
    title: "Brand Identity System",
    category: "Branding",
    subtitle:
      "Complete brand identity system including logo design, typography scale, color system, and comprehensive brand guidelines.",
    year: "2025",
    role: "Brand Designer",
    tools: ["Illustrator", "InDesign", "Figma"],
    tags: ["Branding", "Identity", "Logo", "Guidelines"],
    cover: "/projects/social/خدماتي/01.png",
    galleryGroups: [
      {
        title: "خدماتي",
        images: [
          "/projects/social/خدماتي/01.png",
          "/projects/social/خدماتي/02.png",
          "/projects/social/خدماتي/03.png",
        ],
      },
      {
        title: "مودة",
        images: [
          "/projects/social/مودة/01.jpg",
          "/projects/social/مودة/02.png",
          "/projects/social/مودة/03.jpg",
        ],
      },
    ],
    sections: [
      {
        heading: "Goal",
        body: "Build a complete brand identity system that scales across social, print, and digital touchpoints. The brand needed to feel premium, modern, and trustworthy while remaining versatile.",
      },
      {
        heading: "System",
        body: "Defined logo rules with clear space and minimum sizes, established a typography scale with primary and secondary typefaces, created a comprehensive color system with usage guidelines, and built a set of ready-to-use templates.",
      },
      {
        heading: "Deliverables",
        body: "Brand book (48 pages) with export-ready assets, clear usage rules for fast future production, social media templates, business card designs, and letterhead layouts.",
      },
    ],
  },
  {
    slug: "packaging-design",
    title: "Premium Packaging",
    category: "Packaging",
    subtitle:
      "Packaging concepts with high-fidelity mockups and production-ready layout for a premium product line.",
    year: "2024",
    role: "Packaging Designer",
    tools: ["Illustrator", "Photoshop", "Dimension"],
    tags: ["Packaging", "Print", "Mockup", "Product"],
    cover: "/projects/social/مطبخ السلام/01.png",
    galleryGroups: [
      {
        title: "مطبخ السلام",
        images: [
          "/projects/social/مطبخ السلام/01.png",
          "/projects/social/مطبخ السلام/02.png",
          "/projects/social/مطبخ السلام/03.png",
        ],
      },
    ],
    sections: [
      {
        heading: "Goal",
        body: "Create premium packaging that looks strong on shelf and stays legible with clear hierarchy. The product line needed a cohesive visual language that could expand to future variants.",
      },
      {
        heading: "Concept",
        body: "Balanced typography with a distinctive visual motif and structured layout designed for variants and product line expansion. Used a restrained color palette with metallic accents for premium feel.",
      },
      {
        heading: "Production",
        body: "Prepared print-ready files with dieline alignment, spot color specifications, and high-fidelity mockups for client presentation and manufacturer handoff.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((p) => p.slug === slug);
}

export const ALL_CATEGORIES = [...new Set(CASE_STUDIES.map((p) => p.category))] as const;
export const ALL_TAGS = [...new Set(CASE_STUDIES.flatMap((p) => p.tags ?? []))] as const;
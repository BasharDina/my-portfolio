export type SocialClient = {
  id: string;
  name: string;
  niche?: string;
  cover: string;
  posts: [string, string, string];
};

export type BrandBook = {
  id: string;
  name: string;
  cover: string;
  pages: string[]; // صور صفحات
};

export const socialClients: SocialClient[] = [
  {
    id: "company-1",
    name: "Company One",
    niche: "Social Media",
    cover: "/projects/social/company-1/cover.jpg",
    posts: [
      "/projects/social/company-1/01.jpg",
      "/projects/social/company-1/02.jpg",
      "/projects/social/company-1/03.jpg",
    ],
  },
  {
    id: "company-2",
    name: "Company Two",
    niche: "Social Media",
    cover: "/projects/social/company-2/cover.jpg",
    posts: [
      "/projects/social/company-2/01.jpg",
      "/projects/social/company-2/02.jpg",
      "/projects/social/company-2/03.jpg",
    ],
  },
];

export const brandBooks: BrandBook[] = [
  {
    id: "brand-1",
    name: "Brand Book 01",
    cover: "/projects/brandbooks/brand-1/cover.jpg",
    pages: [
      "/projects/brandbooks/brand-1/01.jpg",
      "/projects/brandbooks/brand-1/02.jpg",
      "/projects/brandbooks/brand-1/03.jpg",
      "/projects/brandbooks/brand-1/04.jpg",
    ],
  },
  {
    id: "brand-2",
    name: "Brand Book 02",
    cover: "/projects/brandbooks/brand-2/cover.jpg",
    pages: [
      "/projects/brandbooks/brand-2/01.jpg",
      "/projects/brandbooks/brand-2/02.jpg",
    ],
  },
];
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
  id: "todos",
  name: "TODOS / FitPro",
  niche: "Social Media",
  cover: "/projects/social/todos/01.png", // مؤقتاً خليه نفس صورة 01 لو ما عندك cover
  posts: [
    "/projects/social/todos/01.png",
    "/projects/social/todos/02.png",
    "/projects/social/todos/03.png",
  ],
},
  {
    id: "todos",
    name: "Company Two",
    niche: "Social Media",
    cover: "/projects/social/todos/cover.jpg",
    posts: [
      "/projects/social/todos/01.png",
      "/projects/social/todos/02.png",
      "/projects/social/todos/03.png",
    ],
  },
   {
    id: "خدماتي",
    name: "خدماتي",
    niche: "Social Media",
    cover: "/projects/social/خدماتي/cover.jpg",
    posts: [
      "/projects/social/خدماتي/01.png",
      "/projects/social/خدماتي/02.png",
      "/projects/social/خدماتي/03.png",
    ],
  },
    {
    id: "مطبخ السلام",
    name: "مطبخ السلام",
    niche: "Social Media",
    cover: "/projects/social/مطبخ السلام/cover.jpg",
    posts: [
      "/projects/social/مطبخ السلام/01.png",
      "/projects/social/مطبخ السلام/02.png",
      "/projects/social/مطبخ السلام/03.png",
    ],
  },
      {
    id: "مودة",
    name: "مودة",
    niche: "Social Media",
    cover: "/projects/social/مودة/cover.jpg",
    posts: [
      "/projects/social/مودة/01.png",
      "/projects/social/مودة/02.png",
      "/projects/social/مودة/03.png",
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
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
const base = "https://my-portfolio-neon-xi-47.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
  ];
}
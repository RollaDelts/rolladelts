import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/recruitment`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/recruitment/cost`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/philanthropy`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/stories`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/alumni`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}

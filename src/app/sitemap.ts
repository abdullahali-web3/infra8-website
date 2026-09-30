import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { ROUTES } from "@/lib/content";
import { SERVICE_ORDER, SERVICES } from "@/lib/services";
import { INSIGHTS } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    page(ROUTES.services, 0.9),
    ...SERVICE_ORDER.map((k) => page(SERVICES[k].path, 0.9)),
    page(ROUTES.insights, 0.7),
    ...INSIGHTS.map((i) => ({
      url: `${siteConfig.url}${ROUTES.insights}/${i.slug}`,
      lastModified: new Date(`${i.published}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    page(ROUTES.about, 0.6),
    page(ROUTES.ai, 0.6),
    page(ROUTES.careers, 0.4),
  ];
}

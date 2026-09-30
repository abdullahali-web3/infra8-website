import type { Metadata } from "next";

/** Per-page metadata: unique title and description, canonical URL and matching Open Graph tags. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { title, description },
  };
}

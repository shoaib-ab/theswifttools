import type { MetadataRoute } from "next";
import { TOOLS } from "@/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://theswifttools.com";
  const currentDate = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: currentDate,
    changeFrequency: tool.status === "ready" ? "weekly" : "monthly",
    priority: tool.status === "ready" ? 0.9 : 0.7,
  }));

  const variantPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/compress-image-to-20kb`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/compress-image-to-50kb`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/compress-image-to-100kb`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/compress-image-to-200kb`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/compress-image-to-500kb`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/compress-image-to-1mb`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/age-calculator-in-days`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
  ];

  return [...staticPages, ...toolPages, ...variantPages];
}

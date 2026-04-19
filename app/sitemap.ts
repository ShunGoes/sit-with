import { MetadataRoute } from "next";
import { mockBlogs } from "@/lib/mock-data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sit-with-pd.vercel.app";

  // Static routes
  const routes = [
    "",
    "/about",
    "/programs",
    "/consultation",
    "/camps",
    "/membership",
    "/contact",
    "/blog",
    "/terms",
    "/privacy-policy",
    "/refund-policy",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog dynamic routes
  const blogRoutes = mockBlogs.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}

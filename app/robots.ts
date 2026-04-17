import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/_next/"] },
    ],
    sitemap: "https://www.fitgearrank.com/sitemap.xml",
    host: "https://www.fitgearrank.com",
  };
}

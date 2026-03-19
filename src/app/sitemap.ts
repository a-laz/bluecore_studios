import { articles } from "./research/[slug]/articles";

export default function sitemap() {
  return [
    {
      url: "https://bluecorestudio.com",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: "https://bluecorestudio.com/case-studies/refi2",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...Object.values(articles).map((a) => ({
      url: `https://bluecorestudio.com/research/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}

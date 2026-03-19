export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/crm/",
    },
    sitemap: "https://bluecorestudio.com/sitemap.xml",
  };
}

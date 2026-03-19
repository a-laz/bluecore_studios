import { ImageResponse } from "next/og";
import { articles } from "../../research/[slug]/articles";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";
  const article = articles[slug];

  const title = article?.title ?? "Bluecore Studios";
  const tags = article?.tags ?? [];
  const readTime = article?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1526 60%, #0a1020 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, transparent 100%)",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#3b82f6",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "#3b82f6",
              textTransform: "uppercase",
            }}
          >
            BLUECORE STUDIOS
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <span
            style={{
              fontSize: title.length > 60 ? "40px" : "48px",
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </span>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 14px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#93c5fd",
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  borderRadius: "6px",
                  letterSpacing: "0.03em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {readTime && (
            <span style={{ fontSize: "14px", color: "#64748b" }}>{readTime}</span>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

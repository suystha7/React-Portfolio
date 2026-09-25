import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Auto-generated social share card (no design tool needed). */
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #020617 0%, #1e3a8a 55%, #c2410c 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.8 }}>👋 Hello, I&apos;m</div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 8 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 44, marginTop: 12, opacity: 0.9 }}>
          {siteConfig.role} — React &amp; Next.js
        </div>
      </div>
    ),
    { ...size }
  );
}

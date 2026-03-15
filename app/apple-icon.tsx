import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 900, fontSize: 110, fontFamily: "sans-serif" }}>D</span>
      </div>
    ),
    { ...size }
  );
}
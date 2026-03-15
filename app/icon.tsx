import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 900, fontSize: 20, fontFamily: "sans-serif" }}>D</span>
      </div>
    ),
    { ...size }
  );
}
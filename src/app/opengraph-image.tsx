import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#4b1f6f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #c9a23c",
            color: "#c9a23c",
            fontSize: 46,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          ΔΤΔ
        </div>
        <div style={{ display: "flex", fontSize: 66, fontWeight: 700, letterSpacing: 2, color: "#f8f5ef" }}>
          DELTA TAU DELTA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#e6c869",
            marginTop: 14,
            letterSpacing: 3,
          }}
        >
          EPSILON NU CHAPTER · MISSOURI S&T
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#f8f5ef", opacity: 0.7, marginTop: 44 }}>
          Committed to Lives of Excellence
        </div>
      </div>
    ),
    { ...size }
  );
}

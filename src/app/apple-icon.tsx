import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (iOS home-screen). SVG isn't supported for apple-icon,
// so we render the brand tile to a PNG at build time.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #a9cb62 0%, #8cb33f 55%, #6d8f2e 100%)",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M23 14 V27 a5 5 0 0 0 10 0 V14" />
            <path d="M28 32 V50" />
            <path d="M23 14 V25" />
            <path d="M33 14 V25" />
            <path d="M43 14 c-4 5 -5.5 10 -5.5 15 s1.5 6 4 6 4 -3 4 -8 -1 -8 -2.5 -13 Z" />
            <path d="M41.5 34 V50" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}

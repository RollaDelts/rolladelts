"use client";

// global-error replaces the root layout entirely when it's active, so it
// can't rely on globals.css having loaded — inline styles only.
export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "1.5rem",
          textAlign: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "#f8f5ef",
          color: "#241a2e",
        }}
      >
        <span
          style={{
            display: "flex",
            width: "4rem",
            height: "4rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            border: "2px solid #c9a23c",
            background: "#4b1f6f",
            color: "#c9a23c",
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          ΔΤΔ
        </span>
        <h1 style={{ color: "#4b1f6f", fontSize: "1.75rem", margin: "0.5rem 0 0" }}>Something Went Wrong</h1>
        <p style={{ color: "#5c5468", maxWidth: "28rem", margin: 0 }}>
          Sorry about that — an unexpected error occurred. Try again, or head back home.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              borderRadius: "9999px",
              background: "#4b1f6f",
              color: "white",
              border: "none",
              padding: "0.75rem 2rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
          <a
            href="/"
            style={{
              borderRadius: "9999px",
              border: "2px solid #4b1f6f",
              color: "#4b1f6f",
              padding: "0.75rem 2rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back to Home
          </a>
        </div>
      </body>
    </html>
  );
}

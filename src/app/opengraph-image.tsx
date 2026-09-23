import { ImageResponse } from "next/og";

export const alt = "MALLORD — Creative Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: "#060608",
        color: "#F0ECE3",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          right: -220,
          top: -260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(125,211,252,0.22) 0%, rgba(125,211,252,0) 68%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#7DD3FC",
          fontSize: 21,
          letterSpacing: "0.15em",
          fontWeight: 700,
        }}
      >
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#7DD3FC",
            display: "flex",
          }}
        />
        <span>INDEPENDENT CREATIVE STUDIO</span>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 116,
            lineHeight: 0.82,
            fontWeight: 800,
            letterSpacing: "-0.07em",
          }}
        >
          MALLORD
        </div>

        <div
          style={{
            fontSize: 116,
            lineHeight: 0.82,
            fontWeight: 800,
            letterSpacing: "-0.07em",
            color: "transparent",
            WebkitTextStroke: "2px #7DD3FC",
          }}
        >
          CREATIVE
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <div
          style={{
            maxWidth: 650,
            fontSize: 25,
            lineHeight: 1.35,
            color: "rgba(240,236,227,0.58)",
          }}
        >
          AI-assisted visuals / short-form content / web experiences / creative direction
        </div>

        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.14em",
            color: "rgba(240,236,227,0.32)",
            whiteSpace: "nowrap",
          }}
        >
          TBILISI / GEORGIA
        </div>
      </div>
    </div>,
    size,
  );
}

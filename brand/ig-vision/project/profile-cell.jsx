// Profile grid cell renderer — renders a single 4:5 tile for the IG grid.
// Shared between all 3 directions; each direction tweaks headline font + weight.

function AccentWord({ text, purple, font = "display-heavy" }) {
  // Splits headline so one word (case-insensitive match) is purple.
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((p, i) => {
        const isPurple = p.trim().toLowerCase() === purple.toLowerCase();
        return (
          <span key={i} style={{ color: isPurple ? "#7B2FBE" : "inherit" }}>
            {p}
          </span>
        );
      })}
    </>
  );
}

// Reel indicator icon (top right of reels)
function ReelIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
    >
      <polygon points="5 3 19 12 5 21 5 3" fill="white" />
    </svg>
  );
}
function ReelPlays({ n }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 8,
        left: 10,
        color: "white",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "-apple-system, system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        gap: 4,
        textShadow: "0 1px 2px rgba(0,0,0,0.6)",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
      {n}
    </div>
  );
}

// A single grid cell. `config` drives appearance.
function GridCell({ config, typeKit }) {
  const { kind, headline, accent, variant } = config;
  // typeKit: { fontFamily, fontWeight, letterSpacing, lineHeight, textTransform, sizeScale }
  const headlineStyle = {
    fontFamily: typeKit.fontFamily,
    fontWeight: typeKit.fontWeight,
    letterSpacing: typeKit.letterSpacing,
    lineHeight: typeKit.lineHeight,
    textTransform: typeKit.textTransform || "uppercase",
    color: "white",
  };

  // DARK card
  if (kind === "dark-card") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: variant === "deepnavy" ? "#0E0E0E" : "#1A1A1A",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 12px",
          boxSizing: "border-box",
        }}
      >
        {/* subtle dot grid for system-architecture feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(168,162,158,.06) 0.6px, transparent 0.6px)",
            backgroundSize: "14px 14px",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            fontSize: (typeKit.sizeScale || 1) * 22,
            ...headlineStyle,
          }}
        >
          <AccentWord text={headline} purple={accent} />
        </div>
      </div>
    );
  }

  // LIGHT card
  if (kind === "light-card") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5F5F3",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 12px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(26,26,26,0.05) 0.6px, transparent 0.6px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            fontSize: (typeKit.sizeScale || 1) * 22,
            ...headlineStyle,
            color: "#1A1A1A",
          }}
        >
          <AccentWord text={headline} purple={accent} />
        </div>
      </div>
    );
  }

  // REEL cell (dark with text overlay + reel icon)
  if (kind === "reel") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(160deg, #1f1f24 0%, #121214 50%, #1A1020 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Real photo behind overlays */}
        {config.photoSrc && (
          <img
            src={config.photoSrc}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
              display: "block",
            }}
          />
        )}
        {/* Dark gradient overlay so text stays readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.72) 100%)",
          }}
        />
        {/* Reel indicator */}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <ReelIcon />
        </div>
        {/* Caption bottom */}
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 24,
            fontSize: (typeKit.sizeScale || 1) * 17,
            ...headlineStyle,
          }}
        >
          <AccentWord text={headline} purple={accent} />
        </div>
        <ReelPlays n={config.plays || "12.4K"} />
      </div>
    );
  }

  // LIFESTYLE (no text) — full-bleed photo
  if (kind === "lifestyle") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f0d15",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {config.photoSrc && (
          <img
            src={config.photoSrc}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
              display: "block",
            }}
          />
        )}
      </div>
    );
  }

  // DIAGRAM cell — LEADS → SYSTEM → CLIENTS
  if (kind === "diagram") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E0E0E",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "18px 12px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(168,162,158,.06) 0.6px, transparent 0.6px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: (typeKit.sizeScale || 1) * 11,
            ...headlineStyle,
            marginBottom: 16,
          }}
        >
          <DiagramNode label="LEADS" filled={false} typeKit={typeKit} />
          <DiagramArrow />
          <DiagramNode label="SYSTEM" filled={true} typeKit={typeKit} />
          <DiagramArrow />
          <DiagramNode label="CLIENTS" filled={false} typeKit={typeKit} />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: (typeKit.sizeScale || 1) * 11,
            ...headlineStyle,
            color: "#7B2FBE",
            marginTop: 4,
          }}
        >
          THE OPERATOR MODEL
        </div>
      </div>
    );
  }

  return null;
}

function DiagramNode({ label, filled, typeKit }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: filled
          ? "1.5px solid #7B2FBE"
          : "1.5px solid rgba(255,255,255,0.35)",
        background: filled ? "#7B2FBE" : "transparent",
        boxShadow: filled ? "0 0 18px rgba(123,47,190,0.5)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        color: "white",
        fontFamily: typeKit.fontFamily,
        fontWeight: typeKit.fontWeight,
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </div>
  );
}
function DiagramArrow() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
      <path
        d="M0 5 H15 M11 1 L15 5 L11 9"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Object.assign(window, { GridCell, AccentWord, ReelIcon, ReelPlays });

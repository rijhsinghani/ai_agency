// Profile header + highlights + tab bar for IG profile mockup

function VerifiedBadge({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 1l2.4 2.2 3.2-.3.9 3.1 2.9 1.4-1.1 3 1.1 3-2.9 1.4-.9 3.1-3.2-.3L12 19l-2.4-2.2-3.2.3-.9-3.1L2.6 12.6 3.7 9.6 2.6 6.6 5.5 5.2 6.4 2.1l3.2.3L12 1z"
        fill="#0095F6"
      />
      <path
        d="M8.5 12.2l2.3 2.3 4.7-4.7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function Avatar({ size = 86 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <img
        src="assets/photos/avatar.jpg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          display: "block",
        }}
      />
    </div>
  );
}

function HighlightCircle({ label, src, size = 66 }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 25%",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#F5F5F3",
          fontFamily: "-apple-system, system-ui",
          fontWeight: 400,
          letterSpacing: "-0.02em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ProfileHeader({ typeKit, highlightTreatment }) {
  return (
    <div style={{ padding: "8px 16px 0", color: "#F5F5F3" }}>
      {/* top bar: handle + icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 0 14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "-apple-system, system-ui",
          }}
        >
          <span
            style={{
              fontWeight: 400,
              color: "rgba(245,245,243,0.6)",
              marginRight: 2,
            }}
          >
            ◁
          </span>
          sameer_rijhsinghani
          <VerifiedBadge size={14} />
          <span
            style={{
              marginLeft: 4,
              fontWeight: 400,
              color: "rgba(245,245,243,0.6)",
            }}
          >
            ▾
          </span>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F5F5F3"
            strokeWidth="1.6"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F5F5F3"
            strokeWidth="1.6"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </div>

      {/* avatar + stats row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          marginBottom: 12,
        }}
      >
        <Avatar size={86} />
        <div
          style={{
            display: "flex",
            gap: 22,
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {[
            ["68", "posts"],
            ["368", "followers"],
            ["1,373", "following"],
          ].map(([n, l], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  fontFamily: "-apple-system, system-ui",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#F5F5F3",
                  fontFamily: "-apple-system, system-ui",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* name + category */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "-apple-system, system-ui",
          lineHeight: 1.3,
        }}
      >
        Sameer Rijhsinghani
      </div>
      <div
        style={{
          fontSize: 13,
          color: "rgba(245,245,243,0.55)",
          fontFamily: "-apple-system, system-ui",
          marginBottom: 6,
        }}
      >
        Consulting agency
      </div>

      {/* bio */}
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          fontFamily: "-apple-system, system-ui",
          color: "#F5F5F3",
        }}
      >
        <div>Growth systems for founders who do everything.</div>
        <div style={{ color: "rgba(245,245,243,0.7)" }}>
          I build the stack you'd have with a full team — one person, AI-first.
        </div>
      </div>

      {/* link */}
      <div
        style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5F5F3"
          strokeWidth="2"
        >
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#F5F5F3",
            fontFamily: "-apple-system, system-ui",
          }}
        >
          sameerautomations.com
        </span>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
        <button
          style={{
            flex: 1,
            height: 32,
            borderRadius: 8,
            border: "1px solid rgba(245,245,243,0.18)",
            background: "transparent",
            color: "#F5F5F3",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "-apple-system, system-ui",
          }}
        >
          Edit profile
        </button>
        <button
          style={{
            flex: 1,
            height: 32,
            borderRadius: 8,
            border: "1px solid rgba(245,245,243,0.18)",
            background: "transparent",
            color: "#F5F5F3",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "-apple-system, system-ui",
          }}
        >
          View archive
        </button>
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid rgba(245,245,243,0.18)",
            background: "transparent",
            color: "#F5F5F3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="#F5F5F3"
            strokeWidth="1.4"
          >
            <path d="M2 4l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Highlights */}
      <div
        style={{ display: "flex", gap: 20, marginTop: 18, paddingBottom: 6 }}
      >
        <HighlightCircle
          label="About"
          src="assets/photos/highlight-about.jpg"
        />
        <HighlightCircle
          label="Case Studies"
          src="assets/photos/highlight-case-studies.jpg"
        />
        <HighlightCircle
          label="Work With Me"
          src="assets/photos/highlight-work-with-me.jpg"
        />
      </div>
    </div>
  );
}

function TabBar() {
  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid rgba(245,245,243,0.1)",
        marginTop: 8,
      }}
    >
      {[
        <svg
          key="g"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5F5F3"
          strokeWidth="1.6"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>,
        <svg
          key="r"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(245,245,243,0.5)"
          strokeWidth="1.6"
        >
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>,
        <svg
          key="t"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(245,245,243,0.5)"
          strokeWidth="1.6"
        >
          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
        </svg>,
        <svg
          key="p"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(245,245,243,0.5)"
          strokeWidth="1.6"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>,
      ].map((ic, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom:
              i === 0 ? "1.5px solid #F5F5F3" : "1.5px solid transparent",
          }}
        >
          {ic}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  ProfileHeader,
  TabBar,
  VerifiedBadge,
  Avatar,
  HighlightCircle,
});

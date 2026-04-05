"use client";

import { useRef, useCallback } from "react";
import html2canvas from "html2canvas-pro";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  DOWNLOAD — clone element to body at full size, capture, remove           */
/*  This avoids the CSS transform scaling issue with html2canvas.            */
/* ═══════════════════════════════════════════════════════════════════════════ */
function useDownload() {
  return useCallback(async (el: HTMLElement | null, filename: string) => {
    if (!el) return;

    // Clone the full-size creative and render it offscreen at actual pixel size
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.top = "-99999px";
    clone.style.left = "-99999px";
    clone.style.zIndex = "-1";
    clone.style.transform = "none";
    document.body.appendChild(clone);

    // Wait a tick for images to resolve in the clone
    await new Promise((r) => setTimeout(r, 100));

    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#000000",
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    document.body.removeChild(clone);

    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD FRAME — fixed pixel render + scale-down display + download           */
/* ═══════════════════════════════════════════════════════════════════════════ */
function AdFrame({
  id,
  label,
  w,
  h,
  children,
}: {
  id: string;
  label: string;
  w: number;
  h: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const download = useDownload();
  const displayW = 440;
  const scale = displayW / w;

  return (
    <div
      className="shrink-0 snap-center flex flex-col items-center gap-4"
      style={{ width: displayW }}
    >
      <div className="w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
            {w}×{h}
          </span>
          <span className="h-3 w-px bg-zinc-800" />
          <span className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest">
            {label}
          </span>
        </div>
        <span className="text-[10px] text-zinc-600 font-mono">{id}</span>
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-zinc-800"
        style={{ width: displayW, height: h * scale }}
      >
        <div
          style={{
            width: w,
            height: h,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div
            ref={ref}
            style={{
              width: w,
              height: h,
              position: "relative",
              overflow: "hidden",
              background: "#000",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      <button
        onClick={() => download(ref.current, `arc-${id}-${w}x${h}`)}
        className="flex items-center gap-2 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 px-5 py-2.5 text-xs font-bold text-[#CCFF00] hover:bg-[#CCFF00]/20 transition-all cursor-pointer"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download PNG ({w * 2}×{h * 2})
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  S = inline style helper (keeps JSX readable)                            */
/* ═══════════════════════════════════════════════════════════════════════════ */
const S = {
  glow: (
    color: string,
    size: number,
    x = "50%",
    y = "50%",
    opacity = 0.25,
  ): React.CSSProperties => ({
    position: "absolute",
    top: y,
    left: x,
    transform: "translate(-50%, -50%)",
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    pointerEvents: "none",
    opacity,
  }),
  badge: (bg: string, color: string): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: bg,
    border: `1.5px solid ${color}33`,
    borderRadius: 100,
    padding: "10px 22px",
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color,
  }),
  cta: (): React.CSSProperties => ({
    background: "#CCFF00",
    color: "#000",
    fontSize: 20,
    fontWeight: 900,
    padding: "16px 40px",
    borderRadius: 100,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  }),
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 1 — HERO PHONE (Brand statement)                                     */
/*  Massive phone centered, headline top, phone glowing.                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad01() {
  return (
    <AdFrame id="hero-phone" label="Brand · Hero" w={1080} h={1080}>
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 72,
          position: "relative",
          background: "#000",
        }}
      >
        {/* BIG glow behind phone */}
        <div style={S.glow("rgba(204,255,0,0.3)", 700, "50%", "60%")} />
        <div style={S.glow("rgba(204,255,0,0.08)", 1000, "50%", "55%")} />

        {/* Headline */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: 80,
              lineHeight: 0.92,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#fff",
              margin: 0,
            }}
          >
            Stop fighting
          </p>
          <p
            style={{
              fontSize: 88,
              lineHeight: 0.92,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#CCFF00",
              margin: 0,
            }}
          >
            your body.
          </p>
        </div>

        {/* HUGE phone — overflows bottom */}
        <div style={{ position: "relative", zIndex: 10, width: 420 }}>
          <img
            src="/01-cut.png"
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            height: 280,
            background: "linear-gradient(to top, #000 30%, transparent)",
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 72,
            right: 72,
            zIndex: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#CCFF00",
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#71717a",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Circadian Rhythm Tracker
            </span>
          </div>
          <div style={S.cta()}>Download Free</div>
        </div>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 2 — CHRONOTYPE QUIZ (Curiosity)                                      */
/*  Big emojis, bold question, clean.                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad02() {
  return (
    <AdFrame id="chronotype-quiz" label="Curiosity · Quiz" w={1080} h={1080}>
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          background: "#000",
          position: "relative",
        }}
      >
        <div style={S.glow("rgba(204,255,0,0.06)", 800, "50%", "35%")} />

        {/* Badge */}
        <div style={S.badge("rgba(204,255,0,0.08)", "#CCFF00")}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#CCFF00",
            }}
          />
          22-Point Diagnosis
        </div>

        {/* Big emojis */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            gap: 28,
            fontSize: 90,
          }}
        >
          <span>🦁</span>
          <span>🐻</span>
          <span>🐺</span>
          <span>🐬</span>
        </div>

        {/* Question */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p
            style={{
              fontSize: 76,
              lineHeight: 1.0,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#fff",
              margin: 0,
            }}
          >
            Which one
            <br />
            are <span style={{ color: "#CCFF00" }}>you</span>?
          </p>
        </div>

        {/* Chronotype names */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            gap: 32,
            fontSize: 16,
            fontWeight: 700,
            color: "#555",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>Lion</span>
          <span style={{ color: "#333" }}>·</span>
          <span>Bear</span>
          <span style={{ color: "#333" }}>·</span>
          <span>Wolf</span>
          <span style={{ color: "#333" }}>·</span>
          <span>Dolphin</span>
        </div>

        <div style={S.cta()}>Find Your Chronotype →</div>

        <span
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 16,
            color: "#2a2a2a",
            fontWeight: 600,
          }}
        >
          arcapp.sbs
        </span>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 3 — CAFFEINE SPLIT (Shock)                                           */
/*  Left: 3PM coffee. Right: Midnight still active. Dramatic split.        */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad03() {
  return (
    <AdFrame id="caffeine-split" label="Shock · Split" w={1080} h={1080}>
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          background: "#000",
          position: "relative",
        }}
      >
        {/* Left half */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            borderRight: "1px solid #1a1a1a",
            position: "relative",
          }}
        >
          <div style={S.glow("rgba(204,255,0,0.12)", 400, "50%", "50%")} />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#555",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              position: "relative",
              zIndex: 10,
            }}
          >
            3:00 PM
          </span>
          <span style={{ fontSize: 120, position: "relative", zIndex: 10 }}>
            ☕
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 10,
            }}
          >
            95 mg
          </span>
          <span
            style={{
              fontSize: 18,
              color: "#555",
              fontWeight: 600,
              position: "relative",
              zIndex: 10,
            }}
          >
            You feel great.
          </span>
        </div>

        {/* Right half */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div style={S.glow("rgba(255,107,53,0.15)", 400, "50%", "50%")} />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#555",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              position: "relative",
              zIndex: 10,
            }}
          >
            12:00 AM
          </span>
          <span style={{ fontSize: 120, position: "relative", zIndex: 10 }}>
            😵
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#ff6b35",
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 10,
            }}
          >
            24 mg
          </span>
          <span
            style={{
              fontSize: 18,
              color: "#ff6b35",
              fontWeight: 600,
              position: "relative",
              zIndex: 10,
            }}
          >
            Still active.
          </span>
        </div>

        {/* Center divider badge */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            background: "#111",
            border: "2px solid #333",
            borderRadius: 100,
            padding: "12px 24px",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#ff6b35",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            5h half-life
          </span>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: 0,
            }}
          >
            ARC shows your{" "}
            <span style={{ color: "#CCFF00" }}>exact cutoff.</span>
          </p>
          <div style={S.cta()}>Track Your Caffeine →</div>
        </div>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 4 — NOTIFICATION STACK (Social Proof)                                 */
/*  Beautiful iOS-style notifications.                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad05() {
  const notifs = [
    {
      time: "7:12 AM",
      icon: "☀️",
      title: "Good morning, Bear.",
      body: "Get outside. 10 min of light anchors your whole day.",
      glow: "#CCFF00",
    },
    {
      time: "8:42 AM",
      icon: "☕",
      title: "Coffee time.",
      body: "Adenosine cleared. Your brew hits clean now — no crash.",
      glow: "#CCFF00",
    },
    {
      time: "2:30 PM",
      icon: "🚫",
      title: "Caffeine wall — stop.",
      body: "Every cup from here costs you 15 min of deep sleep.",
      glow: "#ff6b35",
    },
    {
      time: "9:45 PM",
      icon: "🌙",
      title: "Wind down.",
      body: "Melatonin rising. Dim lights. Kill bright screens.",
      glow: "#a78bfa",
    },
  ];
  return (
    <AdFrame id="notifications" label="Demo · Notifications" w={1080} h={1080}>
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: "#000",
          position: "relative",
          padding: "0 80px",
        }}
      >
        <div style={S.glow("rgba(204,255,0,0.04)", 900, "50%", "50%")} />

        <p
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "#444",
            textTransform: "uppercase",
          }}
        >
          Smart Notifications
        </p>

        {/* Notification stack */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
          }}
        >
          {notifs.map((n) => (
            <div
              key={n.time}
              style={{
                background: "#111",
                border: "1px solid #1e1e1e",
                borderRadius: 24,
                padding: "22px 28px",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 32, marginTop: 2 }}>{n.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}
                  >
                    {n.title}
                  </span>
                  <span
                    style={{
                      color: "#333",
                      fontSize: 14,
                      flexShrink: 0,
                      marginLeft: 16,
                    }}
                  >
                    {n.time}
                  </span>
                </div>
                <p
                  style={{
                    color: "#666",
                    fontSize: 16,
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {n.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p
            style={{
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Timed to <span style={{ color: "#CCFF00" }}>your biology.</span>
          </p>
          <p
            style={{
              fontSize: 22,
              color: "#444",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Not a generic reminder app.
          </p>
        </div>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 5 — SUNLIGHT TIMER + PHONE (Feature)                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad04() {
  return (
    <AdFrame id="sunlight" label="Feature · Sunlight" w={1080} h={1080}>
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          alignItems: "stretch",
          background: "#000",
          position: "relative",
        }}
      >
        {/* Warm glow behind phone */}
        <div style={S.glow("rgba(251,191,36,0.18)", 700, "72%", "55%")} />

        {/* Left content — vertically centered */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            paddingLeft: 80,
            paddingRight: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div style={{ ...S.badge("rgba(251,191,36,0.1)", "#fbbf24"), alignSelf: "flex-start" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fbbf24",
              }}
            />
            Stanford Protocol
          </div>

          <div>
            <p
              style={{
                fontSize: 120,
                lineHeight: 0.85,
                fontWeight: 900,
                letterSpacing: "-0.06em",
                color: "#fbbf24",
                margin: 0,
              }}
            >
              10
            </p>
            <p
              style={{
                fontSize: 52,
                lineHeight: 1.05,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#fff",
                margin: "4px 0 0",
              }}
            >
              minutes of
              <br />
              morning light.
            </p>
          </div>

          <p
            style={{
              fontSize: 18,
              color: "#666",
              lineHeight: 1.6,
              maxWidth: 380,
              margin: 0,
            }}
          >
            Sets your melatonin timer 14–16 hours later. ARC tracks it live.
          </p>

          <div style={{ ...S.cta(), alignSelf: "flex-start" }}>Track It →</div>
        </div>

        {/* Right phone — vertically centered */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: 420,
            display: "flex",
            alignItems: "center",
            marginRight: -20,
          }}
        >
          <img
            src="/02.png"
            alt=""
            style={{ width: "100%", height: "auto", borderRadius: 28 }}
          />
        </div>

        <span style={{ position: "absolute", top: 36, right: 48, fontSize: 18, fontWeight: 900, color: "rgba(255,255,255,0.06)", letterSpacing: "0.2em" }}>ARC.</span>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 6 — TEXT ONLY (Curiosity / Statement)                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad06_text() {
  return (
    <AdFrame
      id="curiosity-text"
      label="Curiosity · Statement"
      w={1080}
      h={1080}
    >
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          background: "#000",
          position: "relative",
        }}
      >
        <div style={S.glow("rgba(204,255,0,0.04)", 800, "50%", "50%")} />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p
            style={{
              fontSize: 78,
              lineHeight: 1.0,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#fff",
              margin: 0,
            }}
          >
            What if your body
            <br />
            already knows the
            <br />
            <span style={{ color: "#CCFF00" }}>perfect schedule?</span>
          </p>
        </div>

        <div
          style={{ width: 60, height: 3, background: "#222", borderRadius: 2 }}
        />

        <p
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 22,
            color: "#555",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 560,
            margin: 0,
          }}
        >
          A 22-point diagnosis maps your chronotype.
          <br />
          ARC builds your biology&apos;s ideal day.
        </p>

        <div style={S.cta()}>Discover Yours →</div>

        <span
          style={{
            position: "absolute",
            top: 44,
            fontSize: 22,
            fontWeight: 900,
            color: "rgba(255,255,255,0.05)",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
          }}
        >
          ARC
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 16,
            color: "#222",
            fontWeight: 600,
          }}
        >
          arcapp.sbs
        </span>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 7 — SOCIAL PROOF (Big stat)                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad07_proof() {
  return (
    <AdFrame id="social-proof" label="Social Proof" w={1080} h={1080}>
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          background: "#000",
          position: "relative",
        }}
      >
        <div style={S.glow("rgba(204,255,0,0.08)", 700, "50%", "40%")} />

        <span
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "#444",
            textTransform: "uppercase",
          }}
        >
          Since Launch
        </span>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p
            style={{
              fontSize: 220,
              lineHeight: 0.8,
              fontWeight: 900,
              letterSpacing: "-0.07em",
              color: "#CCFF00",
              margin: 0,
            }}
          >
            201
            <span
              style={{ fontSize: 80, verticalAlign: "top", lineHeight: 0.8 }}
            >
              +
            </span>
          </p>
          <p
            style={{
              fontSize: 52,
              lineHeight: 1.15,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: "16px 0 0",
            }}
          >
            people synced
            <br />
            their biology.
          </p>
        </div>

        {/* Review card */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            background: "#111",
            border: "1px solid #222",
            borderRadius: 24,
            padding: "24px 32px",
            maxWidth: 580,
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flex: 1,
            }}
          >
            <span style={{ color: "#CCFF00", fontSize: 20, letterSpacing: 2 }}>
              ★★★★★
            </span>
            <p
              style={{
                color: "#888",
                fontSize: 17,
                lineHeight: 1.5,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              &ldquo;Finally understand why I crash at 2 PM. The caffeine
              tracker alone is worth it.&rdquo;
            </p>
          </div>
        </div>

        <div style={S.cta()}>Join Them →</div>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 8 — 8HRS EXHAUSTED (4:5 Pain Point)                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad08_sleep() {
  return (
    <AdFrame id="8hrs-exhausted" label="Pain · Timing" w={1080} h={1350}>
      <div
        style={{
          width: 1080,
          height: 1350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 80,
          background: "#000",
          position: "relative",
        }}
      >
        <div style={S.glow("rgba(204,255,0,0.06)", 800, "50%", "25%")} />

        <span
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: "#444",
            textTransform: "uppercase",
          }}
        >
          The Timing Problem
        </span>

        {/* Giant stat */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p
            style={{
              fontSize: 260,
              lineHeight: 0.75,
              fontWeight: 900,
              letterSpacing: "-0.08em",
              color: "#fff",
              margin: 0,
            }}
          >
            8<span style={{ fontSize: 100, color: "#333" }}>hrs</span>
          </p>
          <p
            style={{
              fontSize: 56,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: "20px 0 0",
            }}
          >
            of sleep.
            <br />
            Still <span style={{ color: "#CCFF00" }}>exhausted.</span>
          </p>
          <div
            style={{
              width: 80,
              height: 3,
              background: "#222",
              margin: "28px auto",
              borderRadius: 2,
            }}
          />
          <p
            style={{ fontSize: 24, color: "#555", lineHeight: 1.5, margin: 0 }}
          >
            It&apos;s not <em>how long</em>. It&apos;s{" "}
            <strong style={{ color: "#fff" }}>when.</strong>
          </p>
        </div>

        {/* Phone overflowing bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: 380,
            marginBottom: -200,
          }}
        >
          <img
            src="/01-cut.png"
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 32,
              boxShadow: "0 0 120px rgba(204,255,0,0.12)",
            }}
          />
        </div>

        {/* Bottom fade + CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            background: "linear-gradient(to top, #000 40%, transparent)",
            paddingTop: 200,
            paddingBottom: 52,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={S.cta()}>Fix Your Timing →</div>
          <span style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>
            Free on the App Store
          </span>
        </div>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 9 — ADHD BRAIN (4:5)                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad09_adhd() {
  const blocks = [
    { time: "7:30", icon: "☀️", name: "Sunlight Anchoring", tag: "LIVE" },
    { time: "9:00", icon: "⚡", name: "Peak Focus Window", tag: "2H" },
    { time: "9:15", icon: "☕", name: "First Coffee", tag: "CLEAR" },
    { time: "12:30", icon: "🚶", name: "Movement Break", tag: "15M" },
    { time: "9:30", icon: "🌙", name: "Wind Down", tag: "START" },
  ];
  return (
    <AdFrame id="adhd-protocol" label="ADHD · Protocol" w={1080} h={1350}>
      <div
        style={{
          width: 1080,
          height: 1350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 72px 56px",
          background: "#000",
          position: "relative",
        }}
      >
        <div style={S.glow("rgba(204,255,0,0.05)", 700, "50%", "70%")} />

        <div style={S.badge("rgba(204,255,0,0.08)", "#CCFF00")}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#CCFF00",
            }}
          />
          Built for ADHD
        </div>

        {/* Headline */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p
            style={{
              fontSize: 60,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: 0,
            }}
          >
            Not another
          </p>
          <p
            style={{
              fontSize: 60,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#555",
              margin: 0,
              textDecoration: "line-through",
            }}
          >
            to-do list.
          </p>
          <p
            style={{
              fontSize: 60,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#CCFF00",
              margin: "8px 0 0",
            }}
          >
            A biology schedule.
          </p>
        </div>

        {/* Protocol blocks */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
          }}
        >
          {blocks.map((b) => (
            <div
              key={b.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "#0a0a0a",
                border: "1px solid #1a1a1a",
                borderRadius: 20,
                padding: "18px 24px",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "#555",
                  fontFamily: "monospace",
                  width: 52,
                  flexShrink: 0,
                }}
              >
                {b.time}
              </span>
              <span style={{ fontSize: 28 }}>{b.icon}</span>
              <span
                style={{
                  fontSize: 20,
                  color: "#fff",
                  fontWeight: 700,
                  flex: 1,
                }}
              >
                {b.name}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#CCFF00",
                  fontWeight: 800,
                  background: "rgba(204,255,0,0.1)",
                  padding: "6px 14px",
                  borderRadius: 8,
                  letterSpacing: "0.15em",
                }}
              >
                {b.tag}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={S.cta()}>Get Your Protocol →</div>
          <span style={{ fontSize: 14, color: "#444", fontWeight: 600 }}>
            Timed. Visual. Biology-aligned.
          </span>
        </div>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 10 — CAFFEINE TRACKER SHOWCASE (4:5)                                  */
/*  Massive phone screenshot as hero.                                        */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad10_caffeine() {
  return (
    <AdFrame id="caffeine-hero" label="Feature · Caffeine" w={1080} h={1350}>
      <div
        style={{
          width: 1080,
          height: 1350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 72px 52px",
          background: "#000",
          position: "relative",
        }}
      >
        <div style={S.glow("rgba(204,255,0,0.18)", 600, "50%", "50%")} />

        {/* Top */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <div
            style={{
              ...S.badge("rgba(204,255,0,0.08)", "#CCFF00"),
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#CCFF00",
              }}
            />
            Flagship Feature
          </div>
          <p
            style={{
              fontSize: 52,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: 0,
            }}
          >
            Know the <span style={{ color: "#CCFF00" }}>exact minute</span>
            <br />
            to stop coffee.
          </p>
        </div>

        {/* HUGE phone */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: 480,
            margin: "16px 0",
          }}
        >
          <img
            src="/03.png"
            alt=""
            style={{ width: "100%", height: "auto", borderRadius: 32 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 32,
              boxShadow:
                "0 0 100px rgba(204,255,0,0.12), inset 0 0 0 1px rgba(204,255,0,0.08)",
            }}
          />
        </div>

        {/* Bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 15,
              fontWeight: 700,
              color: "#555",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            <span>Live Curve</span>
            <span style={{ color: "#222" }}>·</span>
            <span>Sleep-Safe</span>
            <span style={{ color: "#222" }}>·</span>
            <span>mg Tracking</span>
          </div>
          <div style={S.cta()}>Track Your Caffeine →</div>
        </div>
      </div>
    </AdFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function AdsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black tracking-tighter">
            ARC<span className="text-[#CCFF00]">.</span> Ad Creatives
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Scroll → Click Download PNG → Post to Meta / Instagram / X
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
            2x Resolution
          </span>
        </div>
      </div>

      <div className="py-10 space-y-12">
        {/* 1:1 */}
        <section>
          <div className="flex items-center gap-4 mb-5 px-8">
            <h2 className="text-sm font-black tracking-widest uppercase text-zinc-400">
              1:1 Feed Posts
            </h2>
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] text-zinc-600 tracking-wider">
              ← SCROLL →
            </span>
          </div>
          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-8 px-8 w-max snap-x snap-mandatory pb-2">
              <Ad01 />
              <Ad02 />
              <Ad03 />
              <Ad04 />
              <Ad05 />
              <Ad06_text />
              <Ad07_proof />
            </div>
          </div>
        </section>

        {/* 4:5 */}
        <section>
          <div className="flex items-center gap-4 mb-5 px-8">
            <h2 className="text-sm font-black tracking-widest uppercase text-zinc-400">
              4:5 Portrait Posts
            </h2>
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] text-zinc-600 tracking-wider">
              ← SCROLL →
            </span>
          </div>
          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-8 px-8 w-max snap-x snap-mandatory pb-2">
              <Ad08_sleep />
              <Ad09_adhd />
              <Ad10_caffeine />
            </div>
          </div>
        </section>

        {/* Caption Copy Bank */}
        <section className="px-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-sm font-black tracking-widest uppercase text-zinc-400">
              Caption Copy
            </h2>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                ad: "hero-phone",
                angle: "Brand · Hero",
                copy: "Stop fighting your body. Start working with it.\n\nARC is a circadian rhythm tracker that maps your Perfect Day using chronobiology.\n\n🧬 22-point chronotype diagnosis\n☕ Live caffeine decay tracking\n☀️ Morning sunlight timer\n🔔 Smart bio-notifications timed to YOUR schedule\n🔒 100% local — your data never leaves your phone\n\nYour energy has a schedule. ARC just shows it to you.\n\nFree on the App Store → arcapp.sbs",
              },
              {
                ad: "chronotype-quiz",
                angle: "Quiz · Chronotype",
                copy: "There are 4 chronotypes: 🦁 Lion · 🐻 Bear · 🐺 Wolf · 🐬 Dolphin\n\nYours determines:\n→ When your brain peaks\n→ When to have your first coffee\n→ When you should do deep work\n→ When your body actually wants to sleep\n\nMost people have NO idea which one they are.\n\nARC identifies yours through a 22-point precision diagnosis, then builds your perfect day around it.\n\nWhich one are you? Find out in 3 min → arcapp.sbs",
              },
              {
                ad: "caffeine-split",
                angle: "Shock · Caffeine Split",
                copy: "Your 3 PM espresso is still 25% active at midnight. ☕→😵\n\nCaffeine has a 5-hour half-life. That means:\n• 3:00 PM — 95 mg (you feel great)\n• 8:00 PM — 47 mg (still wired)\n• 12:00 AM — 24 mg (disrupting your deep sleep)\n\nMost people have no idea they're sabotaging tonight's sleep with an afternoon cup.\n\nARC shows your live caffeine mg level, real-time decay curve, and the exact \"sleep-safe\" minute.\n\nStop guessing. Start tracking → arcapp.sbs",
              },
              {
                ad: "sunlight",
                angle: "Feature · Sunlight",
                copy: "10 minutes of morning sunlight before 10 AM is the single most powerful thing you can do for your energy.\n\nHere's why:\n→ Triggers a cortisol spike that wakes your brain up properly\n→ Sets a melatonin timer 14–16 hours later (hello, perfect bedtime)\n→ Clears leftover adenosine from the night\n\nSkip it and your sleep tonight suffers. Do it consistently and everything changes.\n\nARC tracks your morning sunlight with a live timer. Built on Stanford sleep science.\n\nAnchor your rhythm → arcapp.sbs",
              },
              {
                ad: "notifications",
                angle: "Demo · Notifications",
                copy: "This is what ARC sends you throughout the day:\n\n☀️ 7:12 AM — \"Good morning, Bear. Get outside. 10 min of light anchors your whole day.\"\n\n☕ 8:42 AM — \"Coffee time. Adenosine cleared. Your brew will hit clean now.\"\n\n🚫 2:30 PM — \"Caffeine wall — stop now. Every cup from here costs 15 min of deep sleep.\"\n\n🌙 9:45 PM — \"Start winding down. Melatonin is rising. Dim lights.\"\n\nNot generic reminders. Every nudge is timed to YOUR chronotype and YOUR biology.\n\nGet your personalized nudges → arcapp.sbs",
              },
              {
                ad: "curiosity-text",
                angle: "Curiosity · Statement",
                copy: "What if your body already knows the perfect schedule?\n\nWhen to focus. When to rest. When to drink coffee. When to wind down.\n\nIt does. It's called your chronotype — and it's been running in the background your entire life.\n\nARC uses a 22-point diagnosis to map yours and build a live 24-hour protocol around it.\n\nNo hardware. No guesswork. Just your biology, decoded.\n\nDiscover yours → arcapp.sbs",
              },
              {
                ad: "social-proof",
                angle: "Social Proof · Stat",
                copy: "201+ people have synced their schedule with their biology using ARC.\n\n⭐⭐⭐⭐⭐ \"Finally understand why I crash at 2 PM. The caffeine tracker alone is worth it.\"\n\nARC is a circadian rhythm tracker that doesn't just track your sleep — it tells you how to structure your entire day.\n\n→ 22-point chronotype diagnosis\n→ Live caffeine decay curve\n→ Morning sunlight timer\n→ Smart notifications timed to your biology\n\nJoin them. Free on the App Store → arcapp.sbs",
              },
              {
                ad: "8hrs-exhausted",
                angle: "Pain · Sleep Timing",
                copy: "8 hours of sleep. Still exhausted.\n\nSound familiar?\n\nHere's the thing nobody tells you: it was never about how LONG you sleep. It's about WHEN.\n\nYour body has a natural rhythm — when it wants to sleep, wake, focus, and rest. Fight that rhythm and no amount of hours will fix the fatigue.\n\nARC maps your rhythm with a 22-point chronotype diagnosis and builds a daily protocol to fix your timing — not just your duration.\n\nFix your timing → arcapp.sbs",
              },
              {
                ad: "adhd-protocol",
                angle: "ADHD · Protocol",
                copy: "If you have ADHD, another to-do list isn't the answer.\n\nYour brain doesn't respond to open-ended tasks. It needs timed, visual, biology-aligned structure.\n\nARC builds a live 24-hour protocol based on your chronotype:\n☀️ 7:30 — Sunlight Anchoring (live timer)\n⚡ 9:00 — Peak Focus Window (2h block)\n☕ 9:15 — First Coffee (adenosine clear)\n🚶 12:30 — Movement Break (15 min)\n🌙 9:30 — Wind Down (start)\n\nEvery block is timed to YOUR biology. Not a generic schedule. Not someone else's routine. Yours.\n\nGet your protocol → arcapp.sbs",
              },
              {
                ad: "caffeine-hero",
                angle: "Feature · Caffeine Tracker",
                copy: "This is ARC's flagship feature: the live caffeine tracker.\n\nEvery time you drink coffee, log it. ARC shows you:\n→ Your active caffeine in mg — right now\n→ A real-time decay curve based on 5-hour half-life\n→ The exact minute it's \"sleep-safe\"\n→ Your personal caffeine wall — the last safe cup\n\nMost people drink coffee on autopilot and wonder why they can't sleep. ARC makes the invisible visible.\n\nTrack your caffeine → arcapp.sbs",
              },
            ].map((c) => (
              <div
                key={c.ad}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00]">
                    {c.angle}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-700">{c.ad}</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line">
                  {c.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

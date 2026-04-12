"use client";

import { useRef, useCallback, useEffect } from "react";
import html2canvas from "html2canvas-pro";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  GOOGLE FONTS — loaded at runtime for html2canvas compatibility           */
/* ═══════════════════════════════════════════════════════════════════════════ */
function useFonts() {
  useEffect(() => {
    if (document.getElementById("ad-fonts")) return;
    const link = document.createElement("link");
    link.id = "ad-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  DOWNLOAD — clone element to body at full size, capture, remove           */
/* ═══════════════════════════════════════════════════════════════════════════ */
function useDownload() {
  return useCallback(async (el: HTMLElement | null, filename: string) => {
    if (!el) return;
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.top = "-99999px";
    clone.style.left = "-99999px";
    clone.style.zIndex = "-1";
    clone.style.transform = "none";
    document.body.appendChild(clone);
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
/*  AD FRAME                                                                  */
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
/*  SHARED                                                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
/* Font stack — 3 voices for different ad moods */
const FF = "'Inter', system-ui, -apple-system, sans-serif";

const FF_MONO = "'Space Mono', 'Courier New', monospace";

function Glow({
  color,
  size,
  x = "50%",
  y = "50%",
  opacity = 0.25,
}: {
  color: string;
  size: number;
  x?: string;
  y?: string;
  opacity?: number;
}) {
  return (
    <div
      style={{
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
      }}
    />
  );
}

function Cta({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-block",
        width: "fit-content",
        background: "#CCFF00",
        color: "#000",
        fontSize: 18,
        fontWeight: 900,
        padding: "16px 36px",
        borderRadius: 100,
        letterSpacing: "0.06em",
        fontFamily: FF,
        whiteSpace: "nowrap",
        boxShadow:
          "0 0 30px rgba(204,255,0,0.3), 0 0 80px rgba(204,255,0,0.1)",
      }}
    >
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 01 — "Slept 8 hours. Still can't keep my eyes open at work."          */
/*  Mirror their morning. No science. Just their life. 1:1                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad01() {
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#FF3B30" size={900} x="50%" y="30%" opacity={0.15} />

      <div
        style={{
          fontFamily: FF,
          fontSize: 78,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          marginBottom: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        Slept 8 hours.
        <br />
        <br />
        Still can&apos;t keep
        <br />
        my eyes open
        <br />
        <span style={{ color: "#FF3B30" }}>at work.</span>
      </div>

      <div
        style={{
          width: 60,
          height: 3,
          background: "#333",
          borderRadius: 2,
          marginBottom: 40,
        }}
      />

      <div
        style={{
          fontSize: 26,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 60,
          position: "relative",
          zIndex: 1,
        }}
      >
        What if the problem was never{" "}
        <span style={{ color: "#bbb" }}>how long</span> you slept?
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Find Out What's Wrong →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 02 — "That 3PM feeling where you'd sell your soul for a nap."         */
/*  Mirror the afternoon crash moment. Everyone knows this. 1:1             */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad02() {
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        textAlign: "center",
      }}
    >
      <Glow color="#FF9500" size={1000} x="50%" y="40%" opacity={0.15} />

      <div
        style={{
          fontSize: 156,
          fontWeight: 900,
          color: "#FF9500",
          lineHeight: 0.9,
          letterSpacing: "-0.06em",
          marginBottom: 40,
          fontVariantNumeric: "tabular-nums",
          position: "relative",
          zIndex: 1,
        }}
      >
        3 PM
      </div>

      <div
        style={{
          fontFamily: FF,
          fontSize: 50,
          fontWeight: 400,
          color: "#fff",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          maxWidth: 800,
          marginBottom: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        That feeling where you&apos;d sell your soul for a nap.
      </div>

      <div
        style={{
          fontSize: 24,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 56,
          position: "relative",
          zIndex: 1,
        }}
      >
        It happens at the same time every day.
        <br />
        <span style={{ color: "#bbb" }}>
          Shouldn&apos;t you know why?
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="See Your Energy Pattern →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 03 — "I go to bed tired. Then lie there for 2 hours wide awake."      */
/*  The can't-fall-asleep pain. Universally felt. 4:5                       */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad03() {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#3B82F6" size={800} x="50%" y="25%" opacity={0.12} />
      <Glow color="#A855F7" size={500} x="20%" y="70%" opacity={0.08} />

      {/* Stars */}
      {[
        { x: 150, y: 100, s: 2 },
        { x: 400, y: 180, s: 1.5 },
        { x: 800, y: 140, s: 2.5 },
        { x: 950, y: 280, s: 1.5 },
        { x: 250, y: 420, s: 2 },
        { x: 880, y: 380, s: 1.5 },
      ].map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: d.y,
            left: d.x,
            width: d.s,
            height: d.s,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          fontFamily: FF_MONO,
          fontSize: 40,
          fontWeight: 400,
          color: "#3B82F6",
          letterSpacing: "0.08em",
          marginBottom: 56,
          fontVariantNumeric: "tabular-nums",
          position: "relative",
          zIndex: 1,
        }}
      >
        11:43 PM
      </div>

      <div
        style={{
          fontFamily: FF,
          fontSize: 70,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          marginBottom: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        I go to bed
        <br />
        tired.
        <br />
        <br />
        Then lie there
        <br />
        for 2 hours
        <br />
        <span style={{ color: "#A855F7" }}>wide awake.</span>
      </div>

      <div
        style={{
          width: 50,
          height: 3,
          background: "#A855F7",
          opacity: 0.4,
          borderRadius: 2,
          marginBottom: 44,
        }}
      />

      <div
        style={{
          fontSize: 26,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 56,
          position: "relative",
          zIndex: 1,
        }}
      >
        There&apos;s a window when your body actually{" "}
        <span style={{ color: "#bbb" }}>wants</span> to sleep.
        <br />
        Miss it, and you wait 2 more hours.
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Find Your Sleep Window →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 04 — "My 4th coffee today and I still feel nothing."                  */
/*  Caffeine dependency pain — not a science lesson. 1:1                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad04() {
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#FF8800" size={800} x="40%" y="40%" opacity={0.15} />

      {/* Coffee count */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        {["☕", "☕", "☕", "☕"].map((c, i) => (
          <div
            key={i}
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: i < 3 ? "#FF880015" : "#FF880008",
              border: `1.5px solid ${i < 3 ? "#FF880030" : "#FF880015"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              opacity: i < 3 ? 0.4 : 1,
            }}
          >
            {c}
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 76,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          marginBottom: 44,
          position: "relative",
          zIndex: 1,
        }}
      >
        4th coffee today.
        <br />
        <br />
        Still feel{" "}
        <span style={{ color: "#FF8800" }}>nothing.</span>
      </div>

      <div
        style={{
          width: 50,
          height: 3,
          background: "#FF8800",
          opacity: 0.3,
          borderRadius: 2,
          marginBottom: 40,
        }}
      />

      <div
        style={{
          fontSize: 26,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 56,
          position: "relative",
          zIndex: 1,
        }}
      >
        It&apos;s not that you need more coffee.
        <br />
        <span style={{ color: "#bbb" }}>
          You&apos;re drinking it at the wrong time.
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Fix Your Coffee Timing →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 05 — "Sunday night. Already dreading the 6AM alarm."                  */
/*  Sunday scaries + alarm dread = emotional gut punch. 4:5                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad05() {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#FF3B30" size={700} x="70%" y="20%" opacity={0.12} />
      <Glow color="#CCFF00" size={500} x="20%" y="80%" opacity={0.08} />

      <div
        style={{
          fontFamily: FF_MONO,
          fontSize: 20,
          fontWeight: 400,
          color: "#777",
          letterSpacing: "0.06em",
          marginBottom: 44,
          position: "relative",
          zIndex: 1,
        }}
      >
        Sunday, 9:47 PM
      </div>

      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        Already dreading
        <br />
        the <span style={{ color: "#FF3B30" }}>6 AM</span> alarm.
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 400,
          color: "#888",
          lineHeight: 1.6,
          marginBottom: 24,
          position: "relative",
          zIndex: 1,
        }}
      >
        Every week. Same cycle:
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 60,
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          "Force yourself awake",
          "Drag through the morning",
          "Crash by afternoon",
          "Can't sleep at night",
          "Repeat",
        ].map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === 4 ? "#FF3B30" : "#333",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                fontSize: 24,
                color: i === 4 ? "#FF3B30" : "#555",
                fontWeight: i === 4 ? 700 : 400,
                fontStyle: i === 4 ? "italic" : "normal",
              }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 28,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        What if 6 AM was never{" "}
        <span style={{ color: "#CCFF00", fontWeight: 600 }}>your</span> time to
        wake up?
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Find Your Real Wake Time →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 06 — "I've tried everything. Melatonin. No screens. Meditation."      */
/*  The exhausted-of-trying pain. Deep emotional hook. 1:1                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad06() {
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#A855F7" size={800} x="60%" y="35%" opacity={0.14} />

      {/* Tried list — crossed out */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        {["Melatonin", "No screens after 9", "Meditation apps", "Magnesium", "Weighted blanket"].map(
          (item) => (
            <div
              key={item}
              style={{
                fontSize: 28,
                color: "#777",
                fontWeight: 500,
                textDecoration: "line-through",
                textDecorationColor: "#FF3B3066",
              }}
            >
              ✓ {item}
            </div>
          )
        )}
      </div>

      <div
        style={{
          fontFamily: FF,
          fontSize: 72,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          marginBottom: 44,
          position: "relative",
          zIndex: 1,
        }}
      >
        I&apos;ve tried
        <br />
        <span style={{ color: "#A855F7" }}>everything.</span>
        <br />
        <br />
        Still tired.
      </div>

      <div
        style={{
          fontSize: 26,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 56,
          position: "relative",
          zIndex: 1,
        }}
      >
        Maybe the problem isn&apos;t what you&apos;re doing.
        <br />
        <span style={{ color: "#bbb" }}>
          Maybe it&apos;s{" "}
          <span style={{ color: "#CCFF00", fontWeight: 600 }}>when</span>{" "}
          you&apos;re doing it.
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="See What's Actually Wrong →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 07 — "Everyone's asleep. I'm still wired."                            */
/*  Night owl loneliness. Deeply personal. 1:1                              */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad07() {
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Glow color="#3B82F6" size={1000} x="50%" y="25%" opacity={0.12} />
      <Glow color="#A855F7" size={600} x="30%" y="70%" opacity={0.08} />

      {/* Stars */}
      {[
        { x: 120, y: 90, s: 2 },
        { x: 340, y: 160, s: 1.5 },
        { x: 780, y: 120, s: 2.5 },
        { x: 920, y: 240, s: 1.5 },
        { x: 200, y: 380, s: 2 },
        { x: 860, y: 420, s: 1.5 },
        { x: 480, y: 80, s: 2 },
        { x: 650, y: 200, s: 1.5 },
      ].map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: dot.y,
            left: dot.x,
            width: dot.s,
            height: dot.s,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          fontFamily: FF_MONO,
          fontSize: 40,
          fontWeight: 400,
          color: "#3B82F6",
          letterSpacing: "0.08em",
          marginBottom: 52,
          fontVariantNumeric: "tabular-nums",
          position: "relative",
          zIndex: 1,
        }}
      >
        12:47 AM
      </div>

      <div
        style={{
          fontFamily: FF,
          fontSize: 74,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        Everyone&apos;s asleep.
        <br />
        <br />
        <span style={{ color: "#A855F7" }}>I&apos;m still wired.</span>
      </div>

      <div
        style={{
          width: 50,
          height: 3,
          background: "#A855F7",
          borderRadius: 2,
          marginBottom: 44,
          opacity: 0.4,
          position: "relative",
          zIndex: 1,
        }}
      />

      <div
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: "#999",
          lineHeight: 1.6,
          maxWidth: 700,
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        Nothing&apos;s wrong with you.
        <br />
        <span style={{ color: "#bbb" }}>
          Your brain just runs on a different clock.
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Find Your Clock →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 08 — "I wake up before my alarm and I'm STILL exhausted."             */
/*  The broken-rest pain. Very common, very frustrating. 4:5                */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad08() {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#FF3B30" size={700} x="60%" y="25%" opacity={0.12} />
      <Glow color="#3B82F6" size={500} x="30%" y="75%" opacity={0.08} />

      {/* Fake alarm display */}
      <div
        style={{
          background: "#080808",
          border: "1px solid #151515",
          borderRadius: 24,
          padding: "32px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 56,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FF_MONO,
              fontSize: 46,
              fontWeight: 700,
              color: "#fff",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.04em",
            }}
          >
            5:47 AM
          </div>
          <div style={{ fontSize: 16, color: "#777", marginTop: 4 }}>
            Alarm set for 6:30 AM
          </div>
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#FF3B30",
            background: "#FF3B3015",
            padding: "8px 16px",
            borderRadius: 10,
          }}
        >
          43 min early
        </div>
      </div>

      <div
        style={{
          fontSize: 76,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          marginBottom: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        Woke up before
        <br />
        my alarm.
        <br />
        <br />
        Still feel like{" "}
        <span style={{ color: "#FF3B30" }}>garbage.</span>
      </div>

      <div
        style={{
          width: 50,
          height: 3,
          background: "#333",
          borderRadius: 2,
          marginBottom: 44,
        }}
      />

      <div
        style={{
          fontSize: 26,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 56,
          position: "relative",
          zIndex: 1,
        }}
      >
        More sleep didn&apos;t fix it.
        <br />
        Less sleep didn&apos;t fix it.
        <br />
        <span style={{ color: "#bbb" }}>
          Maybe the timing is what&apos;s{" "}
          <span style={{ color: "#CCFF00", fontWeight: 600 }}>broken</span>.
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Check Your Timing →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 09 — The nightly scroll spiral. Timeline of their actual night. 1:1  */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad09() {
  const timeline = [
    { time: "11:02 PM", text: "I'll just check one more thing", color: "#999" },
    { time: "11:47 PM", text: "Okay, after this video", color: "#999" },
    { time: "12:33 AM", text: "Just 5 more minutes", color: "#3B82F6" },
    { time: "1:58 AM", text: "Why am I still awake", color: "#A855F7" },
    { time: "6:30 AM", text: "💀", color: "#FF3B30" },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#3B82F6" size={800} x="40%" y="40%" opacity={0.1} />
      <Glow color="#A855F7" size={500} x="70%" y="70%" opacity={0.08} />

      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#777",
          letterSpacing: "0.08em",
          marginBottom: 44,
          position: "relative",
          zIndex: 1,
        }}
      >
        Every. Single. Night.
      </div>

      {/* Timeline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        {timeline.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "18px 0",
              borderBottom: i < timeline.length - 1 ? "1px solid #0f0f0f" : "none",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: t.color,
                fontVariantNumeric: "tabular-nums",
                minWidth: 200,
                letterSpacing: "0.02em",
              }}
            >
              {t.time}
            </div>
            <div
              style={{
                fontSize: i === timeline.length - 1 ? 36 : 26,
                fontWeight: i === timeline.length - 1 ? 900 : 400,
                color: i === timeline.length - 1 ? "#FF3B30" : "#444",
                fontStyle: i < timeline.length - 1 ? "italic" : "normal",
              }}
            >
              {t.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          marginBottom: 44,
          position: "relative",
          zIndex: 1,
        }}
      >
        It&apos;s not a{" "}
        <span style={{ color: "#777", textDecoration: "line-through", textDecorationColor: "#FF3B3066" }}>
          discipline
        </span>
        <br />
        problem.
      </div>

      <div
        style={{
          fontSize: 26,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        Your body wasn&apos;t ready for sleep at 11.
        <br />
        <span style={{ color: "#bbb" }}>So you scrolled until it was.</span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Find Your Real Bedtime →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AD 10 — "Why do I feel most alive at 11PM when the day is over?"         */
/*  The Wolf frustration. Peak energy at the wrong time. 4:5                */
/* ═══════════════════════════════════════════════════════════════════════════ */
function Ad10() {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        background: "#000",
        fontFamily: FF,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
      }}
    >
      <Glow color="#CCFF00" size={800} x="60%" y="30%" opacity={0.1} />
      <Glow color="#A855F7" size={500} x="30%" y="80%" opacity={0.1} />

      <div
        style={{
          fontSize: 74,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        Why do I feel
        <br />
        most alive at
        <br />
        <span style={{ color: "#CCFF00" }}>11 PM</span>
        <br />
        <br />
        when the day
        <br />
        is already <span style={{ color: "#999" }}>over?</span>
      </div>

      <div
        style={{
          width: 50,
          height: 3,
          background: "#CCFF00",
          opacity: 0.3,
          borderRadius: 2,
          marginBottom: 44,
        }}
      />

      <div
        style={{
          fontSize: 28,
          color: "#999",
          lineHeight: 1.6,
          marginBottom: 24,
          position: "relative",
          zIndex: 1,
        }}
      >
        Sluggish all morning.
        <br />
        Useless after lunch.
        <br />
        <span style={{ color: "#bbb" }}>
          Finally sharp at{" "}
          <span style={{ color: "#CCFF00", fontWeight: 600 }}>10 PM</span>.
        </span>
      </div>

      <div
        style={{
          fontSize: 24,
          color: "#888",
          lineHeight: 1.6,
          marginBottom: 56,
          position: "relative",
          zIndex: 1,
        }}
      >
        You&apos;re not broken. Your peak time is just
        <br />
        different from what the world expects.
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Cta label="Find Your Peak Time →" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  CAPTIONS                                                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
const captions = [
  {
    id: "AD01",
    hook: "Slept 8 hours. Still can't keep my eyes open at 11AM.",
    body: `Sound familiar?

You did everything right. Went to bed early. Got your 8 hours. Woke up to the alarm.

And by mid-morning you're already done.

Here's what nobody tells you: the TIMING of your sleep matters more than the length. Sleeping 8 hours at the wrong time for your body is worse than 6 at the right time.

ARC figures out your personal rhythm and shows you when to actually sleep — for your biology, not a generic recommendation.

Download free → arcapp.sbs`,
    tags: "#TiredAllTheTime #SleepProblems #WhyAmISoTired #ARC #CircadianRhythm",
  },
  {
    id: "AD02",
    hook: "3PM. The exact moment your soul leaves your body every single day.",
    body: `It's not the lunch. It's not because you didn't sleep enough. It's not laziness.

Your body has a built-in energy crash every afternoon. The exact time depends on your biology.

Some people crash at 1PM. Some at 3PM. Some barely crash at all.

The difference? Their circadian rhythm.

ARC maps your personal energy pattern so you can plan around it instead of fighting through it.

Download free → arcapp.sbs`,
    tags: "#AfternoonCrash #3PMSlump #TiredAtWork #ARC #EnergyLevels",
  },
  {
    id: "AD03",
    hook: "Go to bed exhausted. Lie there for 2 hours. Stare at the ceiling. Finally fall asleep at 1AM.",
    body: `Then the alarm goes off at 6:30 and you want to die.

This isn't insomnia. This is a timing mismatch.

Your body has a "sleep window" — roughly 60–90 minutes where it's actually ready to fall asleep. Hit it and you're out in minutes. Miss it and you lie there for hours.

Most people have no idea when their window opens. They just go to bed when the clock says they should.

ARC tracks your personal sleep window and tells you when your body actually wants to sleep.

arcapp.sbs`,
    tags: "#CantSleep #Insomnia #SleepWindow #LyingAwake #ARC #SleepHelp",
  },
  {
    id: "AD04",
    hook: "4th coffee today. Still feel absolutely nothing.",
    body: `At some point coffee stopped working. You kept drinking it anyway.

Here's what's happening: you're drinking coffee when your cortisol is already high. So the caffeine does basically nothing. Then it stacks up and hits you at 10PM when you're trying to sleep.

The fix isn't less coffee. It's better timing.

There are 2–3 windows per day when caffeine actually works with your biology instead of against it. They're different for everyone.

ARC calculates your personal coffee timing based on your rhythm.

Try free → arcapp.sbs`,
    tags: "#CoffeeTiming #CaffeineCrash #TiredButWired #ARC #SleepScience",
  },
  {
    id: "AD05",
    hook: "Sunday night. Already dreading the alarm. Every single week.",
    body: `The Sunday scaries aren't just about work.

They're about knowing you'll spend the next 5 days forcing your body to operate on someone else's schedule.

Wake up at 6 when your body wants 8.
Be "productive" at 9 when your brain doesn't turn on until 11.
Crash at 2 when you should be peaking.
Can't sleep at 10 because your body isn't tired yet.

What if the schedule was the problem — not you?

ARC finds when YOUR body actually wants to wake up, work, and sleep.

arcapp.sbs · Free download`,
    tags: "#SundayScaries #MondayDread #WakeUpTime #ARC #CircadianRhythm #Alarm",
  },
  {
    id: "AD06",
    hook: "Melatonin. Blue light glasses. Meditation. Magnesium. Weighted blanket. Still tired.",
    body: `You've tried everything the internet told you to try.

Nothing worked. Or it worked for a week and stopped.

Here's why: all those "fixes" treat the symptoms. None of them address the actual problem — you're living on the wrong schedule for your biology.

Your body has a built-in clock. When your daily routine doesn't match it, no supplement or gadget fixes the mismatch.

ARC identifies your actual biological rhythm and shows you exactly how your current schedule is misaligned.

Start free → arcapp.sbs`,
    tags: "#TriedEverything #StillTired #SleepHelp #ARC #Melatonin #Insomnia",
  },
  {
    id: "AD07",
    hook: "12:47 AM. Everyone in the house is asleep. I'm reorganizing my entire Spotify.",
    body: `Not tired. Not even close.

Brain is sharp. Ideas are flowing. You feel more alive right now than you did all day.

And tomorrow morning you'll hate yourself for it.

Here's the thing — you're not doing anything wrong. Some people are wired to peak late. It's genetic. It's called being a Wolf chronotype.

The problem is that the world doesn't run on your schedule. So every morning is a fight.

ARC identifies your type and helps you build a life that works with your natural clock instead of against it.

arcapp.sbs · Free download`,
    tags: "#NightOwl #CantSleep #WideAwake #Wolf #ARC #Chronotype #LateNight",
  },
  {
    id: "AD08",
    hook: "Woke up 43 minutes before my alarm. Still feel like I got hit by a truck.",
    body: `More sleep doesn't help. Less sleep doesn't help. Different mattress didn't help. Earlier bedtime didn't help.

What if the problem was never the amount of sleep?

Your body cycles through 90-minute sleep stages. If your alarm hits in the middle of deep sleep — even after 8 hours — you wake up feeling destroyed.

The timing of when you fall asleep determines which stage you're in when you wake up.

ARC calculates your ideal sleep and wake times based on your personal rhythm. Not generic advice. YOUR biology.

arcapp.sbs`,
    tags: "#WokeUpTired #MorningPerson #SleepCycles #ARC #AlwaysTired #SleepQuality",
  },
  {
    id: "AD09",
    hook: "11PM: 'just one more video.' 1:58AM: 'why am I still awake.' 6:30AM: dead.",
    body: `Every night. Same spiral.

You tell yourself 11PM. But at 11 you're not tired. So you scroll. One video becomes ten. One article becomes a rabbit hole.

By 2AM you finally feel sleepy. By 6:30AM the alarm destroys you.

Everyone calls this a phone addiction or a discipline problem. It's not.

Your body literally wasn't ready to sleep at 11. You weren't scrolling because you're weak — you were scrolling because your biology hadn't sent the sleep signal yet.

What if you knew the exact time your body is actually ready? So you could stop forcing a bedtime that doesn't work?

ARC tracks your personal sleep window and tells you when to wind down — for real.

arcapp.sbs`,
    tags: "#LateNightScrolling #CantSleep #ScreenTime #Bedtime #ARC #SleepWindow",
  },
  {
    id: "AD10",
    hook: "Why am I sharpest at 11PM when the day is already over?",
    body: `Sluggish all morning. Useless after lunch. Brain fog until 4PM.

Then suddenly at 10PM... clarity. Ideas. Energy. Focus.

The world's most productive hours — wasted because everyone else is asleep and the workday ended 5 hours ago.

This is what it feels like to be a late chronotype living in an early-bird world.

You're not lazy. You're not unmotivated. Your peak just hits at a different time.

ARC identifies your peak time and helps you restructure around it — so your best hours aren't wasted.

arcapp.sbs · Free download`,
    tags: "#NightOwl #PeakTime #LateChronotype #ARC #Productivity #CircadianRhythm",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function AdsPage() {
  useFonts();
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-10 pt-16 pb-10 border-b border-white/5">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-black tracking-widest text-[#CCFF00] uppercase block mb-3">
              ARC — Creative Studio
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Ad Creatives
            </h1>
            <p className="text-zinc-500 text-sm mt-2">
              10 social ads · Mirror their pain · Download 2x PNG
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] font-bold tracking-widest text-zinc-700 uppercase">
              Strategy
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Their moment → Their feeling → A way out
            </div>
          </div>
        </div>
      </div>

      {/* Ad carousel */}
      <div className="overflow-x-auto scrollbar-none py-12 px-10">
        <div className="flex gap-12 w-max snap-x snap-mandatory">
          <AdFrame id="01" label="Exhaustion · 1:1" w={1080} h={1080}>
            <Ad01 />
          </AdFrame>
          <AdFrame id="02" label="Crash · 1:1" w={1080} h={1080}>
            <Ad02 />
          </AdFrame>
          <AdFrame id="03" label="Can't Sleep · 4:5" w={1080} h={1350}>
            <Ad03 />
          </AdFrame>
          <AdFrame id="04" label="Caffeine · 1:1" w={1080} h={1080}>
            <Ad04 />
          </AdFrame>
          <AdFrame id="05" label="Alarm Dread · 4:5" w={1080} h={1350}>
            <Ad05 />
          </AdFrame>
          <AdFrame id="06" label="Tried Everything · 1:1" w={1080} h={1080}>
            <Ad06 />
          </AdFrame>
          <AdFrame id="07" label="Night Owl · 1:1" w={1080} h={1080}>
            <Ad07 />
          </AdFrame>
          <AdFrame id="08" label="Broken Rest · 4:5" w={1080} h={1350}>
            <Ad08 />
          </AdFrame>
          <AdFrame id="09" label="Scroll Spiral · 1:1" w={1080} h={1080}>
            <Ad09 />
          </AdFrame>
          <AdFrame id="10" label="Wrong Peak · 4:5" w={1080} h={1350}>
            <Ad10 />
          </AdFrame>
        </div>
      </div>

      {/* Caption bank */}
      <div className="px-10 pb-24">
        <div className="border-t border-white/5 pt-12 mb-8">
          <h2 className="text-xl font-black tracking-tight text-white">
            Caption Bank
          </h2>
          <p className="text-zinc-600 text-sm mt-1">
            Copy-ready for Instagram, TikTok, Twitter/X, LinkedIn
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {captions.map((c) => (
            <div
              key={c.id}
              className="bg-[#080808] border border-white/5 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-black tracking-widest text-[#CCFF00] bg-[#CCFF00]/10 px-3 py-1 rounded-full">
                  {c.id}
                </span>
              </div>
              <p className="text-white font-bold text-sm mb-3 leading-relaxed">
                {c.hook}
              </p>
              <pre className="text-zinc-500 text-xs leading-relaxed whitespace-pre-wrap font-sans mb-4">
                {c.body}
              </pre>
              <p className="text-zinc-700 text-xs">{c.tags}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

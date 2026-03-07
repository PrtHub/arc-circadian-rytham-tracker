import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function PhoneFrame({ src, alt, priority = false }: PhoneFrameProps) {
  return (
    <div className="relative">
      {/* ── Left side buttons (Action + Vol Up + Vol Down) ── */}
      <div
        aria-hidden="true"
        className="absolute -left-1 top-[20%] w-[3.5px] h-5.5 rounded-l-sm"
        style={{ background: "#3a3a3a" }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-1 top-[28%] w-[3.5px] h-10 rounded-l-md"
        style={{ background: "#3a3a3a" }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-1 top-[38%] w-[3.5px] h-10 rounded-l-md"
        style={{ background: "#3a3a3a" }}
      />

      {/* ── Right side button (Power / Sleep-Wake) ── */}
      <div
        aria-hidden="true"
        className="absolute -right-1 top-[32%] w-[3.5px] h-14 rounded-r-sm"
        style={{ background: "#3a3a3a" }}
      />

      {/* ── Phone body — titanium frame ── */}
      <div
        className="rounded-[2.8rem] p-0.75"
        style={{
          background:
            "linear-gradient(135deg, #3d3d3d 0%, #1c1c1c 50%, #2e2e2e 100%)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* ── Inner screen ── */}
        <div className="rounded-[2.55rem] overflow-hidden bg-black">
          {/* Status bar — Dynamic Island lives here, above the screenshot */}
          <div
            className="relative flex items-center justify-center bg-black"
            style={{ height: "44px" }}
          >
            <div
              aria-hidden="true"
              className="rounded-full bg-black"
              style={{
                width: "110px",
                height: "26px",
                boxShadow: "0 0 0 2px #1a1a1a",
              }}
            />
          </div>

          {/* Screenshot sits below — no overlap with Dynamic Island */}
          <Image
            src={src}
            alt={alt}
            width={1242}
            height={2688}
            className="w-full h-auto block"
            loading={priority ? undefined : "lazy"}
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

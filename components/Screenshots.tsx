import { screenshots } from "@/components/arc-data";
import { PhoneFrame } from "@/components/PhoneFrame";

export function Screenshots() {
  return (
    <section
      aria-labelledby="screenshots-heading"
      className="py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
          Inside the App
        </p>
        <h2
          id="screenshots-heading"
          className="text-4xl sm:text-5xl font-black tracking-tighter"
        >
          Your day, <span className="text-[#CCFF00]">mapped.</span>
        </h2>
      </div>

      {/* Outer scroll wrapper */}
      <div
        className="overflow-x-auto pb-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Inner row: w-max + mx-auto = centered when space allows, scrollable when not */}
        <div
          className="flex items-start gap-8 px-10 w-max mx-auto"
          role="list"
          aria-label="App screenshots"
        >
          {screenshots.map((s, i) => (
            <div
              key={s.src}
              role="listitem"
              className="snap-start shrink-0 w-50 sm:w-72 transition-transform hover:scale-[1.02] py-4"
              style={{ marginTop: i % 2 === 1 ? "32px" : "0px" }}
            >
              <PhoneFrame src={s.src} alt={s.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

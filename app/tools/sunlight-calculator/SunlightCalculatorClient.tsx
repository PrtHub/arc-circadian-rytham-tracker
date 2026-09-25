"use client";

import { useState, useSyncExternalStore } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { formatClock, toMinutes } from "@/lib/time";
import { EducationalNote } from "../_components/tool-extras";
import { localMinutes, sunriseUtc } from "./sunrise";

const CITIES = [
  { name: "New York", country: "US", lat: 40.7128, lon: -74.006, tz: "America/New_York" },
  { name: "Los Angeles", country: "US", lat: 34.0522, lon: -118.2437, tz: "America/Los_Angeles" },
  { name: "Chicago", country: "US", lat: 41.8781, lon: -87.6298, tz: "America/Chicago" },
  { name: "Houston", country: "US", lat: 29.7604, lon: -95.3698, tz: "America/Chicago" },
  { name: "Denver", country: "US", lat: 39.7392, lon: -104.9903, tz: "America/Denver" },
  { name: "Phoenix", country: "US", lat: 33.4484, lon: -112.074, tz: "America/Phoenix" },
  { name: "Seattle", country: "US", lat: 47.6062, lon: -122.3321, tz: "America/Los_Angeles" },
  { name: "San Francisco", country: "US", lat: 37.7749, lon: -122.4194, tz: "America/Los_Angeles" },
  { name: "Miami", country: "US", lat: 25.7617, lon: -80.1918, tz: "America/New_York" },
  { name: "Honolulu", country: "US", lat: 21.3069, lon: -157.8583, tz: "Pacific/Honolulu" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, tz: "America/Toronto" },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lon: -123.1207, tz: "America/Vancouver" },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, tz: "America/Mexico_City" },
  { name: "Bogotá", country: "Colombia", lat: 4.711, lon: -74.0721, tz: "America/Bogota" },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, tz: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, tz: "America/Argentina/Buenos_Aires" },
  { name: "London", country: "UK", lat: 51.5074, lon: -0.1278, tz: "Europe/London" },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lon: -6.2603, tz: "Europe/Dublin" },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, tz: "Europe/Paris" },
  { name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405, tz: "Europe/Berlin" },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041, tz: "Europe/Amsterdam" },
  { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, tz: "Europe/Madrid" },
  { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, tz: "Europe/Rome" },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686, tz: "Europe/Stockholm" },
  { name: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0122, tz: "Europe/Warsaw" },
  { name: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275, tz: "Europe/Athens" },
  { name: "Istanbul", country: "Türkiye", lat: 41.0082, lon: 28.9784, tz: "Europe/Istanbul" },
  { name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173, tz: "Europe/Moscow" },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357, tz: "Africa/Cairo" },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, tz: "Africa/Lagos" },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219, tz: "Africa/Nairobi" },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473, tz: "Africa/Johannesburg" },
  { name: "Tel Aviv", country: "Israel", lat: 32.0853, lon: 34.7818, tz: "Asia/Jerusalem" },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753, tz: "Asia/Riyadh" },
  { name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708, tz: "Asia/Dubai" },
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011, tz: "Asia/Karachi" },
  { name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777, tz: "Asia/Kolkata" },
  { name: "Delhi", country: "India", lat: 28.6139, lon: 77.209, tz: "Asia/Kolkata" },
  { name: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946, tz: "Asia/Kolkata" },
  { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639, tz: "Asia/Kolkata" },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125, tz: "Asia/Dhaka" },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018, tz: "Asia/Bangkok" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, tz: "Asia/Singapore" },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456, tz: "Asia/Jakarta" },
  { name: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842, tz: "Asia/Manila" },
  { name: "Hong Kong", country: "China", lat: 22.3193, lon: 114.1694, tz: "Asia/Hong_Kong" },
  { name: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737, tz: "Asia/Shanghai" },
  { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.978, tz: "Asia/Seoul" },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, tz: "Asia/Tokyo" },
  { name: "Perth", country: "Australia", lat: -31.9505, lon: 115.8605, tz: "Australia/Perth" },
  { name: "Brisbane", country: "Australia", lat: -27.4698, lon: 153.0251, tz: "Australia/Brisbane" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, tz: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631, tz: "Australia/Melbourne" },
  { name: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633, tz: "Pacific/Auckland" },
];

const TZ_ALIASES: Record<string, string> = { "Asia/Calcutta": "Asia/Kolkata", "America/Buenos_Aires": "America/Argentina/Buenos_Aires" };

// Anchored on ARC's 20-minute morning light timer; dimmer skies need longer.
const DURATIONS: Record<string, { label: string; mins: number }> = {
  sunny: { label: "20", mins: 20 },
  cloudy: { label: "20–30", mins: 30 },
  overcast: { label: "30+", mins: 30 },
};

const GOAL_NOTES: Record<string, string> = {
  alertness: "Within an hour of waking is ideal.",
  earlier:
    "Go out at about the same time every day, as soon as you can after waking. Consistency matters more than extra minutes.",
};

// Browser date and time zone exist only on the client; the page itself is prebuilt.
const subscribe = () => () => {};
const getClientInfo = () => {
  const now = new Date();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return `${iso}|${tz}`;
};
const getServerInfo = () => null;

export default function SunlightCalculatorClient() {
  const clientInfo = useSyncExternalStore(subscribe, getClientInfo, getServerInfo);
  const [todayIso, browserTz] = clientInfo ? clientInfo.split("|") : [null, null];
  const detectedCity = browserTz ? CITIES.find((c) => c.tz === (TZ_ALIASES[browserTz] ?? browserTz))?.name : undefined;

  const [chosenCity, setChosenCity] = useState<string | null>(null);
  const [chosenDate, setChosenDate] = useState<string | null>(null);
  const [wakeTime, setWakeTime] = useState("07:00");
  const [weather, setWeather] = useState("sunny");
  const [goal, setGoal] = useState("alertness");

  const cityName = chosenCity ?? detectedCity ?? "New York";
  const city = CITIES.find((c) => c.name === cityName) ?? CITIES[0];
  const dateIso = chosenDate ?? todayIso ?? "";

  let result: { sunrise: number | null; polar: "polar-night" | "midnight-sun" | null } | null = null;
  if (dateIso) {
    const [y, m, d] = dateIso.split("-").map(Number);
    const sun = sunriseUtc(y, m, d, city.lat, city.lon);
    result =
      sun.kind === "time"
        ? { sunrise: localMinutes(y, m, d, sun.utcMinutes, city.tz), polar: null }
        : { sunrise: null, polar: sun.kind };
  }

  const wake = wakeTime ? toMinutes(wakeTime) : null;
  const duration = DURATIONS[weather];
  const windowStart = result?.sunrise != null && wake !== null ? Math.max(wake, result.sunrise) : null;
  const upBeforeSunrise = result?.sunrise != null && wake !== null && wake < result.sunrise;

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Morning <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Sunlight</span> Calculator
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Morning daylight is the strongest signal for setting your body clock. Pick your city and when you wake up to see
          today&apos;s sunrise, when to step outside, and for how long.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-8 mb-8 grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="sun-city" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            City
          </label>
          <select
            id="sun-city"
            value={cityName}
            onChange={(e) => setChosenCity(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-white scheme-dark focus:outline-none focus:border-accent"
          >
            {CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}, {c.country}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-(--fg-muted) mt-1">Pick the nearest city. No location permission needed.</p>
        </div>
        <div>
          <label htmlFor="sun-date" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            Date
          </label>
          <input
            id="sun-date"
            type="date"
            value={dateIso}
            onChange={(e) => setChosenDate(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-white font-mono scheme-dark focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="sun-wake" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            I wake up at
          </label>
          <input
            id="sun-wake"
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-lg text-white font-mono scheme-dark focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="sun-weather" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            Weather
          </label>
          <select
            id="sun-weather"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-white scheme-dark focus:outline-none focus:border-accent"
          >
            <option value="sunny">Bright &amp; sunny</option>
            <option value="cloudy">Partly cloudy</option>
            <option value="overcast">Heavy overcast</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="sun-goal" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            Your main goal
          </label>
          <select
            id="sun-goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-white scheme-dark focus:outline-none focus:border-accent"
          >
            <option value="alertness">Feel more awake in the morning</option>
            <option value="earlier">Shift my sleep earlier</option>
          </select>
        </div>
      </div>

      <div className="raised-card border-(--accent)/40 p-6 sm:p-8 mb-12" aria-live="polite">
        {!result ? (
          <p className="text-(--fg-muted)">Working out sunrise for your city…</p>
        ) : result.polar ? (
          <p className="text-(--fg)">
            {result.polar === "polar-night"
              ? `The sun doesn't rise in ${city.name} on this date. Use bright indoor light in the morning, and get outside around midday when the sky is at its brightest.`
              : `The sun doesn't set in ${city.name} on this date. Get outside soon after waking, and keep your bedroom dark at night.`}
          </p>
        ) : (
          <>
            <p className="eyebrow text-(--fg-muted) mb-2">
              Sunrise in {city.name}
            </p>
            <p className="text-2xl text-white font-mono mb-6">{formatClock(result.sunrise!)}</p>

            <p className="eyebrow text-(--fg-muted) mb-2">Step outside at</p>
            <p className="font-display text-6xl sm:text-7xl text-accent leading-none tracking-[-0.03em]">
              {windowStart !== null ? formatClock(windowStart) : "—"}
            </p>
            <p className="text-sm text-(--fg-muted) mt-3">
              For about <strong className="text-white">{duration.label} minutes</strong>
              {windowStart !== null && `, until roughly ${formatClock(windowStart + duration.mins)}`}. {GOAL_NOTES[goal]}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-(--fg) leading-relaxed">
              {upBeforeSunrise && (
                <li className="sunken-card p-4">
                  You&apos;re up before sunrise. Turn on bright indoor lights when you wake, then step outside once the sun is
                  up at {formatClock(result.sunrise!)}.
                </li>
              )}
              <li className="sunken-card p-4">
                ARC&apos;s timer is 20 minutes; on dim days, stay out longer. A window cuts much of the useful light, so step
                outside rather than sitting by the glass. Never look directly at the sun.
              </li>
              <li className="sunken-card p-4">
                On dark winter mornings, a 10,000 lux light box is an option. Check with a doctor first if you have an eye
                condition or bipolar disorder.
              </li>
            </ul>
          </>
        )}
        <EducationalNote />
      </div>

      <section className="raised-card border-(--accent)/30 p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 text-white">Automate your morning light</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto leading-relaxed">
          ARC&apos;s 20-minute light timer starts from your real sunrise, worked out from your time zone (no location
          permission), and runs as a Live Activity on your Lock Screen and in the Dynamic Island. When it&apos;s still dark, it
          offers an indoor fallback.
        </p>
        <div className="flex justify-center">
          <AppStoreButton size="lg" location="tool_sunlight_calculator" />
        </div>
      </section>
    </main>
  );
}

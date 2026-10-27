#!/usr/bin/env node
/**
 * Builds the arcapp.sbs home page from the app itself.
 *
 *   node web/build.js            → web/dist/index.html, icons, og.png
 *   node web/build.js --check    → also full-page screenshots, for a look
 *
 * ## Why a build, not a hand-written page
 *
 * The site that was live said "Afternoon dip" after the app said "Energy dip",
 * "$39.99" after the price moved, and "50% of people are Bears" beside an app
 * that says 55. Every one of those is a second copy of something the app already
 * states, edited in one place and not the other.
 *
 * So nothing the app states is written here:
 *
 * - **Phones** are the App Store generator's own screen functions, run against
 *   the locale files — the same markup as the store screenshots.
 * - **App copy** (phase labels, the cutoff label, chronotype names and blurbs,
 *   the caffeine questions, drink names) is read through `S()`, and a missing
 *   key fails the build.
 * - **The calculator** is `lib/cutoff.ts` and `lib/caffeine.ts`, compiled, so it
 *   gives the answer the app gives.
 * - **Prices** are the paywall's own fallbacks, which `check-logic` already keeps
 *   in step with each other.
 * - **Chronotype facts and palettes** come from `visuals.tsx` and `tokens.js`.
 *
 * Only the marketing copy lives in `web/src/page.html`.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const GEN = path.join(ROOT, "appstore", "generator");
const OUT = path.join(__dirname, "dist");
const LANG = "en";
const CHECK = process.argv.includes("--check");

const SITE = "https://arcapp.sbs";
const APP_STORE_URL =
  "https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892";
const APP_STORE_ID = "6758214892";

/** The annual trial. App Store Connect owns it; the paywall advertises it as text. */
const TRIAL_DAYS = 7;

const fail = (msg) => {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
};
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ── strings, merged exactly as the store generator merges them ─────────── */

function buildStrings(lang) {
  const read = (f) =>
    JSON.parse(fs.readFileSync(path.join(ROOT, "locales", lang, f), "utf8"));
  return { ...read("common.json"), ...read("app.json"), onboarding: read("onboarding.json") };
}
const STRINGS = buildStrings(LANG);

/* ── the real screens ────────────────────────────────────────────────────── */

/*
 * Everything in frames.js above the captions is pure: palettes, the persona's
 * day, and functions that return markup. It reads three custom properties off
 * the document to learn the device, so those are answered here for an iPhone.
 */
const framesSrc = fs.readFileSync(path.join(GEN, "frames.js"), "utf8");
const pureEnd = framesSrc.indexOf("const CAPTIONS");
if (pureEnd < 0) fail("frames.js: cannot find `const CAPTIONS` to cut at");

const DEVICE = { "--ar": "1320/2868", "--pt": "393", "--corner-pt": "55" };
const ctx = vm.createContext({
  window: { STRINGS, LANG },
  document: { documentElement: {} },
  getComputedStyle: () => ({ getPropertyValue: (n) => DEVICE[n] ?? "" }),
});
const G = vm.runInContext(
  framesSrc.slice(0, pureEnd) +
    "\n;({ FRAMES, PHASE, SKY, DAY, MISSES, S, clockText, statusTime, identityScreen })",
  ctx,
);

const frameById = Object.fromEntries(G.FRAMES.map((f) => [f.file, f]));

/*
 * The clock in each screen's status bar, so the time printed beside a phone is
 * the time on it. Asserted against the rendered markup below.
 */
const MOMENTS = [
  { id: "01-why-youre-tired", at: G.DAY.rise.nowMin },
  { id: "02-last-safe-coffee", at: G.DAY.peak.nowMin },
  { id: "03-learns-your-dip", at: G.DAY.dipAtMin - 25 },
  { id: "04-see-it-working", at: 18 * 60 + 5 },
  { id: "05-home-screen", at: G.DAY.wind.nowMin },
];

/* What the page adds under each caption. Marketing copy — the facts are the app's. */
const BODY = {
  "01-why-youre-tired":
    "Every part of your day gets one sentence about what your body is doing, and one thing worth doing about it. Here that’s daylight: twenty minutes in the morning sets when your energy rises and falls for the rest of the day.",
  "02-last-safe-coffee":
    "ARC works out the latest coffee you can have so that less than 50 mg is still in you at bedtime. Log a cup and the time moves.",
  "03-learns-your-dip":
    "Tap once when you crash. After about ten days ARC plans around the time it measured: a walk half an hour before, and daylight instead of another coffee.",
  "04-see-it-working":
    "Trends counts your crashes week by week and runs five-day experiments, like a walk before your dip. When something makes no difference, it says so.",
  "05-home-screen":
    "Widgets follow your phase on the home screen, so the next thing to do and the end of your coffee window are there without opening the app.",
};

/* A link under a moment, where the page has more on it. */
const MORE = {
  "02-last-safe-coffee": { href: "#cutoff", text: "Try it with your bedtime" },
};

for (const m of MOMENTS) {
  const f = frameById[m.id];
  if (!f) fail(`frames.js has no frame "${m.id}"`);
  m.frame = f;
  m.phase = f.phase;
  m.label = G.S("today.phaseLabel." + f.phase);
  m.time = G.clockText(m.at);
  m.screen = f.screen();
  m.pop = f.pops[0] ? f.pops[0].html() : "";
  const shown = (m.screen.match(/class="status">\s*<span>([^<]+)<\/span>/) || [])[1];
  if (shown !== G.statusTime(m.at)) {
    fail(`${m.id}: the page says ${G.statusTime(m.at)} but the phone's status bar says ${shown}`);
  }
}
const IDENTITY = G.identityScreen();
if (G.MISSES.length) fail("missing strings: " + [...new Set(G.MISSES)].join(", "));

/* ── facts the app states ────────────────────────────────────────────────── */

const tokens = require(path.join(ROOT, "constants", "tokens.js"));

function constantFrom(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const m = src.match(new RegExp(`export const ${name}[^=]*=\\s*(\\{[\\s\\S]*?\\});`));
  if (!m) fail(`${file}: cannot read ${name}`);
  // Object literals of numbers and number pairs; evaluated, not parsed by hand.
  return vm.runInNewContext("(" + m[1] + ")");
}
const CHRONO_PEAK = constantFrom("components/onboarding/visuals.tsx", "CHRONO_PEAK");
const CHRONO_SHARE = constantFrom("components/onboarding/visuals.tsx", "CHRONO_SHARE");

/*
 * How onboarding assigns the type — `Calculating` in steps.tsx. Read rather than
 * restated, so a moved boundary changes the sentence on the card.
 */
const steps = fs.readFileSync(path.join(ROOT, "components/onboarding/steps.tsx"), "utf8");
const byWake = [...steps.matchAll(/\{\s*max:\s*([\d\s*+]+),\s*type:\s*"(\w+)"\s*\}/g)].map(
  (m) => ({ max: vm.runInNewContext(m[1]), type: m[2] }),
);
if (byWake.length !== 3 || !/sleepQuality === "poor"\s*\?\s*"dolphin"/.test(steps)) {
  fail("steps.tsx: the chronotype rule changed shape; update the card sentences here");
}

/* The paywall's fallback prices — the numbers check-logic keeps in step. */
const paywall = fs.readFileSync(path.join(ROOT, "components/onboarding/Paywall.tsx"), "utf8");
const price = (plan) => {
  const m = paywall.match(new RegExp(plan + ':\\s*"\\$([0-9]+\\.[0-9]{2})"'));
  if (!m) fail(`Paywall.tsx: no fallback price for ${plan}`);
  return Number(m[1]);
};
const PRICES = { weekly: price("weekly"), annual: price("annual") };
const money = (n) => "$" + n.toFixed(2);
/* The paywall's own arithmetic, so "Save X%" here is the badge there. */
const savePct = Math.round(
  ((PRICES.weekly * 52 - PRICES.annual) / (PRICES.weekly * 52)) * 100,
);

/* ── the cutoff engine, compiled from the app ────────────────────────────── */

function compileEngine() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "arc-web-"));
  try {
    execFileSync(
      process.execPath,
      [
        path.join(ROOT, "node_modules", "typescript", "lib", "tsc.js"),
        "lib/caffeine.ts",
        "lib/cutoff.ts",
        "--outDir", tmp,
        "--module", "commonjs",
        "--target", "es2019",
        "--skipLibCheck",
        "--moduleResolution", "node",
        // See check-logic.js: TS 6 refuses listed files beside a tsconfig.
        "--ignoreConfig",
      ],
      { cwd: ROOT, stdio: "pipe" },
    );
  } catch {
    // The `@/` alias is unresolved without the project config, so tsc reports
    // TS2307 and still emits. A missing file below is the real failure.
  }
  const mod = (name) => {
    const p = path.join(tmp, name + ".js");
    if (!fs.existsSync(p)) fail(`tsc did not emit ${name}.js`);
    return fs.readFileSync(p, "utf8").replace(/"@\/lib\/([\w-]+)"/g, '"./$1"');
  };
  const code = `(function () {
  var defs = {
    "./caffeine": function (exports, require) {\n${mod("caffeine")}\n},
    "./cutoff": function (exports, require) {\n${mod("cutoff")}\n}
  }, cache = {};
  function req(n) { if (!cache[n]) { var e = {}; cache[n] = e; defs[n](e, req); } return cache[n]; }
  return { cutoff: req("./cutoff"), caffeine: req("./caffeine") };
})()`;
  fs.rmSync(tmp, { recursive: true, force: true });
  return code;
}
const ENGINE = compileEngine();

/* The engine has to run, and give the answer check-logic pins for the app. */
const engine = vm.runInNewContext(ENGINE);
const probe = engine.cutoff.computeCutoff({
  bedtime: "23:00", sensitivity: "normal", entries: [], nextDoseMg: 95,
  now: new Date(2026, 9, 27, 12, 0),
});
if (probe.exhausted || probe.minutes < 12 * 60 || probe.minutes > 20 * 60) {
  fail("the compiled cutoff engine gave an implausible answer: " + JSON.stringify(probe));
}

/* ── the phone CSS, from the generator's stylesheet ─────────────────────── */

const genHtml = fs.readFileSync(path.join(GEN, "index.html"), "utf8");
const style = genHtml.slice(genHtml.indexOf("<style>") + 7, genHtml.indexOf("</style>"));
function cssBetween(from, to) {
  const a = style.indexOf(from);
  const b = to ? style.indexOf(to, a + from.length) : style.length;
  if (a < 0 || b < 0) fail(`generator CSS: cannot find "${from}"`);
  return style.slice(a, b);
}

/* ── assets ──────────────────────────────────────────────────────────────── */

async function dataUri(file, size, format = "webp") {
  let img = sharp(file).resize(size, size, { fit: "inside", withoutEnlargement: true });
  img = format === "png" ? img.png({ compressionLevel: 9 }) : img.webp({ quality: 84 });
  const buf = await img.toBuffer();
  return `data:image/${format};base64,${buf.toString("base64")}`;
}

async function main() {
  const emoji = {};
  for (const name of [
    "sun", "hot_beverage", "alarm_clock", "chart_decreasing", "candle",
    "lion", "bear", "wolf", "dolphin", "crescent_moon",
  ]) {
    emoji[name] = await dataUri(path.join(GEN, "assets", name + ".png"), 256);
  }
  const ICON = await dataUri(path.join(ROOT, "assets/images/icon-dark.png"), 128);
  const GRAIN = await dataUri(path.join(ROOT, "assets/grain.png"), 128, "png");

  const withAssets = (html) =>
    html.replace(/src="assets\/(\w+)\.png"/g, (m, n) => {
      if (!emoji[n]) fail(`a screen uses assets/${n}.png, which the build does not embed`);
      return `src="${emoji[n]}"`;
    });

  const PHONE_CSS = (cssBetween("/* ── device ──", "/* ═══════") + cssBetween(".pop{position:absolute", null))
    .replace(/url\("\.\.\/\.\.\/assets\/grain\.png"\)/g, `url("${GRAIN}")`);

  /* ── markup ── */

  const phone = (screen) => `<div class="phone">${withAssets(screen)}</div>`;

  /*
   * A frame's pop-out and 3D object, moved from frame coordinates to the phone's.
   * In a frame the phone is 76cqw wide and its left edge sits at 12 + dx; the
   * same offsets as a share of the phone keep each piece where the store shows it.
   */
  const rel = (f, x) => ((x - (12 + f.phone.dx)) / 76) * 100;
  const pct = (n) => n.toFixed(1) + "%";

  function device(m, { decor = true } = {}) {
    const f = m.frame;
    const p = f.pops[0];
    const o = f.objs[0];
    const pop = decor && p
      ? `<div class="pop" style="left:${pct(rel(f, p.x))};top:${pct(p.y * 100)};width:${pct(Math.min(108, (p.w / 76) * 100))};--rot:${p.rot}deg">${withAssets(m.pop)}</div>`
      : "";
    const obj = decor && o
      ? `<img class="obj" alt="" src="${emoji[o.src]}" style="left:${pct(rel(f, o.x))};top:${pct(o.y * 100)};width:${pct((o.w / 76) * 100)};--rot:${o.rot}deg">`
      : "";
    return `<div class="device" style="--tilt:${f.phone.rot}deg">${phone(m.screen)}${pop}${obj}</div>`;
  }

  const capHtml = (cap, accent) =>
    cap.replace(/<br>/g, " ").replace(/<em>/g, `<em style="color:${accent}">`);

  const scene = (m, i, inner) => {
    const sky = G.SKY[i], next = G.SKY[i + 1] || G.SKY[i];
    const P = G.PHASE[m.phase];
    const more = MORE[m.id]
      ? `<a class="more" href="${MORE[m.id].href}">${MORE[m.id].text} <span aria-hidden="true">↓</span></a>`
      : "";
    return `
    <article class="scene${i % 2 ? " flip" : ""}" data-moment="${m.phase}"
      style="--zen:${sky.zen};--hor:${sky.hor};--next:${next.zen};--acc:${P.accent}">
      <div class="wrap scene-grid">
        <div class="scene-copy">
          <p class="when"><time>${esc(m.time)}</time><span>${esc(m.label)}</span></p>
          <h3>${capHtml(m.frame.cap, P.accent)}</h3>
          <p class="scene-sub">${esc(m.frame.sub)}</p>
          <p class="scene-body">${esc(BODY[m.id])}</p>
          ${more}
        </div>
        <figure class="stage" role="img" aria-label="${esc(`ARC at ${m.time}: ${m.label}`)}">
          ${inner}
        </figure>
      </div>
    </article>`;
  };
  const DAY_HTML = MOMENTS.map((m, i) => scene(m, i, device(m))).join("");
  /* The same scenes with the phones left out — the page's own markup, for the class check. */
  const DAY_OUTER = MOMENTS.map((m, i) => scene(m, i, "")).join("");

  /* The hero opens on the peak screen; the page script swaps in the visitor's hour. */
  const HERO_PHONE = `<div class="device" style="--tilt:-3deg">${phone(MOMENTS[1].screen)}</div>`;
  const CHRONO_PHONE = `<div class="device" data-moment="night" style="--tilt:3deg">${phone(IDENTITY)}</div>`;

  const hour = (h) => {
    const hh = ((h % 24) + 24) % 24;
    return `${hh % 12 || 12} ${hh < 12 ? "AM" : "PM"}`;
  };
  const clockOf = (min) => G.clockText(min);
  const RULE = {
    lion: `Usually up by ${clockOf(byWake[0].max)}`,
    bear: `Usually up between ${clockOf(byWake[0].max)} and ${clockOf(byWake[1].max)}`,
    wolf: `Usually up after ${clockOf(byWake[1].max)}`,
    dolphin: "Sleeps lightly, whatever time they wake",
  };
  const CHRONO_HTML = ["lion", "bear", "wolf", "dolphin"].map((t) => {
    const P = tokens.chronotype[t];
    const [from, to] = CHRONO_PEAK[t];
    const name = G.S(`onboarding.identity.types.${t}.name`);
    return `
      <article class="chrono" style="--c-acc:${P.accent};--c-0:${P.stops[0]};--c-2:${P.stops[2]}">
        <img src="${emoji[t]}" alt="" width="64" height="64">
        <h3>${esc(name)}</h3>
        <p class="chrono-rule">${esc(RULE[t])}</p>
        <dl>
          <div><dt>${esc(G.S("onboarding.identity.facts.peak"))}</dt><dd>${hour(from)}–${hour(to)}</dd></div>
          <div><dt>${esc(G.S("onboarding.identity.facts.share"))}</dt><dd>${CHRONO_SHARE[t]}%</dd></div>
        </dl>
        <p class="chrono-blurb">${esc(G.S(`onboarding.identity.types.${t}.blurb`))}</p>
        <a href="${SITE}/chronotype/${t}">The ${esc(name)} schedule <span aria-hidden="true">→</span></a>
      </article>`;
  }).join("");

  const DRINKS = ["espresso", "drip_coffee", "double_espresso", "cold_brew", "matcha", "black_tea", "energy_drink"];

  const PAGE = {
    sky: G.SKY,
    moments: [
      ...MOMENTS.map((m) => ({ phase: m.phase, label: m.label, time: m.time })),
      { phase: "night", label: G.S("today.phaseLabel.night"), time: "" },
    ],
    accents: Object.fromEntries(Object.entries(G.PHASE).map(([k, v]) => [k, v.accent])),
    drinks: DRINKS.map((id) => ({
      id,
      name: G.S(`caffeineSheet.drinks.${id}`),
      mg: engine.caffeine.CAFFEINE_SOURCES[id].mg,
    })),
    halfLife: engine.caffeine.CAFFEINE_HALF_LIFE,
    targetMg: engine.cutoff.TARGET_AT_BED_MG,
  };
  if (G.MISSES.length) fail("missing strings: " + [...new Set(G.MISSES)].join(", "));

  /* The calculator's first answer, so the page is right before any script runs. */
  const DEFAULT_DRINK = PAGE.drinks.find((d) => d.id === "drip_coffee");
  const DRINKS_HTML = PAGE.drinks
    .map((d) => `<option value="${d.id}"${d === DEFAULT_DRINK ? " selected" : ""}>${esc(d.name)} · ${d.mg} mg</option>`)
    .join("");
  const [cutTime, cutSuffix] = G.clockText(probe.minutes).split(" ");

  /* ── fill the template ── */

  // The file's own header describes the placeholder syntax; it is not page.
  const raw = fs.readFileSync(path.join(__dirname, "src", "page.html"), "utf8");
  const template = raw.slice(raw.indexOf("<!--HEAD-->"));

  /*
   * The page's classes and the app screens' classes share one stylesheet.
   *
   * The first build named the day's scenes `.moment`, which the screens use for
   * the full-screen moment sheet — `position:absolute; inset:0` — and all five
   * scenes landed on top of the hero. So: every class the page's own markup uses
   * must be styled by the page, and none of them may be one the screens style.
   * `.phone`, `.screen` and `.pop` are restyled on purpose, scoped under `.device`.
   */
  const classSet = (css) => new Set([...css.matchAll(/\.([a-z][\w-]*)/g)].map((m) => m[1]));
  const pageCss = template.slice(template.indexOf("<style>"), template.indexOf("{{PHONE_CSS}}"));
  const ours = classSet(pageCss);
  const theirs = classSet(PHONE_CSS);
  const RESTYLED = new Set(["phone", "screen", "pop"]);
  const clash = [...ours].filter((c) => theirs.has(c) && !RESTYLED.has(c));
  const markup = template.replace(/<style>[\s\S]*?<\/style>/, "") + DAY_OUTER + CHRONO_HTML;
  const used = new Set(
    [...markup.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)).filter(Boolean),
  );
  const unstyled = [...used].filter((c) => !ours.has(c));
  if (clash.length) fail("page classes also styled by the app screens: " + clash.join(", "));
  if (unstyled.length) fail("page markup uses classes the page never styles: " + unstyled.join(", "));
  const fills = {
    PHONE_CSS,
    ENGINE,
    PAGE_DATA: JSON.stringify(PAGE),
    ICON,
    GRAIN,
    CHRONO_SUB: esc(frameById["06-your-chronotype"].sub),
    CUT_TIME: cutTime,
    CUT_SUFFIX: cutSuffix || "",
    CUT_LINE: esc(
      `A ${DEFAULT_DRINK.name.toLowerCase()} (${DEFAULT_DRINK.mg} mg) then leaves ` +
        `${engine.cutoff.TARGET_AT_BED_MG} mg or less in you at bedtime, ${G.clockText(23 * 60)}.`,
    ),
    SITE,
    APP_STORE_URL,
    APP_STORE_ID,
    TRIAL_DAYS: String(TRIAL_DAYS),
    PRICE_WEEKLY: money(PRICES.weekly),
    PRICE_ANNUAL: money(PRICES.annual),
    PRICE_ANNUAL_WEEK: money(PRICES.annual / 52),
    SAVE_PCT: String(savePct),
    TARGET_MG: String(engine.cutoff.TARGET_AT_BED_MG),
  };
  let page = template
    .replace(/<!--@HERO_PHONE-->/, HERO_PHONE)
    .replace(/<!--@DAY-->/, DAY_HTML)
    .replace(/<!--@CHRONO_PHONE-->/, CHRONO_PHONE)
    .replace(/<!--@CHRONO-->/, CHRONO_HTML)
    .replace(/<!--@DRINKS-->/, DRINKS_HTML)
    .replace(/\{\{S:([\w.]+)\}\}/g, (m, key) => esc(G.S(key)))
    .replace(/\{\{EMOJI:(\w+)\}\}/g, (m, n) => emoji[n] || fail(`no emoji asset "${n}"`))
    .replace(/\{\{(\w+)\}\}/g, (m, k) => (k in fills ? fills[k] : m));

  if (G.MISSES.length) fail("missing strings: " + [...new Set(G.MISSES)].join(", "));
  const left = page.match(/\{\{\w[\w:.]*\}\}|<!--@\w+-->/g);
  if (left) fail("unfilled placeholders: " + [...new Set(left)].join(", "));
  if (/‹[\w.]+›/.test(page)) fail("a screen rendered a missing-string marker");

  /*
   * Two outputs from one page. `index.html` is the document arcapp.sbs serves.
   * `preview.html` is the same page without the document shell or the head
   * meta, for hosts that supply their own shell.
   */
  const pick = (name) => {
    const m = page.match(new RegExp(`<!--${name}-->([\\s\\S]*?)<!--/${name}-->`));
    if (!m) fail(`page.html: no <!--${name}--> section`);
    return m[1].trim();
  };
  const head = pick("HEAD"), top = pick("TOP"), body = pick("BODY"), preview = pick("PREVIEW");

  fs.mkdirSync(OUT, { recursive: true });
  const indexHtml =
    `<!doctype html>\n<html lang="${LANG}">\n<head>\n<meta charset="utf-8">\n` +
    `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n` +
    `${head}\n${top.replace("<!--PREVIEW_META-->", "")}\n</head>\n<body>\n${body}\n</body>\n</html>\n`;
  fs.writeFileSync(path.join(OUT, "index.html"), indexHtml);
  fs.writeFileSync(path.join(OUT, "preview.html"), `${top.replace("<!--PREVIEW_META-->", preview)}\n${body}\n`);

  /* Icons the head refers to. */
  const icon = path.join(ROOT, "assets/images/icon-dark.png");
  await sharp(icon).resize(180, 180).png().toFile(path.join(OUT, "apple-touch-icon.png"));
  await sharp(icon).resize(32, 32).png().toFile(path.join(OUT, "favicon-32.png"));
  await sharp(icon).resize(512, 512).png().toFile(path.join(OUT, "icon-512.png"));

  const kb = (f) => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + " KB";
  console.log(`\n  web/dist/index.html    ${kb("index.html")}`);
  console.log(`  web/dist/preview.html  ${kb("preview.html")}`);
  console.log(`  prices ${money(PRICES.weekly)}/week, ${money(PRICES.annual)}/year (save ${savePct}%), from the paywall`);
  console.log(`  ${MOMENTS.length} moments, all status-bar times match the page\n`);

  await shoot(CHECK);
}

/*
 * The social card, from the page itself, and — with --check — full-page shots
 * at a desktop and a phone width.
 */
async function shoot(full) {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--font-render-hinting=none", "--force-color-profile=srgb"],
  });
  try {
    const page = await browser.newPage();
    const url = "file://" + path.join(OUT, "index.html").replace(/\\/g, "/");

    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto(url + "?at=10:20", { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1900));
    await page.screenshot({ path: path.join(OUT, "og.png"), clip: { x: 0, y: 0, width: 1200, height: 630 } });

    if (full) {
      for (const [name, width, dsf] of [["desktop", 1440, 1], ["phone", 390, 2]]) {
        await page.setViewport({ width, height: 900, deviceScaleFactor: dsf });
        await page.goto(url + "?at=15:20", { waitUntil: "networkidle0" });
        await page.evaluate(() => document.fonts.ready);
        await new Promise((r) => setTimeout(r, 1600));
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        if (overflow > 0) console.log(`  ! ${name}: the page scrolls sideways by ${overflow}px`);
        await page.screenshot({ path: path.join(OUT, `check-${name}.png`), fullPage: true });
        console.log(`  web/dist/check-${name}.png`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => fail(e.stack || String(e)));

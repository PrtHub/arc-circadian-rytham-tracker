// @ts-nocheck
// Auto-generated engine for ARC landing page
/* eslint-disable */

export function initLanding() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  try {

  "use strict";
  var PAGE = {"sky":[{"zen":"#1E1C4A","hor":"#E3876A"},{"zen":"#0D2D62","hor":"#4A90D2"},{"zen":"#321F4C","hor":"#BE6E4E"},{"zen":"#251B54","hor":"#DC9048"},{"zen":"#110F38","hor":"#5A3165"},{"zen":"#04071A","hor":"#18215A"}],"moments":[{"phase":"rise","label":"Early morning","time":"7:40 AM"},{"phase":"peak","label":"Peak","time":"10:20 AM"},{"phase":"dip","label":"Energy dip","time":"3:15 PM"},{"phase":"evening","label":"Evening","time":"6:05 PM"},{"phase":"windDown","label":"Wind-down","time":"9:20 PM"},{"phase":"night","label":"Night","time":""}],"accents":{"rise":"#FFD9A0","peak":"#FFE0A8","dip":"#FFC48A","evening":"#FFD9A0","windDown":"#E3B08C","night":"#9FA6D8"},"drinks":[{"id":"espresso","name":"Espresso","mg":63},{"id":"drip_coffee","name":"Drip Coffee","mg":95},{"id":"double_espresso","name":"Double Espresso","mg":126},{"id":"cold_brew","name":"Cold Brew","mg":200},{"id":"matcha","name":"Matcha","mg":70},{"id":"black_tea","name":"Black Tea","mg":47},{"id":"energy_drink","name":"Energy Drink","mg":80}],"halfLife":{"low":7,"normal":5.5,"high":4},"targetMg":50};
  var ENGINE = (function () {
  var defs = {
    "./caffeine": function (exports, require) {
"use strict";
/**
 * Caffeine Half-Life Calculator
 *
 * The half-life of caffeine is approximately 5-6 hours for most adults.
 * This means if you consume 200mg at 8 AM, by 2 PM you'll have ~100mg remaining.
 *
 * Factors affecting caffeine metabolism:
 * - Genetics (CYP1A2 gene)
 * - Age
 * - Pregnancy
 * - Smoking (increases metabolism)
 * - Oral contraceptives (decreases metabolism)
 * - Liver conditions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAFFEINE_SOURCES = exports.CAFFEINE_HALF_LIFE = void 0;
exports.calculateRemainingCaffeine = calculateRemainingCaffeine;
exports.calculateTotalCaffeine = calculateTotalCaffeine;
exports.hoursUntilCaffeineThreshold = hoursUntilCaffeineThreshold;
exports.calculateCaffeineCurfew = calculateCaffeineCurfew;
exports.estimateSleepImpact = estimateSleepImpact;
// Default half-life in hours (can be adjusted based on user sensitivity)
exports.CAFFEINE_HALF_LIFE = {
    low: 7, // Slow metabolizer
    normal: 5.5, // Average
    high: 4, // Fast metabolizer
};
// Caffeine content in mg for common sources
exports.CAFFEINE_SOURCES = {
    espresso: { mg: 63, name: "Espresso Shot", icon: "☕" },
    double_espresso: { mg: 126, name: "Double Espresso", icon: "☕" },
    drip_coffee: { mg: 95, name: "Drip Coffee", icon: "☕" },
    cold_brew: { mg: 200, name: "Cold Brew", icon: "🧊" },
    matcha: { mg: 70, name: "Matcha", icon: "🌿" },
    green_tea: { mg: 28, name: "Green Tea", icon: "🍵" },
    black_tea: { mg: 47, name: "Black Tea", icon: "🫖" },
    energy_drink: { mg: 80, name: "Energy Drink", icon: "⚡" },
    pre_workout: { mg: 150, name: "Pre-Workout", icon: "💪" },
    soda: { mg: 34, name: "Cola/Soda", icon: "🥤" },
    decaf: { mg: 3, name: "Decaf Coffee", icon: "☕" },
    custom: { mg: 0, name: "Custom", icon: "✏️" },
};
/**
 * Calculate remaining caffeine in bloodstream
 * @param initialMg - Initial caffeine amount in mg
 * @param hoursElapsed - Hours since consumption
 * @param sensitivity - User's caffeine sensitivity level
 * @returns Remaining caffeine in mg
 */
function calculateRemainingCaffeine(initialMg, hoursElapsed, sensitivity = "normal") {
    const halfLife = exports.CAFFEINE_HALF_LIFE[sensitivity];
    const remaining = initialMg * Math.pow(0.5, hoursElapsed / halfLife);
    return Math.round(remaining * 10) / 10; // Round to 1 decimal
}
/**
 * Calculate total caffeine from multiple sources
 * @param entries - Array of caffeine entries with consumedAt timestamp
 * @param currentTime - Current time to calculate against
 * @param sensitivity - User's caffeine sensitivity level
 * @returns Total remaining caffeine in mg
 */
function calculateTotalCaffeine(entries, currentTime = new Date(), sensitivity = "normal") {
    return entries.reduce((total, entry) => {
        const hoursElapsed = (currentTime.getTime() - entry.consumedAt.getTime()) / (1000 * 60 * 60);
        if (hoursElapsed < 0)
            return total; // Future entry, ignore
        return (total + calculateRemainingCaffeine(entry.mg, hoursElapsed, sensitivity));
    }, 0);
}
/**
 * Calculate when caffeine will drop below threshold
 * @param currentMg - Current caffeine level in mg
 * @param targetMg - Target caffeine level (default: 25mg for minimal sleep impact)
 * @param sensitivity - User's caffeine sensitivity level
 * @returns Hours until caffeine drops to target level
 */
function hoursUntilCaffeineThreshold(currentMg, targetMg = 25, sensitivity = "normal") {
    if (currentMg <= targetMg)
        return 0;
    const halfLife = exports.CAFFEINE_HALF_LIFE[sensitivity];
    const hours = halfLife * Math.log2(currentMg / targetMg);
    return Math.round(hours * 10) / 10;
}
/**
 * Calculate caffeine curfew time
 * @param bedTime - Target bedtime
 * @param currentCaffeine - Current caffeine level in mg
 * @param sensitivity - User's caffeine sensitivity level
 * @returns Curfew time (last time to consume caffeine)
 */
function calculateCaffeineCurfew(bedTime, currentCaffeine = 0, sensitivity = "normal") {
    // We want < 25mg by bedtime for quality sleep
    const hoursNeeded = hoursUntilCaffeineThreshold(currentCaffeine + 95, // Assuming one more coffee
    25, sensitivity);
    const curfew = new Date(bedTime);
    curfew.setHours(curfew.getHours() - Math.ceil(hoursNeeded));
    return curfew;
}
/**
 * Get caffeine impact on sleep quality
 * @param caffeineMg - Caffeine level at bedtime
 * @returns Estimated sleep quality reduction percentage
 */
function estimateSleepImpact(caffeineMg) {
    // Based on sleep research approximations
    const deepSleepReduction = Math.min(50, Math.round(caffeineMg * 0.3));
    const sleepLatencyIncrease = Math.min(60, Math.round(caffeineMg * 0.4));
    const qualityScore = Math.max(0, 100 - deepSleepReduction - sleepLatencyIncrease * 0.5);
    return {
        deepSleepReduction, // Percentage reduction in deep sleep
        sleepLatencyIncrease, // Additional minutes to fall asleep
        qualityScore: Math.round(qualityScore),
    };
}

},
    "./cutoff": function (exports, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DOSE_MG = exports.TARGET_AT_BED_MG = void 0;
exports.computeCutoff = computeCutoff;
exports.baselineCutoffMinutes = baselineCutoffMinutes;
exports.typicalDoseMg = typicalDoseMg;
const caffeine_1 = require("./caffeine");
/**
 * The caffeine cutoff — the single most prominent number in the app.
 *
 * It used to be `wake + 8h`. That ignored the user's bedtime (collected in
 * onboarding), their sensitivity (a whole onboarding screen), and what they had
 * actually drunk. Setting sensitivity to "very sensitive" left the number
 * unmoved, which quietly made the app's central claim — *your* cutoff — a
 * constant with a personalised label on it.
 *
 * The other candidate, `calculateCaffeineCurfew`, was wrong in the opposite
 * direction: it assumed a phantom extra coffee *and* demanded <25mg at bed,
 * which put a slow metaboliser's curfew at 09:31. Not advice, an insult.
 *
 * So the model here is stated explicitly:
 *
 * 1. Caffeine decays exponentially with a half-life set by sensitivity.
 * 2. Sleep is protected by capping *total* circulating caffeine at bedtime,
 *    not by banning caffeine after an hour. The cap is a budget.
 * 3. What they have already drunk spends part of that budget, because it is
 *    still decaying at bedtime. So the cutoff moves earlier as they log — the
 *    number is live, which is the entire promise made visible.
 * 4. The cutoff answers "when is the latest I can have my *next* drink", so it
 *    depends on the size of that drink. A 28mg green tea buys later than a
 *    200mg cold brew.
 *
 * @see scripts/check-logic.js for the assertions this is pinned by
 */
/**
 * Target ceiling for circulating caffeine at bedtime, in mg.
 *
 * Caffeine's effect on sleep is dose-dependent: clear disruption from ~100mg
 * near bed, small effects below ~50mg. 25mg (the old value) is so conservative
 * it forbids caffeine entirely; 100mg permits a 9pm coffee. 50mg is the
 * defensible middle and yields cutoffs near the standard "6 hours before bed"
 * guidance for an average metaboliser.
 */
exports.TARGET_AT_BED_MG = 50;
/** A standard drip coffee — the assumed next drink before we know better. */
exports.DEFAULT_DOSE_MG = 95;
/**
 * Below this much headroom, no realistic drink fits under the budget, so the
 * honest answer is "you're done for today" rather than a clock time.
 */
const MIN_HEADROOM_MG = 4;
/** Never place the cutoff inside this buffer before bed. */
const MIN_LEAD_MIN = 60;
/**
 * How far before bedtime the cutoff may ever sit.
 *
 * Without this, a heavy day drives the arithmetic to a time hours before the
 * user woke up, and the screen shows a cutoff that was "missed" before it
 * existed. Past this bound the state is `exhausted`, which reads honestly.
 */
const MAX_LEAD_MIN = 16 * 60;
/**
 * Minutes from `now` until the bedtime that ends the current waking day.
 *
 * A wolf's 01:00 bedtime belongs to *tomorrow* when read at 08:00, but to a few
 * minutes ago when read at 01:30. The six-hour grace distinguishes the two:
 * within it we treat a passed bedtime as just-passed rather than jumping a full
 * day forward, which would otherwise place the cutoff 18 hours out.
 */
function minutesUntilBed(now, bedtime) {
    const [bH, bM] = (bedtime || "23:00").split(":").map(Number);
    const bedClock = bH * 60 + bM;
    const nowClock = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    let diff = bedClock - nowClock;
    if (diff < -6 * 60)
        diff += 24 * 60;
    return diff;
}
/** Remaining mg of an initial dose after `hours`, per the half-life model. */
function decay(mg, hours, halfLife) {
    if (hours <= 0)
        return mg;
    return mg * Math.pow(0.5, hours / halfLife);
}
function computeCutoff({ bedtime, sensitivity, entries, nextDoseMg = exports.DEFAULT_DOSE_MG, now, shiftEarlierMin = 0, }) {
    var _a;
    const halfLife = (_a = caffeine_1.CAFFEINE_HALF_LIFE[sensitivity]) !== null && _a !== void 0 ? _a : caffeine_1.CAFFEINE_HALF_LIFE.normal;
    const bedInMin = minutesUntilBed(now, bedtime);
    const bedAtMs = now.getTime() + bedInMin * 60000;
    // What is still on board at bedtime from drinks already had. Future-dated
    // entries are ignored rather than trusted; a mis-set picker shouldn't be
    // able to make the budget look freer than it is.
    const loadAtBed = entries.reduce((sum, e) => {
        const hours = (bedAtMs - e.consumedAt) / 3600000;
        if (hours < 0)
            return sum;
        return sum + decay(e.mg, hours, halfLife);
    }, 0);
    const headroom = exports.TARGET_AT_BED_MG - loadAtBed;
    const dose = Math.max(1, nextDoseMg);
    const nowClock = now.getHours() * 60 + now.getMinutes();
    const toClock = (fromNow) => ((Math.round(nowClock + fromNow) % 1440) + 1440) % 1440;
    if (headroom < MIN_HEADROOM_MG) {
        // The budget is spent. Report the boundary rather than an arithmetic time
        // that would land before the user woke up.
        const away = bedInMin - MAX_LEAD_MIN - shiftEarlierMin;
        return {
            minutes: toClock(away),
            minutesAway: Math.round(away),
            passed: true,
            exhausted: true,
            loadAtBed: Math.round(loadAtBed * 10) / 10,
            headroom: Math.round(headroom * 10) / 10,
            nextDoseMg: dose,
        };
    }
    // Hours the next dose needs to decay from `dose` down to the headroom left.
    // If it already fits, it could in principle be drunk at bedtime, so the lead
    // buffer becomes the binding constraint.
    const hoursNeeded = dose <= headroom ? 0 : halfLife * Math.log2(dose / headroom);
    const leadNeeded = hoursNeeded * 60;
    // More lead than a waking day contains: there was no moment today when a
    // drink this size fitted under the budget. Clamping instead would report an
    // ordinary-looking time and hide that, which is the more misleading failure.
    if (leadNeeded > MAX_LEAD_MIN) {
        const away = bedInMin - MAX_LEAD_MIN - shiftEarlierMin;
        return {
            minutes: toClock(away),
            minutesAway: Math.round(away),
            passed: true,
            exhausted: true,
            loadAtBed: Math.round(loadAtBed * 10) / 10,
            headroom: Math.round(headroom * 10) / 10,
            nextDoseMg: dose,
        };
    }
    const lead = Math.max(MIN_LEAD_MIN, leadNeeded);
    const away = bedInMin - lead - shiftEarlierMin;
    /**
     * Distinguishes "your cutoff passed" from "you've used the budget up".
     *
     * Both put the cutoff behind the user, but for opposite reasons, and only one
     * is their doing. Comparing against an empty tank separates them: if the
     * cutoff would still be ahead had they drunk nothing, then what they drank is
     * what put it out of reach — so report a limit reached, not a deadline missed
     * at a time that may well precede when they woke up.
     */
    const baselineLead = Math.max(MIN_LEAD_MIN, dose <= exports.TARGET_AT_BED_MG ? 0 : halfLife * Math.log2(dose / exports.TARGET_AT_BED_MG) * 60);
    const spentTheBudget = away < 0 && bedInMin - baselineLead - shiftEarlierMin >= 0;
    if (spentTheBudget) {
        return {
            minutes: toClock(away),
            minutesAway: Math.round(away),
            passed: true,
            exhausted: true,
            loadAtBed: Math.round(loadAtBed * 10) / 10,
            headroom: Math.round(headroom * 10) / 10,
            nextDoseMg: dose,
        };
    }
    return {
        minutes: toClock(away),
        minutesAway: Math.round(away),
        passed: away < 0,
        exhausted: false,
        loadAtBed: Math.round(loadAtBed * 10) / 10,
        headroom: Math.round(headroom * 10) / 10,
        nextDoseMg: dose,
    };
}
/**
 * The day's stable cutoff line, ignoring anything drunk today.
 *
 * Adherence and the onboarding preview both need a fixed line: "did you drink
 * past your cutoff" must not be scored against a boundary that today's drinks
 * already moved, or the same history reads differently every hour.
 */
function baselineCutoffMinutes(bedtime, sensitivity, now = new Date()) {
    return computeCutoff({ bedtime, sensitivity, entries: [], now }).minutes;
}
/**
 * Their typical drink size, for "when can I have the next one".
 *
 * Someone who logs espressos should get a later cutoff than someone on cold
 * brew — it follows from the model, and it is personalisation they can feel
 * without answering another question. Falls back to a standard coffee until
 * there is history worth trusting.
 */
function typicalDoseMg(entries, fallback = exports.DEFAULT_DOSE_MG) {
    const real = entries.filter((e) => e.mg > 5);
    if (real.length < 3)
        return fallback;
    const sorted = real.map((e) => e.mg).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    return Math.round(median);
}

}
  }, cache = {};
  function req(n) { if (!cache[n]) { var e = {}; cache[n] = e; defs[n](e, req); } return cache[n]; }
  return { cutoff: req("./cutoff"), caffeine: req("./caffeine") };
})();

  function clock(min) {
    min = ((Math.round(min) % 1440) + 1440) % 1440;
    var h = Math.floor(min / 60), m = min % 60;
    return { time: (h % 12 || 12) + ":" + (m < 10 ? "0" : "") + m, suffix: h < 12 ? "AM" : "PM" };
  }
  function clockText(min) { var c = clock(min); return c.time + " " + c.suffix; }

  /* ── the hero follows the visitor's hour ── */
  /* ?at=15:20 shows another hour, for checking the page. */
  function nowMinutes() {
    var q = /[?&]at=(\d{1,2}):(\d{2})/.exec(location.search);
    if (q) return Number(q[1]) * 60 + Number(q[2]);
    var d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }
  var now = nowMinutes(), h = now / 60;
  var idx = h >= 23 || h < 4 ? 5 : h < 9 ? 0 : h < 13 ? 1 : h < 17.5 ? 2 : h < 21 ? 3 : 4;
  var moment = PAGE.moments[idx], sky = PAGE.sky[idx];
  var hero = document.querySelector(".hero");

  hero.dataset.phase = moment.phase;
  document.documentElement.setAttribute("data-phase", moment.phase);
  hero.style.setProperty("--zen", sky.zen);
  hero.style.setProperty("--hor", sky.hor);
  hero.style.setProperty("--acc", idx === 5 ? "#C9CFFF" : PAGE.accents[moment.phase]);
  hero.style.setProperty("--stars", idx >= 4 ? "0.85" : "0");
  
  var nowLine = document.getElementById("now-line");
  if (nowLine) nowLine.textContent = clockText(now) + " where you are";

  var slots = hero.querySelectorAll(".hero-phone-slot");
  if (!slots.length) {
    var source = document.querySelector('[data-moment="' + moment.phase + '"] .phone');
    var heroPhone = hero.querySelector(".device .phone");
    if (source && heroPhone) heroPhone.replaceWith(source.cloneNode(true));
    var heroCap = document.getElementById("hero-cap");
    if (heroCap) {
      heroCap.textContent = moment.time ? moment.label + " · " + moment.time : moment.label;
    }
  }

  /* The sun's place on the arc: 5 AM at the left horizon, midnight at the right. */
  var f = h < 4 ? 1 : Math.min(1, Math.max(0, (h - 5) / 19));
  function onArc(t) {
    var u = 1 - t;
    return { x: 3 * u * u * t * 300 + 3 * u * t * t * 700 + t * t * t * 1000,
             y: u * u * u * 270 + 3 * u * u * t * -10 + 3 * u * t * t * -10 + t * t * t * 270 };
  }
  var sun = hero.querySelector(".sun");
  function place(t) {
    var p = onArc(t);
    if (sun) {
      sun.style.left = p.x / 10 + "%";
      sun.style.top = p.y / 3 + "%";
    }
    hero.style.setProperty("--sun-x", p.x / 10 + "%");
    hero.style.setProperty("--sun-y", p.y / 3 + "%");
  }
  place(f);

  /* ── the calculator, on the app's own engine ── */
  var form = document.getElementById("calc");
  var out = {
    time: document.getElementById("r-time"),
    line: document.getElementById("r-line"),
    curve: document.getElementById("r-curve"),
    compare: document.getElementById("r-compare")
  };
  var NS = "http://www.w3.org/2000/svg";
  function el(name, attrs, text) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  function drawCurve(dose, cutMin, bedMin, halfLife) {
    var svg = out.curve, target = PAGE.targetMg;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var W = 600, top = 28, bottom = 176, left = 6, right = 594;
    var start = cutMin - 45, end = bedMin + 75;
    var maxMg = Math.max(dose * 1.08, target * 1.9);
    var x = function (m) { return left + ((m - start) / (end - start)) * (right - left); };
    var y = function (mg) { return bottom - (mg / maxMg) * (bottom - top); };
    var mgAt = function (m) { return m < cutMin ? 0 : dose * Math.pow(0.5, (m - cutMin) / 60 / halfLife); };

    var d = "M " + x(start).toFixed(1) + " " + y(0).toFixed(1) + " L " + x(cutMin).toFixed(1) + " " + y(0).toFixed(1);
    for (var m = cutMin; m <= end; m += 5) d += " L " + x(m).toFixed(1) + " " + y(mgAt(m)).toFixed(1);

    var defs = el("defs", {});
    var lg = el("linearGradient", { id: "rc-fill", x1: "0", y1: "0", x2: "0", y2: "1" });
    lg.appendChild(el("stop", { offset: "0", "stop-color": "#FFE0A8", "stop-opacity": ".34" }));
    lg.appendChild(el("stop", { offset: "1", "stop-color": "#FFE0A8", "stop-opacity": "0" }));
    defs.appendChild(lg);
    svg.appendChild(defs);

    svg.appendChild(el("line", { x1: left, x2: right, y1: bottom, y2: bottom, stroke: "#AFC6D6", "stroke-opacity": ".35", "stroke-width": "1" }));
    svg.appendChild(el("path", { d: d + " L " + x(end).toFixed(1) + " " + bottom + " L " + x(start).toFixed(1) + " " + bottom + " Z", fill: "url(#rc-fill)" }));
    svg.appendChild(el("path", { d: d, fill: "none", stroke: "#FFE0A8", "stroke-width": "2.6", "stroke-linejoin": "round" }));

    /* The bedtime budget, and bedtime itself. */
    svg.appendChild(el("line", { x1: left, x2: right, y1: y(target), y2: y(target), stroke: "#AFC6D6", "stroke-dasharray": "5 5", "stroke-opacity": ".7" }));
    svg.appendChild(el("text", { x: right, y: y(target) - 8, "text-anchor": "end", fill: "#AFC6D6", "font-size": "13" }, target + " mg"));
    svg.appendChild(el("line", { x1: x(bedMin), x2: x(bedMin), y1: top - 6, y2: bottom, stroke: "#F6FAFD", "stroke-opacity": ".45", "stroke-dasharray": "2 4" }));
    svg.appendChild(el("text", { x: x(bedMin), y: top - 12, "text-anchor": "middle", fill: "#F6FAFD", "font-size": "13" }, "Bed " + clockText(bedMin)));

    svg.appendChild(el("circle", { cx: x(cutMin), cy: y(dose), r: "5", fill: "#FFE0A8" }));
    svg.appendChild(el("text", { x: x(cutMin) + 10, y: y(dose) - 10, fill: "#FFE0A8", "font-size": "13" }, dose + " mg at " + clockText(cutMin)));
    svg.appendChild(el("text", { x: x(cutMin), y: bottom + 22, "text-anchor": "middle", fill: "#AFC6D6", "font-size": "12" }, clockText(cutMin)));
  }

  function update() {
    var bed = form.bed.value;
    var sens = (form.querySelector('input[name="sens"]:checked') || {}).value || "normal";
    var drink = PAGE.drinks.filter(function (x) { return x.id === form.drink.value; })[0] || PAGE.drinks[1];
    var noon = new Date(); noon.setHours(12, 0, 0, 0);
    var r = ENGINE.cutoff.computeCutoff({ bedtime: bed, sensitivity: sens, entries: [], nextDoseMg: drink.mg, now: noon });
    var halfLife = PAGE.halfLife[sens];
    var bedClock = Number(bed.slice(0, 2)) * 60 + Number(bed.slice(3));
    var name = drink.name.toLowerCase();

    if (r.exhausted) {
      out.time.innerHTML = "None";
      out.line.textContent = "A " + name + " is too much caffeine to clear by bedtime at any hour of the day. Try a smaller drink.";
      while (out.curve.firstChild) out.curve.removeChild(out.curve.firstChild);
      out.compare.textContent = "";
      return;
    }

    var c = clock(r.minutes);
    out.time.innerHTML = c.time + "<span>" + c.suffix + "</span>";
    var bedMin = bedClock < r.minutes ? bedClock + 1440 : bedClock;
    var lead = bedMin - r.minutes;
    var leftAtBed = drink.mg * Math.pow(0.5, lead / 60 / halfLife);

    if (leftAtBed < PAGE.targetMg - 1) {
      out.line.textContent = "A " + name + " (" + drink.mg + " mg) is small enough to have up to an hour before bed, " + clockText(bedClock) + ".";
    } else {
      out.line.textContent = "A " + name + " (" + drink.mg + " mg) then leaves " + PAGE.targetMg + " mg or less in you at bedtime, " + clockText(bedClock) + ".";
    }
    drawCurve(drink.mg, r.minutes, bedMin, halfLife);

    var later = r.minutes + 120;
    if (bedMin - later >= 60 && leftAtBed >= PAGE.targetMg - 1) {
      var still2 = Math.round(drink.mg * Math.pow(0.5, (bedMin - later) / 60 / halfLife));
      out.compare.textContent = "Had at " + clockText(later) + ", the same drink would still leave " + still2 + " mg in you at bedtime.";
    } else {
      out.compare.textContent = "";
    }
  }
  form.addEventListener("change", update);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  update();

  } catch (err) {
    console.warn("Landing interactivity initialization error:", err);
  }
}

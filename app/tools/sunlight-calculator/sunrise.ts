// Sunrise for a place and date, using the standard solar algorithm (zenith 90.833°,
// which allows for refraction and the sun's disc). Accurate to a minute or two.

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const norm = (value: number, max: number) => ((value % max) + max) % max;

export type SunriseResult =
  | { kind: "time"; utcMinutes: number }
  | { kind: "polar-night" }
  | { kind: "midnight-sun" };

// month is 1-12. Returns sunrise in minutes after midnight UTC.
export function sunriseUtc(year: number, month: number, day: number, lat: number, lon: number): SunriseResult {
  const n1 = Math.floor((275 * month) / 9);
  const n2 = Math.floor((month + 9) / 12);
  const n3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3);
  const dayOfYear = n1 - n2 * n3 + day - 30;

  const lngHour = lon / 15;
  const t = dayOfYear + (6 - lngHour) / 24;
  const meanAnomaly = 0.9856 * t - 3.289;
  const trueLong = norm(meanAnomaly + 1.916 * Math.sin(rad(meanAnomaly)) + 0.02 * Math.sin(rad(2 * meanAnomaly)) + 282.634, 360);

  let rightAscension = norm(deg(Math.atan(0.91764 * Math.tan(rad(trueLong)))), 360);
  rightAscension += Math.floor(trueLong / 90) * 90 - Math.floor(rightAscension / 90) * 90;
  rightAscension /= 15;

  const sinDec = 0.39782 * Math.sin(rad(trueLong));
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(rad(90.833)) - sinDec * Math.sin(rad(lat))) / (cosDec * Math.cos(rad(lat)));

  if (cosH > 1) return { kind: "polar-night" };
  if (cosH < -1) return { kind: "midnight-sun" };

  const hourAngle = (360 - deg(Math.acos(cosH))) / 15;
  const localMeanTime = hourAngle + rightAscension - 0.06571 * t - 6.622;
  return { kind: "time", utcMinutes: norm(localMeanTime - lngHour, 24) * 60 };
}

// Minutes after local midnight for a UTC instant, in an IANA time zone (DST-correct).
export function localMinutes(year: number, month: number, day: number, utcMinutes: number, timeZone: string) {
  const instant = new Date(Date.UTC(year, month - 1, day, 0, Math.round(utcMinutes)));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instant);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

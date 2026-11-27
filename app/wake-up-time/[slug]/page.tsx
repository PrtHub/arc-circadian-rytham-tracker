import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BED_TIMES, parseTimeSlug, timeSlug } from "@/lib/sleep-times";
import {
  SleepTimesPage,
  sleepTimesDescription,
  sleepTimesPath,
  sleepTimesTitle,
} from "@/components/sleep-times/SleepTimesPage";

// /wake-up-time/bed-at-10pm: wake-up times that end on a full sleep cycle for a given bedtime.
const PREFIX = "bed-at-";

function bedFromSlug(slug: string) {
  if (!slug.startsWith(PREFIX)) return null;
  const minutes = parseTimeSlug(slug.slice(PREFIX.length));
  return minutes !== null && BED_TIMES.includes(minutes) ? minutes : null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BED_TIMES.map((m) => ({ slug: `${PREFIX}${timeSlug(m)}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bed = bedFromSlug(slug);
  if (bed === null) return {};
  const title = sleepTimesTitle("bed", bed);
  const description = sleepTimesDescription("bed", bed);
  const url = sleepTimesPath("bed", bed);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ARC`, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${title} | ARC`, description },
  };
}

export default async function WakeUpTimePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bed = bedFromSlug(slug);
  if (bed === null) notFound();
  return <SleepTimesPage mode="bed" minutes={bed} />;
}

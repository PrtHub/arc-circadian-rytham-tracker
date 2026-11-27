import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WAKE_TIMES, parseTimeSlug, timeSlug } from "@/lib/sleep-times";
import {
  SleepTimesPage,
  sleepTimesDescription,
  sleepTimesPath,
  sleepTimesTitle,
} from "@/components/sleep-times/SleepTimesPage";

// /bedtime/wake-up-at-6am: bedtimes that end on a full sleep cycle for a given wake time.
const PREFIX = "wake-up-at-";

function wakeFromSlug(slug: string) {
  if (!slug.startsWith(PREFIX)) return null;
  const minutes = parseTimeSlug(slug.slice(PREFIX.length));
  return minutes !== null && WAKE_TIMES.includes(minutes) ? minutes : null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return WAKE_TIMES.map((m) => ({ slug: `${PREFIX}${timeSlug(m)}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wake = wakeFromSlug(slug);
  if (wake === null) return {};
  const title = sleepTimesTitle("wake", wake);
  const description = sleepTimesDescription("wake", wake);
  const url = sleepTimesPath("wake", wake);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ARC`, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${title} | ARC`, description },
  };
}

export default async function BedtimePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wake = wakeFromSlug(slug);
  if (wake === null) notFound();
  return <SleepTimesPage mode="wake" minutes={wake} />;
}

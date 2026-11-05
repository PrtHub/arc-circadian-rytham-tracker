import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SCHEDULE_WAKE_MINUTES,
  buildScheduleData,
  parseScheduleSlug,
  scheduleSlug,
  scheduleTimeLabel,
} from "@/lib/schedule-matrix";
import { SchedulePage } from "@/components/schedules/SchedulePage";

const SITE_URL = "https://arccircadian.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return SCHEDULE_WAKE_MINUTES.map((m) => ({
    slug: scheduleSlug(m),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const wake = parseScheduleSlug(slug);
  if (wake === null) return {};

  const t = scheduleTimeLabel(wake);
  const data = buildScheduleData(wake);

  const title = `Wake Up at ${t} Daily Schedule: Circadian Routine & Timeline`;
  const description = `Waking at ${t}? Complete science-backed circadian schedule: 20-min light window, 90-min delayed coffee at ${data.firstCoffee}, peak focus hours, caffeine cutoff at ${data.caffeineCurfews[1].cutoffTime}, and bedtime.`;
  const url = `${SITE_URL}/schedules/${slug}`;

  return {
    title,
    description,
    keywords: [
      `wake up at ${t} schedule`,
      `wake up at ${t} routine`,
      `wake up at ${t} daily schedule`,
      `wake up at ${t} when to sleep`,
      `wake up at ${t} coffee cutoff`,
      "circadian rhythm routine",
      "daily schedule matrix",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ARC`,
      description,
      url,
      type: "article",
      siteName: "ARC: Circadian Rhythm Tracker",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ARC`,
      description,
    },
  };
}

export default async function ScheduleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wake = parseScheduleSlug(slug);
  if (wake === null) notFound();

  const data = buildScheduleData(wake);
  return <SchedulePage data={data} />;
}


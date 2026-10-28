import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARC: Circadian Rhythm Tracker",
    short_name: "ARC",
    description:
      "Stop fighting your body. Discover your chronotype, calculate caffeine half-life, and follow your dynamic circadian daily plan.",
    start_url: "/",
    display: "standalone",
    background_color: "#070A18",
    theme_color: "#070A18",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

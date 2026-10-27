"use client";

import { useEffect } from "react";
import { initLanding } from "./landing-engine";

export function LandingInteractive() {
  useEffect(() => {
    initLanding();
  }, []);

  return null;
}

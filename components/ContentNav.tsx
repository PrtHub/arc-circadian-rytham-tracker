"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ContentNavProps {
  backHref?: string;
  backLabel?: string;
}

export function ContentNav({ backHref: _backHref, backLabel: _backLabel }: ContentNavProps = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#070a18]/95 backdrop-blur-xl border-b border-[rgba(253,246,236,0.12)] shadow-2xl shadow-black/50"
            : "bg-[#070a18]/80 backdrop-blur-md border-b border-[rgba(253,246,236,0.08)] shadow-md shadow-black/20"
        }`}
      >
        <div
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6"
          aria-label="Content navigation"
        >
          {/* Left: Brand matching landing page */}
          <Link
            href="/"
            className="brand shrink-0"
            aria-label="ARC home"
          >
            <Image
              src="/brand-icon.webp"
              alt="ARC logo"
              width={30}
              height={30}
              className="rounded-lg block"
            />
            <span>ARC</span>
          </Link>

          {/* Center: Landing page nav links */}
          <nav className="hidden md:flex gap-6 items-center" aria-label="Sections">
            <Link href="/#day" className="text-[14.5px] text-(--mist) hover:text-(--cream) transition-colors">
              How it works
            </Link>
            <Link href="/#cutoff" className="text-[14.5px] text-(--mist) hover:text-(--cream) transition-colors">
              Coffee cutoff
            </Link>
            <Link href="/#chronotypes" className="text-[14.5px] text-(--mist) hover:text-(--cream) transition-colors">
              Chronotypes
            </Link>
            <Link href="/#pricing" className="text-[14.5px] text-(--mist) hover:text-(--cream) transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="text-[14.5px] text-(--mist) hover:text-(--cream) transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Right: Landing page CTA */}
          <div className="flex items-center gap-3">
            <a
              className="btn-store text-sm py-2 px-4.5 font-semibold"
              href="https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892"
            >
              Download
            </a>
          </div>
        </div>
      </header>

      {/* Structural spacer so fixed header does not obscure page content */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";

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
            ? "bg-[#070a18]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40"
            : "bg-[#070a18]/85 backdrop-blur-md border-b border-white/5 shadow-md shadow-black/20"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4"
          aria-label="Content navigation"
        >
          {/* Left: Brand Icon + Name */}
          <Link
            href="/"
            className="text-lg font-black tracking-tighter text-white flex items-center gap-2.5 group shrink-0"
            aria-label="ARC home"
          >
            <div className="relative">
              <Image
                src="/icon-dark.png"
                alt="ARC logo"
                width={28}
                height={28}
                className="rounded-lg shadow-md border border-white/10 group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 rounded-lg bg-(--accent)/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-sans font-black tracking-tight flex items-center text-lg">
              ARC<span className="text-accent text-xl leading-none">.</span>
            </span>
          </Link>

          {/* Right: Compact App Store CTA */}
          <AppStoreButton size="compact" location="content_nav" />
        </nav>
      </header>

      {/* Structural spacer so fixed header does not obscure page content */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />
    </>
  );
}

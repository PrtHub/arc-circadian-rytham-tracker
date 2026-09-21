"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ContentNavProps {
  backHref: string;
  backLabel?: string;
}

export function ContentNav({ backHref, backLabel = "All Posts" }: ContentNavProps) {
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

          {/* Right: Clean Back Link */}
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent hover:text-white transition-all py-1.5 px-3.5 rounded-full hover:bg-white/5 border border-accent/20 hover:border-white/20 group"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
            <span>{backLabel}</span>
          </Link>
        </nav>
      </header>

      {/* Structural spacer so fixed header does not obscure page content */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />
    </>
  );
}

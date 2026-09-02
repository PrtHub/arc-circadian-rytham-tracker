"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070a18]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40"
          : "bg-[#070a18]/80 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Left: Brand */}
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-white flex items-center gap-2.5 group shrink-0"
          aria-label="ARC home"
        >
          <div className="relative">
            <Image
              src="/icon-dark.png"
              alt="ARC logo"
              width={32}
              height={32}
              className="rounded-xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 rounded-xl bg-(--accent)/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-sans font-black tracking-tight flex items-center text-lg sm:text-xl">
            ARC<span className="text-accent text-2xl leading-none">.</span>
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm text-(--fg-muted) font-medium">
          <a
            href="/#features"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all text-xs font-semibold tracking-wide uppercase font-mono"
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all text-xs font-semibold tracking-wide uppercase font-mono"
          >
            How It Works
          </a>
          <a
            href="/#pricing"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all text-xs font-semibold tracking-wide uppercase font-mono"
          >
            Pricing
          </a>
          <Link
            href="/tools"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all text-xs font-semibold tracking-wide uppercase font-mono flex items-center gap-1.5"
          >
            Tools
            <span className="px-1.5 py-0.5 rounded-full bg-accent text-black text-[9px] font-black font-mono leading-none">
              10+
            </span>
          </Link>
          <Link
            href="/science"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all text-xs font-semibold tracking-wide uppercase font-mono"
          >
            Science
          </Link>
          <Link
            href="/books"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all text-xs font-semibold tracking-wide uppercase font-mono"
          >
            Books
          </Link>
          <Link
            href="/blog"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all text-xs font-semibold tracking-wide uppercase font-mono"
          >
            Blog
          </Link>
        </div>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <AppStoreButton location="navbar" />
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white flex items-center justify-center focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#070a18]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 font-mono text-sm">
            <a
              href="/#features"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl hover:bg-white/5 text-(--fg) hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Features</span>
              <span className="text-xs text-(--fg-muted)">01</span>
            </a>
            <a
              href="/#how-it-works"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl hover:bg-white/5 text-(--fg) hover:text-white transition-colors flex items-center justify-between"
            >
              <span>How It Works</span>
              <span className="text-xs text-(--fg-muted)">02</span>
            </a>
            <a
              href="/#pricing"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl hover:bg-white/5 text-(--fg) hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Pricing</span>
              <span className="text-xs text-(--fg-muted)">03</span>
            </a>
            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl hover:bg-white/5 text-(--fg) hover:text-white transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>Free Calculators &amp; Tools</span>
                <span className="px-2 py-0.5 rounded-full bg-accent text-black text-[10px] font-black">
                  10+
                </span>
              </div>
              <span className="text-xs text-(--fg-muted)">→</span>
            </Link>
            <Link
              href="/science"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl hover:bg-white/5 text-(--fg) hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Science Protocols</span>
              <span className="text-xs text-(--fg-muted)">→</span>
            </Link>
            <Link
              href="/books"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl hover:bg-white/5 text-(--fg) hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Literature &amp; Book Reviews</span>
              <span className="text-xs text-(--fg-muted)">→</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl hover:bg-white/5 text-(--fg) hover:text-white transition-colors flex items-center justify-between"
            >
              <span>ARC Journal &amp; Articles</span>
              <span className="text-xs text-(--fg-muted)">→</span>
            </Link>

            <div className="pt-4 mt-2 border-t border-white/10 sm:hidden">
              <AppStoreButton size="lg" location="mobile_navbar" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

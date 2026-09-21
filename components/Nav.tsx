"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppStoreButton } from "@/components/AppStoreButton";

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

function getDynamicNavItems(pathname: string): NavItem[] {
  if (pathname === "/") {
    return [
      { name: "Features", href: "/#features" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Tools", href: "/tools", badge: "10+" },
      { name: "Guides", href: "/guides", badge: "New" },
      { name: "Pricing", href: "/#pricing" },
    ];
  }

  if (pathname.startsWith("/tools")) {
    return [
      { name: "Guides", href: "/guides", badge: "New" },
      { name: "Science", href: "/science" },
      { name: "Features", href: "/#features" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Pricing", href: "/#pricing" },
    ];
  }

  if (pathname.startsWith("/guides")) {
    return [
      { name: "Tools", href: "/tools", badge: "10+" },
      { name: "Science", href: "/science" },
      { name: "Blog", href: "/blog" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Pricing", href: "/#pricing" },
    ];
  }

  if (pathname.startsWith("/science")) {
    return [
      { name: "Guides", href: "/guides", badge: "New" },
      { name: "Tools", href: "/tools", badge: "10+" },
      { name: "Books", href: "/books" },
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
    ];
  }

  if (pathname.startsWith("/blog")) {
    return [
      { name: "Guides", href: "/guides", badge: "New" },
      { name: "Tools", href: "/tools", badge: "10+" },
      { name: "Science", href: "/science" },
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
    ];
  }

  if (pathname.startsWith("/books")) {
    return [
      { name: "Science", href: "/science" },
      { name: "Guides", href: "/guides", badge: "New" },
      { name: "Tools", href: "/tools", badge: "10+" },
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
    ];
  }

  // Generic fallback for personas, chronotypes, legal, support
  return [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools", badge: "10+" },
    { name: "Guides", href: "/guides", badge: "New" },
    { name: "Science", href: "/science" },
    { name: "Pricing", href: "/#pricing" },
  ];
}

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = getDynamicNavItems(pathname);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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

        {/* Center: Dynamic Desktop Navigation Links (strictly 4-5 items max) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm text-(--fg-muted) font-medium">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const isAnchor = item.href.startsWith("/#");
            const LinkComp = isAnchor ? "a" : Link;

            return (
              <LinkComp
                key={item.name}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold tracking-wide uppercase font-mono flex items-center gap-1.5 ${
                  active
                    ? "text-white bg-white/10 border border-white/15 shadow-xs"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-accent text-black text-[9px] font-black font-mono leading-none">
                    {item.badge}
                  </span>
                )}
              </LinkComp>
            );
          })}
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
          <div className="flex flex-col gap-2 font-mono text-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-(--fg-muted) px-3 py-1 font-mono">
              Primary Navigation
            </p>
            {navItems.map((item, idx) => {
              const isAnchor = item.href.startsWith("/#");
              const LinkComp = isAnchor ? "a" : Link;
              const active = isActive(item.href);

              return (
                <LinkComp
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-3 rounded-xl transition-colors flex items-center justify-between ${
                    active
                      ? "bg-white/10 text-white font-bold"
                      : "hover:bg-white/5 text-(--fg) hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-accent text-black text-[9px] font-black">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-(--fg-muted)">0{idx + 1}</span>
                </LinkComp>
              );
            })}

            {/* Quick Hub Cross-Links */}
            <div className="pt-3 mt-1 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/tools"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-(--fg-muted) hover:text-white transition-colors"
              >
                Calculators &amp; Tools →
              </Link>
              <Link
                href="/guides"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-(--fg-muted) hover:text-white transition-colors"
              >
                Master Guides →
              </Link>
              <Link
                href="/science"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-(--fg-muted) hover:text-white transition-colors"
              >
                Science &amp; Protocols →
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-(--fg-muted) hover:text-white transition-colors"
              >
                ARC Journal →
              </Link>
            </div>

            <div className="pt-4 mt-2 border-t border-white/10 sm:hidden">
              <AppStoreButton size="lg" location="mobile_navbar" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

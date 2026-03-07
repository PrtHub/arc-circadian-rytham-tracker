import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-white"
          aria-label="ARC home"
        >
          ARC<span className="text-[#CCFF00]">.</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </div>

        <AppStoreButton />
      </nav>
    </header>
  );
}

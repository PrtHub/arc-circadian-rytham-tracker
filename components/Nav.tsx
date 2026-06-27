import Image from "next/image";
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
          className="text-xl font-black tracking-tighter text-white flex items-center gap-2"
          aria-label="ARC home"
        >
          <Image
            src="/icon.png"
            alt=""
            width={28}
            height={28}
            className="rounded-lg shadow-lg"
          />
          ARC<span className="text-[#CCFF00]">.</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-sm text-zinc-400">
          <a href="/#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="/#how-it-works"
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/science" className="hover:text-white transition-colors">
            Science
          </Link>
          <Link href="/books" className="hover:text-white transition-colors">
            Books
          </Link>
          <Link href="/tools" className="hover:text-white transition-colors flex items-center gap-1">
            Tools <span className="px-1.5 py-0.5 rounded-md bg-[#CCFF00]/10 text-[#CCFF00] text-[10px] font-bold">NEW</span>
          </Link>
        </div>

        <AppStoreButton location="navbar" />
      </nav>
    </header>
  );
}

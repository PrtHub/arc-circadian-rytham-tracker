import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-white/5 bg-[#0a0a0a] py-12 px-6"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-zinc-600">
          <Link
            href="/"
            className="font-black text-white text-lg tracking-tighter flex items-center gap-2"
          >
            <Image
              src="/icon.png"
              alt=""
              width={24}
              height={24}
              className="rounded-md opacity-80"
            />
            ARC<span className="text-[#CCFF00]">.</span>
          </Link>

          <nav
            aria-label="Footer navigation"
            className="flex items-center gap-5"
          >
            <a
              href="https://www.notion.so/Privacy-Policy-for-ARC-Sync-Your-Life-2f2af72016c9802bace6fddd4a1ed526"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.notion.so/Terms-of-Service-for-ARC-Sync-Your-Life-2f2af72016c980c8be7be0bacf1ee076"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <Link
              href="/blog"
              className="hover:text-white transition-colors"
            >
              Blog
            </Link>
            <a
              href="mailto:pritamfinds@gmail.com"
              className="hover:text-white transition-colors"
            >
              Support
            </a>
          </nav>
        </div>

        <p className="text-xs text-zinc-700">
          © {new Date().getFullYear()} ARC. Built on chronobiology.
        </p>
      </div>
    </footer>
  );
}

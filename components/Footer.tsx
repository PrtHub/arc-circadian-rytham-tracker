import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#070A18] border-t border-[rgba(253,246,236,0.14)] py-14 sm:py-16 text-[#FDF6EC]" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-9 lg:gap-8">
          {/* Brand & About */}
          <div className="col-span-2 space-y-3.5">
            <Link className="inline-flex items-center gap-2.5 text-[#FDF6EC] font-display text-[26px] tracking-wide" href="/">
              <Image
                src="/brand-icon.webp"
                alt="ARC logo"
                width={30}
                height={30}
                className="rounded-lg block"
              />
              <span>ARC</span>
            </Link>
            <p className="text-[#C3BACB] text-[14px] leading-relaxed max-w-sm">
              Plans your day around your chronotype: daylight, coffee, focus, and the dip you actually have.
            </p>
          </div>

          {/* Chronotypes */}
          <nav aria-label="Chronotypes" className="space-y-3">
            <h4 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#C3BACB]">Chronotypes</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link href="/chronotype/lion" className="hover:text-[#FFD9A0] hover:underline transition-colors">Lion schedule</Link></li>
              <li><Link href="/chronotype/bear" className="hover:text-[#FFD9A0] hover:underline transition-colors">Bear schedule</Link></li>
              <li><Link href="/chronotype/wolf" className="hover:text-[#FFD9A0] hover:underline transition-colors">Wolf schedule</Link></li>
              <li><Link href="/chronotype/dolphin" className="hover:text-[#FFD9A0] hover:underline transition-colors">Dolphin schedule</Link></li>
              <li><Link href="/tools/chronotype-quiz" className="hover:text-[#FFD9A0] hover:underline transition-colors">Chronotype quiz</Link></li>
            </ul>
          </nav>

          {/* Free tools */}
          <nav aria-label="Free tools" className="space-y-3">
            <h4 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#C3BACB]">Free tools</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link href="/tools/caffeine-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Caffeine calculator</Link></li>
              <li><Link href="/tools/sleep-cycle-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Sleep cycle calculator</Link></li>
              <li><Link href="/tools/nap-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Nap calculator</Link></li>
              <li><Link href="/tools/jetlag-planner" className="hover:text-[#FFD9A0] hover:underline transition-colors">Jet lag planner</Link></li>
              <li><Link href="/tools" className="hover:text-[#FFD9A0] hover:underline transition-colors">All tools</Link></li>
            </ul>
          </nav>

          {/* For */}
          <nav aria-label="Who it's for" className="space-y-3">
            <h4 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#C3BACB]">For</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link href="/for/coffee-drinkers" className="hover:text-[#FFD9A0] hover:underline transition-colors">Coffee drinkers</Link></li>
              <li><Link href="/for/founders" className="hover:text-[#FFD9A0] hover:underline transition-colors">Founders</Link></li>
              <li><Link href="/for/adhd" className="hover:text-[#FFD9A0] hover:underline transition-colors">ADHD</Link></li>
              <li><Link href="/for/shift-workers" className="hover:text-[#FFD9A0] hover:underline transition-colors">Shift workers</Link></li>
              <li><Link href="/for/sleep-seekers" className="hover:text-[#FFD9A0] hover:underline transition-colors">Sleep seekers</Link></li>
              <li><Link href="/for/biohackers" className="hover:text-[#FFD9A0] hover:underline transition-colors">Biohackers</Link></li>
            </ul>
          </nav>

          {/* Learn */}
          <nav aria-label="Learn" className="space-y-3">
            <h4 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#C3BACB]">Learn</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link href="/guides" className="hover:text-[#FFD9A0] hover:underline transition-colors">Guides</Link></li>
              <li><Link href="/blog" className="hover:text-[#FFD9A0] hover:underline transition-colors">Blog</Link></li>
              <li><Link href="/science" className="hover:text-[#FFD9A0] hover:underline transition-colors">Science</Link></li>
              <li><Link href="/books" className="hover:text-[#FFD9A0] hover:underline transition-colors">Books</Link></li>
              <li><Link href="/support" className="hover:text-[#FFD9A0] hover:underline transition-colors">Support</Link></li>
              <li><Link href="/site-map" className="hover:text-[#FFD9A0] hover:underline transition-colors">Sitemap</Link></li>
            </ul>
          </nav>
        </div>

        {/* Base Bar */}
        <div className="mt-11 pt-6 border-t border-[rgba(253,246,236,0.14)] flex flex-wrap items-center justify-between gap-4 text-[13.5px] text-[#C3BACB]">
          <span>© {new Date().getFullYear()} ARC. Built on chronobiology.</span>
          <div className="flex gap-6">
            <Link href="/site-map" className="hover:text-[#FFD9A0] transition-colors">Sitemap</Link>
            <Link href="/privacy" className="hover:text-[#FFD9A0] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#FFD9A0] transition-colors">Terms</Link>
            <Link href="/support" className="hover:text-[#FFD9A0] transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

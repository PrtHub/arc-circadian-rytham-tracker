import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-white/5 bg-black/30 backdrop-blur-md pt-16 pb-8 px-6"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="font-black text-white text-2xl tracking-tighter flex items-center gap-2 mb-4"
            >
              <Image
                src="/icon-dark.png"
                alt="ARC logo"
                width={32}
                height={32}
                className="rounded-lg opacity-90 shadow-md"
              />
              ARC<span className="text-accent">.</span>
            </Link>
            <p className="text-(--fg-muted) text-sm max-w-sm leading-relaxed mb-6">
              Stop fighting your biology. ARC uses your chronotype to build your day around your unique biological blueprint.
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <a href="https://x.com/iPritamX" target="_blank" rel="noopener noreferrer" className="text-(--fg-muted) hover:text-white transition-colors">X (Twitter)</a>
              <a href="https://www.instagram.com/arc.sync/" target="_blank" rel="noopener noreferrer" className="text-(--fg-muted) hover:text-white transition-colors">Instagram</a>
            </div>
          </div>

          <div>
            <h3 className="text-accent font-bold mb-4 tracking-wider text-xs font-mono uppercase">Chronotypes</h3>
            <ul className="space-y-3 text-sm text-(--fg-muted)">
              <li><Link href="/chronotype/lion" className="hover:text-white transition-colors">Lion Schedule</Link></li>
              <li><Link href="/chronotype/bear" className="hover:text-white transition-colors">Bear Schedule</Link></li>
              <li><Link href="/chronotype/wolf" className="hover:text-white transition-colors">Wolf Schedule</Link></li>
              <li><Link href="/chronotype/dolphin" className="hover:text-white transition-colors">Dolphin Schedule</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent font-bold mb-4 tracking-wider text-xs font-mono uppercase">Resources</h3>
            <ul className="space-y-3 text-sm text-(--fg-muted)">
              <li><Link href="/blog" className="hover:text-white transition-colors">Journal Blog</Link></li>
              <li><Link href="/science" className="hover:text-white transition-colors">Science &amp; Protocols</Link></li>
              <li><Link href="/books" className="hover:text-white transition-colors">Recommended Books</Link></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Help &amp; Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent font-bold mb-4 tracking-wider text-xs font-mono uppercase">Free Tools</h3>
            <ul className="space-y-3 text-sm text-(--fg-muted)">
              <li><Link href="/tools" className="hover:text-white transition-colors">All Free Tools</Link></li>
              <li><Link href="/tools/caffeine-calculator" className="hover:text-white transition-colors">Caffeine Calculator</Link></li>
              <li><Link href="/tools/sleep-cocktail" className="hover:text-white transition-colors">Sleep Cocktail Stack</Link></li>
              <li><Link href="/tools/jetlag-planner" className="hover:text-white transition-colors">Jetlag Planner</Link></li>
              <li><Link href="/tools/chronotype-compatibility" className="hover:text-white transition-colors">Partner Compatibility</Link></li>
              <li><Link href="/tools/sleep-cycle-calculator" className="hover:text-white transition-colors">Sleep Cycle Calculator</Link></li>
              <li><Link href="/tools/social-jetlag-calculator" className="hover:text-white transition-colors">Social Jetlag Calculator</Link></li>
              <li><Link href="/tools/chronotype-quiz" className="hover:text-white transition-colors">Chronotype Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent font-bold mb-4 tracking-wider text-xs font-mono uppercase">Use Cases</h3>
            <ul className="space-y-3 text-sm text-(--fg-muted)">
              <li><Link href="/for/founders" className="hover:text-white transition-colors">For Founders</Link></li>
              <li><Link href="/for/adhd" className="hover:text-white transition-colors">For ADHD</Link></li>
              <li><Link href="/for/shift-workers" className="hover:text-white transition-colors">For Shift Workers</Link></li>
              <li><Link href="/for/coffee-drinkers" className="hover:text-white transition-colors">For Coffee Drinkers</Link></li>
              <li><Link href="/for/sleep-seekers" className="hover:text-white transition-colors">For Sleep Seekers</Link></li>
              <li><Link href="/for/biohackers" className="hover:text-white transition-colors">For Biohackers</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-(--fg-muted) opacity-80 font-mono">
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support Center</Link>
          </div>
          <p>© {new Date().getFullYear()} ARC. Built on chronobiology.</p>
        </div>
      </div>
    </footer>
  );
}

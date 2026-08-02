import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dtd-purple-dark text-dtd-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-dtd-gold">Delta Tau Delta</p>
          <p className="mt-2 text-sm text-dtd-white/80">
            Epsilon Nu Chapter
            <br />
            Missouri University of Science &amp; Technology
          </p>
        </div>

        <div>
          <p className="font-semibold text-dtd-gold-light">Contact</p>
          <ul className="mt-2 space-y-1 text-sm text-dtd-white/80">
            <li>2631 Vienna Rd</li>
            <li>Rolla, MO 65401</li>
            <li>(573) 364-1909</li>
            <li>dtd@umsystem.edu</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-dtd-gold-light">Quick Links</p>
          <ul className="mt-2 space-y-1 text-sm text-dtd-white/80">
            <li><Link href="/recruitment" className="hover:text-dtd-gold">Recruitment</Link></li>
            <li><Link href="/about" className="hover:text-dtd-gold">About Us</Link></li>
            <li><Link href="/philanthropy" className="hover:text-dtd-gold">Philanthropy</Link></li>
            <li><Link href="/alumni" className="hover:text-dtd-gold">Alumni</Link></li>
            <li><Link href="/contact" className="hover:text-dtd-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-dtd-gold-light">Follow Us</p>
          <ul className="mt-2 space-y-1 text-sm text-dtd-white/80">
            <li>
              <a href="https://www.facebook.com/ENDelts" className="hover:text-dtd-gold" target="_blank" rel="noopener noreferrer">
                Facebook &mdash; ENDelts
              </a>
            </li>
            <li>Instagram &mdash; @en.delts</li>
            <li>X &mdash; @ENDelts</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-dtd-purple/60 px-4 py-4 text-center text-xs text-dtd-white/60">
        &copy; {new Date().getFullYear()} Epsilon Nu Chapter of Delta Tau Delta. All rights reserved.
      </div>
    </footer>
  );
}

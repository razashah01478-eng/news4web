import Link from 'next/link'
import { Globe, Share2, Link2, AtSign, Play, Rss } from 'lucide-react'
import { CATEGORIES } from '@/lib/utils'

export default function Footer() {
  const col1 = CATEGORIES.slice(0, 7)
  const col2 = CATEGORIES.slice(7)

  return (
    <footer className="border-t border-[var(--border-color)] mt-16 bg-[var(--card-bg)]">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                <Globe size={18} className="text-white" />
              </div>
              <span className="text-xl font-black text-[var(--foreground)]">
                NEWS<span className="text-[#0ea5e9]">4</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-4">
              Your trusted source for breaking news, in-depth analysis, and AI-powered journalism from around the world.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Share2, href: '#', label: 'Twitter / X' },
                { icon: Link2, href: '#', label: 'Facebook' },
                { icon: AtSign, href: '#', label: 'Instagram' },
                { icon: Play, href: '#', label: 'YouTube' },
                { icon: Rss, href: '#', label: 'RSS' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-[var(--muted-color)] flex items-center justify-center text-[var(--muted-fg)] hover:bg-[#0ea5e9] hover:text-white transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories 1 */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {col1.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-[#0ea5e9] transition-colors"
                  >
                    <span className="text-xs">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-4 text-sm uppercase tracking-wider">&nbsp;</h4>
            <ul className="space-y-2 mt-[1.625rem]">
              {col2.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-[#0ea5e9] transition-colors"
                  >
                    <span className="text-xs">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About NEWS4', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Advertise', href: '/contact' },
                { label: 'Careers', href: '/about' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[var(--muted-fg)] hover:text-[#0ea5e9] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-color)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-fg)]">
            © {new Date().getFullYear()} NEWS4. All rights reserved. AI-powered global news platform.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[var(--muted-fg)] hover:text-[#0ea5e9] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-[var(--muted-fg)] hover:text-[#0ea5e9] transition-colors">Terms</Link>
            <span className="text-xs text-[var(--muted-fg)]">Powered by AI ✦</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

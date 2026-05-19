'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES } from '@/lib/utils'

export default function CategoryNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-[var(--border-color)] bg-[var(--background)] sticky top-[var(--navbar-height)] z-30">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-2">
          <Link
            href="/"
            className={`flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              pathname === '/'
                ? 'bg-[#0ea5e9] text-white'
                : 'text-[var(--muted-fg)] hover:text-[var(--foreground)] hover:bg-[var(--muted-color)]'
            }`}
          >
            All News
          </Link>
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--muted-fg)] hover:text-[var(--foreground)] hover:bg-[var(--muted-color)]'
                }`}
                style={isActive ? { backgroundColor: cat.color } : {}}
              >
                <span className="text-xs">{cat.icon}</span>
                {cat.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

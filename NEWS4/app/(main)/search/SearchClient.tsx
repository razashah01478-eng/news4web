'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '@/lib/utils'

export default function SearchClient({
  initialQuery,
  initialCategory,
}: {
  initialQuery: string
  initialCategory: string
}) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    const params = new URLSearchParams()
    params.set('q', query.trim())
    if (category) params.set('category', category)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-5 flex items-center gap-2">
        <Search size={22} className="text-[#0ea5e9]" />
        Search News
      </h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 focus-within:border-[#0ea5e9]/50 transition-colors">
          <Search size={18} className="text-[var(--muted-fg)] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news, topics, countries..."
            className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted-fg)]"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-[#0ea5e9] text-white font-semibold rounded-xl hover:bg-[#0284c7] transition-all"
        >
          Search
        </button>
      </form>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <SlidersHorizontal size={14} className="text-[var(--muted-fg)]" />
        <button
          onClick={() => setCategory('')}
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
            !category
              ? 'bg-[#0ea5e9] text-white border-[#0ea5e9]'
              : 'border-[var(--border-color)] text-[var(--muted-fg)] hover:border-[#0ea5e9]/50'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug === category ? '' : cat.slug)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              category === cat.slug
                ? 'text-white border-transparent'
                : 'border-[var(--border-color)] text-[var(--muted-fg)] hover:border-[#0ea5e9]/50'
            }`}
            style={category === cat.slug ? { backgroundColor: cat.color } : {}}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}

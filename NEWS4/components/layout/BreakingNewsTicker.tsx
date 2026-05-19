'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CircleAlert as AlertCircle } from 'lucide-react'
import type { Article } from '@/types/database'

export default function BreakingNewsTicker() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch('/api/articles?breaking=true&limit=8')
      .then((r) => r.json())
      .then((data) => setArticles(data.articles ?? []))
      .catch(() => {})
  }, [])

  if (!articles.length) return null

  const items = [...articles, ...articles]

  return (
    <div className="bg-red-600 text-white relative z-40">
      <div className="max-w-[1400px] mx-auto flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-red-700 font-bold text-sm tracking-wider uppercase border-r border-red-500">
          <AlertCircle size={14} className="animate-pulse" />
          Breaking
        </div>

        {/* Ticker */}
        <div className="ticker-wrap flex-1 py-2 overflow-hidden">
          <div className="ticker-content whitespace-nowrap">
            {items.map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/article/${article.slug}`}
                className="inline-block mx-6 text-sm hover:underline opacity-90 hover:opacity-100 transition-opacity"
              >
                <span className="mr-2 opacity-60">•</span>
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

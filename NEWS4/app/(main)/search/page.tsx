import type { Metadata } from 'next'
import { Suspense } from 'react'
import { searchArticles } from '@/lib/queries'
import SearchClient from './SearchClient'
import ArticleCard from '@/components/news/ArticleCard'
import SkeletonCard from '@/components/news/SkeletonCard'

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q}` : 'Search News',
    description: q ? `NEWS4 search results for "${q}"` : 'Search for news articles on NEWS4',
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, category } = await searchParams
  const results = q ? await searchArticles(q, category) : []

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <SearchClient initialQuery={q ?? ''} initialCategory={category ?? ''} />

      {q && (
        <div className="mt-6">
          <p className="text-sm text-[var(--muted-fg)] mb-5">
            {results.length} result{results.length !== 1 ? 's' : ''} for <strong className="text-[var(--foreground)]">&ldquo;{q}&rdquo;</strong>
            {category && <> in <strong>{category}</strong></>}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🔍</span>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No results found</h2>
              <p className="text-[var(--muted-fg)]">Try different keywords or browse by category.</p>
            </div>
          )}
        </div>
      )}

      {!q && (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🔎</span>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Search NEWS4</h2>
          <p className="text-[var(--muted-fg)]">Enter a keyword, topic, country, or category above to find news articles.</p>
        </div>
      )}
    </div>
  )
}

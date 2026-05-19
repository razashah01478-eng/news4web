import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { TrendingUp, Zap, Clock, ArrowRight, Globe } from 'lucide-react'
import { getArticles } from '@/lib/queries'
import ArticleCard from '@/components/news/ArticleCard'
import SkeletonCard from '@/components/news/SkeletonCard'
import NewsletterSignup from '@/components/news/NewsletterSignup'
import { CATEGORIES, timeAgo } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'NEWS4 — AI-Powered Global News',
  description: 'Breaking news, in-depth analysis, and AI-powered journalism from around the world.',
}

export const revalidate = 300

export default async function HomePage() {
  const [featured, trending, latest] = await Promise.all([
    getArticles({ featured: true, limit: 5 }),
    getArticles({ trending: true, limit: 8 }),
    getArticles({ limit: 18 }),
  ])

  const hero = featured[0]
  const heroSecondary = featured.slice(1, 3)
  const heroSmall = featured.slice(3, 5)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main hero */}
          {hero && (
            <div className="lg:col-span-7">
              <Suspense fallback={<SkeletonCard variant="featured" />}>
                <ArticleCard article={hero} variant="featured" className="h-full min-h-[420px]" />
              </Suspense>
            </div>
          )}

          {/* Secondary heroes */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {heroSecondary.map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" className="min-h-[196px]" />
            ))}
            {heroSmall.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#0ea5e9]/5 dark:bg-[#0ea5e9]/10 border-y border-[#0ea5e9]/20">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-sm">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[var(--muted-fg)]">Live Coverage Active</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-[var(--muted-fg)]">
              <Globe size={14} className="text-[#0ea5e9]" />
              <span>190+ countries covered</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-[var(--muted-fg)]">
              <Zap size={14} className="text-yellow-500" />
              <span>AI-powered summaries</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-[var(--muted-fg)]">
              <Clock size={14} className="text-[#0ea5e9]" />
              <span>Updated every 10 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending + Sidebar layout */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">

          {/* Main content */}
          <div>
            {/* Trending section */}
            {trending.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-orange-500 rounded-full" />
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <TrendingUp size={18} className="text-orange-500" />
                      Trending Now
                    </h2>
                  </div>
                  <Link href="/search?filter=trending" className="text-sm text-[#0ea5e9] hover:underline flex items-center gap-1">
                    See all <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trending.slice(0, 4).map((article, i) => (
                    <div key={article.id} className="relative">
                      <span className="absolute -top-2 -left-2 z-10 w-7 h-7 bg-[#0ea5e9] text-white text-xs font-black rounded-full flex items-center justify-center shadow">
                        {i + 1}
                      </span>
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Latest news */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-[#0ea5e9] rounded-full" />
                  <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Clock size={18} className="text-[#0ea5e9]" />
                    Latest News
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {latest.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Categories widget */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
              <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#0ea5e9] rounded-full" />
                Browse by Category
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border-color)] hover:border-[#0ea5e9]/40 hover:bg-[var(--muted-color)] transition-all group"
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[#0ea5e9] transition-colors truncate">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending sidebar */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
              <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-500 rounded-full" />
                Most Read Today
              </h3>
              <div className="space-y-3">
                {trending.slice(4, 8).map((article, i) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.slug}`}
                    className="flex gap-3 group"
                  >
                    <span className="flex-shrink-0 text-2xl font-black text-[var(--muted-fg)]/30 w-6 leading-none mt-0.5">
                      {i + 5}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)] line-clamp-2 group-hover:text-[#0ea5e9] transition-colors leading-snug">
                        {article.title}
                      </p>
                      <p className="text-xs text-[var(--muted-fg)] mt-1">{timeAgo(article.published_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <NewsletterSignup />
          </aside>
        </div>
      </div>

      {/* Category rows */}
      <CategoryRows />
    </div>
  )
}

async function CategoryRows() {
  const cats = [
    { slug: 'technology', label: 'Technology' },
    { slug: 'science', label: 'Science & Discoveries' },
    { slug: 'sports', label: 'Sports' },
    { slug: 'entertainment', label: 'Entertainment' },
  ]

  const results = await Promise.all(
    cats.map((c) => getArticles({ category: c.slug, limit: 4 }))
  )

  return (
    <div className="max-w-[1400px] mx-auto px-4 pb-12 space-y-10">
      {cats.map((cat, i) => {
        const articles = results[i]
        if (!articles.length) return null
        return (
          <section key={cat.slug}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: CATEGORIES.find((c) => c.slug === cat.slug)?.color }} />
                {cat.label}
              </h2>
              <Link href={`/category/${cat.slug}`} className="text-sm text-[#0ea5e9] hover:underline flex items-center gap-1">
                More <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getArticles } from '@/lib/queries'
import { getCategoryIcon } from '@/lib/utils'
import ArticleCard from '@/components/news/ArticleCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = await getCategoryBySlug(slug)
  if (!cat) return { title: 'Category Not Found' }
  return {
    title: `${cat.name} News`,
    description: cat.description || `Latest ${cat.name} news from around the world.`,
  }
}

export const revalidate = 300

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [category, articles] = await Promise.all([
    getCategoryBySlug(slug),
    getArticles({ category: slug, limit: 24 }),
  ])

  if (!category) notFound()

  const icon = getCategoryIcon(slug)
  const featured = articles.filter((a) => a.is_featured || a.is_trending).slice(0, 3)
  const rest = articles.filter((a) => !featured.includes(a))

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 mb-8 text-white"
        style={{ backgroundColor: category.color }}
      >
        <div className="absolute -top-8 -right-8 text-9xl opacity-20 select-none">{icon}</div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{icon}</span>
            <h1 className="text-3xl font-black">{category.name}</h1>
          </div>
          <p className="text-white/80 max-w-xl">{category.description}</p>
          <p className="text-white/60 text-sm mt-2">{category.article_count} articles</p>
        </div>
      </div>

      {/* Featured in category */}
      {featured.length > 0 && (
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {featured.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant={i === 0 ? 'featured' : 'featured'}
                className={i === 0 ? 'lg:col-span-2 min-h-[320px]' : 'min-h-[240px]'}
              />
            ))}
          </div>
        </section>
      )}

      {/* All articles */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">{icon}</span>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No articles yet</h2>
            <p className="text-[var(--muted-fg)]">Check back soon for the latest {category.name.toLowerCase()} news.</p>
          </div>
        )}
      </section>
    </div>
  )
}

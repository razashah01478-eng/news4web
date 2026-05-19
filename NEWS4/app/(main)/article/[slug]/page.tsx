import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Eye, User, Globe, Tag, ArrowLeft, Share2 } from 'lucide-react'
import { getArticleBySlug, getRelatedArticles } from '@/lib/queries'
import { timeAgo, formatDate, getReadingTime, getCategoryColor, getCategoryIcon } from '@/lib/utils'
import ArticleCard from '@/components/news/ArticleCard'
import NewsletterSignup from '@/components/news/NewsletterSignup'
import CommentsSection from '@/components/news/CommentsSection'
import { createServerSupabase } from '@/lib/supabase'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.seo_description || article.excerpt,
      images: article.image_url ? [{ url: article.image_url }] : [],
      type: 'article',
      publishedTime: article.published_at,
      authors: article.author ? [article.author] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.seo_description || article.excerpt,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

export const revalidate = 600

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.id, article.category_slug)
  const categoryColor = getCategoryColor(article.category_slug)
  const categoryIcon = getCategoryIcon(article.category_slug)

  // Increment views (fire and forget)
  const supabase = createServerSupabase()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(supabase.rpc as any)('increment_article_views', { article_slug: slug }).then(() => {}).catch(() => {})

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image_url || undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author ? { '@type': 'Person', name: article.author } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'NEWS4',
      url: 'https://news4.vercel.app',
    },
    keywords: article.ai_tags?.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
          {/* Article */}
          <article className="min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--muted-fg)] mb-4">
              <Link href="/" className="hover:text-[#0ea5e9] transition-colors flex items-center gap-1">
                <ArrowLeft size={14} />Home
              </Link>
              <span>/</span>
              <Link href={`/category/${article.category_slug}`} className="hover:text-[#0ea5e9] transition-colors capitalize">
                {article.category_slug}
              </Link>
            </div>

            {/* Category + Breaking badges */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Link
                href={`/category/${article.category_slug}`}
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {categoryIcon} {article.category_slug}
              </Link>
              {article.is_breaking && (
                <span className="text-xs font-bold bg-red-500 text-white px-3 py-1.5 rounded-full animate-pulse">
                  BREAKING NEWS
                </span>
              )}
              {article.is_trending && (
                <span className="text-xs font-bold bg-orange-500 text-white px-3 py-1.5 rounded-full">
                  🔥 TRENDING
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[var(--muted-fg)] leading-relaxed mb-5 border-l-4 pl-4" style={{ borderColor: categoryColor }}>
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-fg)] mb-6 pb-6 border-b border-[var(--border-color)]">
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-[#0ea5e9]" />
                  <span className="font-medium text-[var(--foreground)]">{article.author}</span>
                </span>
              )}
              {article.source_name && (
                <span className="flex items-center gap-1.5">
                  <Globe size={14} className="text-[#0ea5e9]" />
                  <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#0ea5e9] transition-colors">
                    {article.source_name}
                  </a>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#0ea5e9]" />
                <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                <span className="text-[var(--muted-fg)]/60">({timeAgo(article.published_at)})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                {article.view_count.toLocaleString()} views
              </span>
              <span className="text-[var(--muted-fg)]/60">{getReadingTime(article.content || article.excerpt)}</span>
            </div>

            {/* Image */}
            {article.image_url && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-[var(--muted-color)]">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* AI Summary */}
            {article.ai_summary && (
              <div className="bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-2 text-[#0ea5e9] font-semibold text-sm">
                  <span className="text-lg">✦</span> AI Summary
                </div>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">{article.ai_summary}</p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {(article.content || article.excerpt).split('\n\n').map((para, i) => (
                <p key={i} className="text-[var(--foreground)] leading-[1.8] mb-5 text-base sm:text-lg">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            {article.ai_tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pt-4 border-t border-[var(--border-color)]">
                <span className="flex items-center gap-1 text-xs text-[var(--muted-fg)]">
                  <Tag size={12} /> Tags:
                </span>
                {article.ai_tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 bg-[var(--muted-color)] text-[var(--muted-fg)] hover:bg-[#0ea5e9]/10 hover:text-[#0ea5e9] text-xs rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium text-[var(--muted-fg)]">Share:</span>
              <ShareButtons title={article.title} slug={article.slug} />
            </div>

            {/* Comments */}
            <CommentsSection articleId={article.id} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-[calc(var(--navbar-height)+80px)]">
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 mb-5">
                <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2 text-sm">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: categoryColor }} />
                  More in {article.category_slug}
                </h3>
                <div className="space-y-3">
                  {related.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} variant="horizontal" />
                  ))}
                </div>
              </div>
              <NewsletterSignup />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://news4.vercel.app/article/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
      >
        𝕏
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
      >
        f
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
      >
        in
      </a>
      <CopyButton url={url} />
    </div>
  )
}

function CopyButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(url).then(() => {})}
      className="w-8 h-8 rounded-full bg-[var(--muted-color)] text-[var(--muted-fg)] flex items-center justify-center hover:bg-[var(--border-color)] transition-colors"
      title="Copy link"
    >
      <Share2 size={12} />
    </button>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, Bookmark, BookmarkCheck, Share2, Eye } from 'lucide-react'
import { timeAgo, getCategoryColor, getCategoryIcon, cn } from '@/lib/utils'
import type { Article } from '@/types/database'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface Props {
  article: Article
  variant?: 'default' | 'compact' | 'featured' | 'horizontal'
  className?: string
}

export default function ArticleCard({ article, variant = 'default', className }: Props) {
  const [bookmarked, setBookmarked] = useState(false)
  const categoryColor = getCategoryColor(article.category_slug)
  const categoryIcon = getCategoryIcon(article.category_slug)

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { toast.error('Sign in to bookmark articles'); return }

    if (bookmarked) {
      await supabase.from('bookmarks').delete().match({ user_id: user.id, article_id: article.id })
      setBookmarked(false)
      toast.success('Removed from bookmarks')
    } else {
      await supabase.from('bookmarks').insert({ user_id: user.id, article_id: article.id })
      setBookmarked(true)
      toast.success('Saved to bookmarks')
    }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/article/${article.slug}`
    if (navigator.share) {
      await navigator.share({ title: article.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied!')
    }
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`} className={cn('group flex gap-3 news-card p-3', className)}>
        <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--muted-color)]">
          {article.image_url && (
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="96px"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-semibold" style={{ color: categoryColor }}>
              {categoryIcon} {article.category_slug}
            </span>
            {article.is_breaking && (
              <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">LIVE</span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 leading-snug group-hover:text-[#0ea5e9] transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-[var(--muted-fg)] mt-1 flex items-center gap-1">
            <Clock size={10} />
            {timeAgo(article.published_at)}
          </p>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/article/${article.slug}`} className={cn('group block', className)}>
        <div className="flex gap-2">
          <div className="w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: categoryColor }} />
          <div>
            <h3 className="text-sm font-medium text-[var(--foreground)] line-clamp-2 group-hover:text-[#0ea5e9] transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-[var(--muted-fg)] mt-1 flex items-center gap-1">
              <Clock size={10} />
              {timeAgo(article.published_at)}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={`/article/${article.slug}`} className={cn('group relative block rounded-2xl overflow-hidden aspect-[16/9]', className)}>
        <div className="absolute inset-0 bg-[var(--muted-color)]">
          {article.image_url && (
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryIcon} {article.category_slug}
            </span>
            {article.is_breaking && (
              <span className="text-xs font-bold bg-red-500 text-white px-2.5 py-1 rounded-full animate-pulse">
                BREAKING
              </span>
            )}
          </div>
          <h2 className="text-white font-bold text-xl leading-snug line-clamp-2 group-hover:text-[#7dd3fc] transition-colors">
            {article.title}
          </h2>
          <p className="text-white/70 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center gap-3 mt-3 text-white/60 text-xs">
            <span className="flex items-center gap-1"><Clock size={11} />{timeAgo(article.published_at)}</span>
            <span>{article.source_name}</span>
            <span className="flex items-center gap-1"><Eye size={11} />{article.view_count}</span>
          </div>
        </div>
      </Link>
    )
  }

  // Default card
  return (
    <article className={cn('news-card group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden', className)}>
      <Link href={`/article/${article.slug}`}>
        <div className="relative aspect-[16/10] bg-[var(--muted-color)] overflow-hidden">
          {article.image_url ? (
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              {categoryIcon}
            </div>
          )}
          {article.is_breaking && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-bold bg-red-500 text-white px-2.5 py-1 rounded-full animate-pulse">
                BREAKING
              </span>
            </div>
          )}
          {article.is_trending && !article.is_breaking && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-1 rounded-full">
                🔥 TRENDING
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Link
            href={`/category/${article.category_slug}`}
            className="text-xs font-bold uppercase tracking-wider hover:underline"
            style={{ color: categoryColor }}
          >
            {categoryIcon} {article.category_slug}
          </Link>
          <span className="text-xs text-[var(--muted-fg)] flex items-center gap-1">
            <Clock size={10} />
            {timeAgo(article.published_at)}
          </span>
        </div>

        <Link href={`/article/${article.slug}`}>
          <h2 className="font-bold text-[var(--foreground)] leading-snug line-clamp-2 group-hover:text-[#0ea5e9] transition-colors mb-2">
            {article.title}
          </h2>
        </Link>

        <p className="text-sm text-[var(--muted-fg)] line-clamp-2 mb-3 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-[var(--muted-fg)]">
            {article.source_name && <span className="font-medium">{article.source_name}</span>}
            {article.author && <span> · {article.author}</span>}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-[var(--muted-color)] text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-all"
              title="Share"
            >
              <Share2 size={14} />
            </button>
            <button
              onClick={handleBookmark}
              className="p-1.5 rounded-lg hover:bg-[var(--muted-color)] transition-all"
              style={{ color: bookmarked ? '#0ea5e9' : 'var(--muted-fg)' }}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

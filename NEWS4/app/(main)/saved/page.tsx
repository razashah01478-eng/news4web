'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bookmark } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ArticleCard from '@/components/news/ArticleCard'
import SkeletonCard from '@/components/news/SkeletonCard'
import type { Article } from '@/types/database'

export default function SavedPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data } = await supabase
        .from('bookmarks')
        .select('*, article:articles(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) {
        setArticles(data.map((b: Record<string, unknown>) => b.article as Article).filter(Boolean))
      }
      setLoading(false)
    }
    load()
  }, [router])

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
        <Bookmark size={22} className="text-[#0ea5e9]" />
        Saved Articles
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark size={48} className="mx-auto mb-4 text-[var(--muted-fg)] opacity-30" />
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No saved articles</h2>
          <p className="text-[var(--muted-fg)]">Bookmark articles to read them later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

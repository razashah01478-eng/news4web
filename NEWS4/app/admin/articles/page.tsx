import { createServerSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Eye, CreditCard as Edit, Trash2, CircleAlert as AlertCircle, TrendingUp, Star } from 'lucide-react'
import { timeAgo, getCategoryIcon } from '@/lib/utils'
import AdminArticleActions from './AdminArticleActions'

export const revalidate = 30

export default async function AdminArticlesPage() {
  const supabase = createServerSupabase()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(50)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Articles</h1>
          <p className="text-sm text-[var(--muted-fg)] mt-0.5">{articles?.length ?? 0} articles total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#0ea5e9] text-white font-semibold text-sm rounded-xl hover:bg-[#0284c7] transition-all"
        >
          <Plus size={16} />
          Add Article
        </Link>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--muted-color)]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Article</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Views</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Published</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {(articles ?? []).map((article) => (
                <tr key={article.id} className="hover:bg-[var(--muted-color)]/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-[var(--foreground)] line-clamp-1 max-w-xs">{article.title}</p>
                    <p className="text-xs text-[var(--muted-fg)] mt-0.5">{article.source_name}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs capitalize text-[var(--muted-fg)]">
                      {getCategoryIcon(article.category_slug)} {article.category_slug}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 flex-wrap">
                      {article.is_breaking && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded-full">
                          <AlertCircle size={9} />Breaking
                        </span>
                      )}
                      {article.is_trending && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded-full">
                          <TrendingUp size={9} />Trending
                        </span>
                      )}
                      {article.is_featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-full">
                          <Star size={9} />Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 text-xs text-[var(--muted-fg)]">
                      <Eye size={11} />{article.view_count}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[var(--muted-fg)]">
                    {timeAgo(article.published_at)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <AdminArticleActions articleId={article.id} articleSlug={article.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

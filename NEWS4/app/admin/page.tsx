import { createServerSupabase } from '@/lib/supabase'
import { FileText, Users, Mail, TrendingUp, Eye, Tag, CircleAlert as AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

export default async function AdminDashboard() {
  const supabase = createServerSupabase()

  const [
    { count: articleCount },
    { count: userCount },
    { count: subscriberCount },
    { count: breakingCount },
    { data: recentArticles },
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('users_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_breaking', true),
    supabase.from('articles').select('id, title, category_slug, view_count, published_at, is_breaking').order('published_at', { ascending: false }).limit(8),
  ])

  const stats = [
    { label: 'Total Articles', value: articleCount ?? 0, icon: FileText, color: '#0ea5e9', href: '/admin/articles' },
    { label: 'Active Users', value: userCount ?? 0, icon: Users, color: '#22c55e', href: '/admin/users' },
    { label: 'Subscribers', value: subscriberCount ?? 0, icon: Mail, color: '#f59e0b', href: '/admin/newsletter' },
    { label: 'Breaking News', value: breakingCount ?? 0, icon: AlertCircle, color: '#ef4444', href: '/admin/articles' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
        <p className="text-[var(--muted-fg)] text-sm mt-1">NEWS4 administration panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 hover:border-[#0ea5e9]/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <TrendingUp size={14} className="text-green-500 opacity-60" />
            </div>
            <div className="text-2xl font-black text-[var(--foreground)]">{value.toLocaleString()}</div>
            <div className="text-sm text-[var(--muted-fg)] mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      {/* Recent articles */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
          <h2 className="font-bold text-[var(--foreground)]">Recent Articles</h2>
          <Link href="/admin/articles" className="text-sm text-[#0ea5e9] hover:underline">Manage all</Link>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {(recentArticles ?? []).map((article) => (
            <div key={article.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--muted-color)]/50 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">{article.title}</p>
                <p className="text-xs text-[var(--muted-fg)] mt-0.5 capitalize">{article.category_slug}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                {article.is_breaking && (
                  <span className="text-xs font-bold bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Breaking</span>
                )}
                <span className="flex items-center gap-1 text-xs text-[var(--muted-fg)]">
                  <Eye size={12} />{article.view_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

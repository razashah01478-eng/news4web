import { createServerSupabase } from '@/lib/supabase'
import { Tag } from 'lucide-react'

export const revalidate = 60

export default async function AdminCategoriesPage() {
  const supabase = createServerSupabase()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
        <Tag size={22} className="text-[#0ea5e9]" />
        Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(categories ?? []).map((cat) => (
          <div key={cat.id} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
              style={{ backgroundColor: `${cat.color}20` }}
            >
              {cat.icon || '📰'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[var(--foreground)]">{cat.name}</h3>
              <p className="text-xs text-[var(--muted-fg)] mt-0.5 line-clamp-1">{cat.description}</p>
              <p className="text-xs font-semibold mt-2" style={{ color: cat.color }}>
                {cat.article_count} articles
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

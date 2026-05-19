'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Category } from '@/types/database'

export default function NewArticlePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    source_name: '',
    source_url: '',
    author: '',
    category_slug: 'world',
    country: '',
    is_breaking: false,
    is_featured: false,
    is_trending: false,
  })
  const router = useRouter()

  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => setCategories(data ?? []))
  }, [])

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const toggle = (k: string) => () => setForm((f) => ({ ...f, [k]: !f[k as keyof typeof f] }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setLoading(true)

    const slug = slugify(form.title) + '-' + Date.now()
    const urlHash = 'manual-' + Date.now()
    const catId = categories.find((c) => c.slug === form.category_slug)?.id

    const { error } = await supabase.from('articles').insert({
      ...form,
      slug,
      url_hash: urlHash,
      category_id: catId ?? null,
      ai_tags: [],
      ai_summary: form.excerpt,
      seo_description: form.excerpt,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Article created!')
      router.push('/admin/articles')
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/articles" className="p-1.5 rounded-lg hover:bg-[var(--muted-color)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-bold text-[var(--foreground)]">New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={update('title')}
            required
            placeholder="Article headline..."
            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Category</label>
            <select
              value={form.category_slug}
              onChange={update('category_slug')}
              className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors"
            >
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Country</label>
            <input
              type="text"
              value={form.country}
              onChange={update('country')}
              placeholder="e.g. US, UK, FR"
              className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={update('excerpt')}
            rows={2}
            placeholder="Brief summary..."
            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Content</label>
          <textarea
            value={form.content}
            onChange={update('content')}
            rows={8}
            placeholder="Full article content..."
            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Image URL</label>
          <input
            type="url"
            value={form.image_url}
            onChange={update('image_url')}
            placeholder="https://images.pexels.com/..."
            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Source Name</label>
            <input type="text" value={form.source_name} onChange={update('source_name')} placeholder="Reuters"
              className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Author</label>
            <input type="text" value={form.author} onChange={update('author')} placeholder="John Doe"
              className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0ea5e9]/50 transition-colors" />
          </div>
        </div>

        {/* Flags */}
        <div className="flex gap-6">
          {[
            { key: 'is_breaking', label: 'Breaking News' },
            { key: 'is_featured', label: 'Featured' },
            { key: 'is_trending', label: 'Trending' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={toggle(key)}
                className={`w-10 h-6 rounded-full transition-colors ${form[key as keyof typeof form] ? 'bg-[#0ea5e9]' : 'bg-[var(--muted-color)]'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full m-1 transition-transform ${form[key as keyof typeof form] ? 'translate-x-4' : ''}`} />
              </div>
              <span className="text-sm text-[var(--foreground)]">{label}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0ea5e9] text-white font-semibold rounded-xl hover:bg-[#0284c7] transition-all disabled:opacity-60"
          >
            <Save size={15} />
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>
          <Link href="/admin/articles" className="px-5 py-2.5 border border-[var(--border-color)] rounded-xl text-sm font-medium hover:bg-[var(--muted-color)] transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

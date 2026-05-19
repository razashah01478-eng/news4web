'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CreditCard as Edit, Trash2, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function AdminArticleActions({ articleId, articleSlug }: { articleId: string; articleSlug: string }) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Delete this article? This cannot be undone.')) return
    setDeleting(true)
    const { error } = await supabase.from('articles').delete().eq('id', articleId)
    if (error) {
      toast.error('Failed to delete article')
    } else {
      toast.success('Article deleted')
      router.refresh()
    }
    setDeleting(false)
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/article/${articleSlug}`}
        target="_blank"
        className="p-1.5 rounded-lg hover:bg-[var(--muted-color)] text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-all"
        title="View"
      >
        <ExternalLink size={14} />
      </Link>
      <Link
        href={`/admin/articles/${articleId}/edit`}
        className="p-1.5 rounded-lg hover:bg-[var(--muted-color)] text-[var(--muted-fg)] hover:text-[#0ea5e9] transition-all"
        title="Edit"
      >
        <Edit size={14} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-[var(--muted-fg)] hover:text-red-500 transition-all disabled:opacity-50"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

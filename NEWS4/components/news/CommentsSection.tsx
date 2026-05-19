'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { timeAgo } from '@/lib/utils'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Comment {
  id: string
  content: string
  created_at: string
  user: { username: string | null; full_name: string; avatar_url: string } | null
}

export default function CommentsSection({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    fetchComments()
  }, [articleId])

  async function fetchComments() {
    setFetching(true)
    try {
      const res = await fetch(`/api/comments?article_id=${articleId}`)
      const data = await res.json()
      setComments(data.comments ?? [])
    } finally {
      setFetching(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return
    if (!user) { toast.error('Sign in to comment'); return }

    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ article_id: articleId, content: newComment.trim() }),
      })
      if (res.ok) {
        setNewComment('')
        toast.success('Comment posted!')
        fetchComments()
      } else {
        const data = await res.json()
        toast.error(data.error ?? 'Failed to post comment')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-[var(--border-color)] pt-8">
      <h3 className="text-lg font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
        <MessageCircle size={18} className="text-[#0ea5e9]" />
        Comments ({comments.length})
      </h3>

      {/* Comment form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white text-sm font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                maxLength={2000}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)] outline-none focus:border-[#0ea5e9]/50 transition-colors resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[var(--muted-fg)]">{newComment.length}/2000</span>
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#0ea5e9] text-white text-sm font-semibold rounded-lg hover:bg-[#0284c7] transition-all disabled:opacity-50"
                >
                  <Send size={14} />
                  {loading ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-[var(--muted-color)] rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-[var(--muted-fg)] mb-2">Sign in to join the conversation</p>
          <Link href="/login" className="text-sm font-semibold text-[#0ea5e9] hover:underline">
            Sign In to Comment
          </Link>
        </div>
      )}

      {/* Comments list */}
      {fetching ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="skeleton w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="skeleton h-3 w-28 mb-2 rounded" />
                <div className="skeleton h-12 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-[var(--muted-fg)]">
          <MessageCircle size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[var(--muted-color)] flex items-center justify-center text-[var(--muted-fg)] text-sm font-bold">
                {comment.user?.full_name?.[0] || comment.user?.username?.[0] || 'U'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    {comment.user?.full_name || comment.user?.username || 'Anonymous'}
                  </span>
                  <span className="text-xs text-[var(--muted-fg)]">{timeAgo(comment.created_at)}</span>
                </div>
                <p className="text-sm text-[var(--foreground)] leading-relaxed bg-[var(--muted-color)] rounded-xl px-4 py-3">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

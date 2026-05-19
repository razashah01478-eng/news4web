'use client'

import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Successfully subscribed!')
        setEmail('')
      } else {
        toast.error(data.error ?? 'Subscription failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] p-8 text-white">
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/10 rounded-full" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Mail size={16} />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider opacity-90">Newsletter</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 leading-tight">
          Stay informed with NEWS4
        </h3>
        <p className="text-white/80 text-sm mb-5">
          Get the most important stories delivered to your inbox every morning.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 min-w-0 bg-white/20 border border-white/30 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/60 outline-none focus:bg-white/30 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-[#0ea5e9] font-bold text-sm rounded-lg hover:bg-white/90 transition-all flex-shrink-0 disabled:opacity-60"
          >
            {loading ? 'Subscribing...' : <><span>Subscribe</span><ArrowRight size={14} /></>}
          </button>
        </form>
        <p className="text-xs text-white/60 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}

'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { Mail, MessageSquare, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success('Message sent! We\'ll respond within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-[var(--foreground)] mb-2">Contact Us</h1>
        <p className="text-[var(--muted-fg)]">Have a tip, question, or feedback? We&apos;d love to hear from you.</p>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={update('name')}
                required
                placeholder="Your name"
                className="w-full bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)] outline-none focus:border-[#0ea5e9]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                required
                placeholder="your@email.com"
                className="w-full bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)] outline-none focus:border-[#0ea5e9]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Subject</label>
            <select
              value={form.subject}
              onChange={update('subject')}
              required
              className="w-full bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[#0ea5e9]/50 transition-colors"
            >
              <option value="">Select a subject</option>
              <option value="tip">News Tip</option>
              <option value="correction">Correction Request</option>
              <option value="advertise">Advertising Inquiry</option>
              <option value="technical">Technical Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={update('message')}
              required
              rows={5}
              placeholder="Write your message here..."
              className="w-full bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)] outline-none focus:border-[#0ea5e9]/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0ea5e9] text-white font-bold rounded-xl hover:bg-[#0284c7] transition-all disabled:opacity-60"
          >
            <Send size={16} />
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 flex items-start gap-3">
          <Mail size={20} className="text-[#0ea5e9] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1">Editorial</h3>
            <p className="text-xs text-[var(--muted-fg)]">news@news4.com</p>
          </div>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 flex items-start gap-3">
          <MessageSquare size={20} className="text-[#0ea5e9] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1">Advertising</h3>
            <p className="text-xs text-[var(--muted-fg)]">ads@news4.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

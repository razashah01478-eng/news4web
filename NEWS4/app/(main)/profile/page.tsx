'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Save, Camera } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/types/database'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [form, setForm] = useState({ full_name: '', username: '', bio: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from('users_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (data) {
        const profile = data as UserProfile
        setProfile(profile)
        setForm({ full_name: profile.full_name, username: profile.username ?? '', bio: profile.bio })
      }
      setFetching(false)
    }
    load()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('users_profiles')
      .upsert({ id: user.id, ...form, updated_at: new Date().toISOString() })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Profile updated!')
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-4">
          <div className="skeleton h-8 w-48 rounded" />
          <div className="skeleton h-32 w-full rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
        <User size={22} className="text-[#0ea5e9]" />
        My Profile
      </h1>

      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-8">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-[#0ea5e9] flex items-center justify-center text-white text-3xl font-black">
              {form.full_name?.[0] || profile?.username?.[0] || 'U'}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[var(--foreground)] text-lg">{form.full_name || 'Your Name'}</h2>
            <p className="text-sm text-[var(--muted-fg)]">@{form.username || 'username'}</p>
            {profile?.role && (
              <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 bg-[#0ea5e9]/10 text-[#0ea5e9] rounded-full capitalize">
                {profile.role}
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                placeholder="John Doe"
                className="w-full bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[#0ea5e9]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                placeholder="johndoe"
                className="w-full bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[#0ea5e9]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[#0ea5e9]/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0ea5e9] text-white font-semibold rounded-xl hover:bg-[#0284c7] transition-all disabled:opacity-60"
          >
            <Save size={15} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

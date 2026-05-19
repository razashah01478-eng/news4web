'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', full_name: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (error) {
      toast.error(error.message)
    } else if (data.user) {
      // Create user profile
      await supabase.from('users_profiles').upsert({
        id: data.user.id,
        full_name: form.full_name,
        username: form.email.split('@')[0],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
      toast.success('Account created! Welcome to NEWS4.')
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">Create account</h1>
        <p className="text-[var(--muted-fg)] text-sm mb-6">Join NEWS4 for personalized news</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Full Name</label>
            <div className="flex items-center gap-3 bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 focus-within:border-[#0ea5e9]/60 transition-colors">
              <User size={16} className="text-[var(--muted-fg)]" />
              <input
                type="text"
                value={form.full_name}
                onChange={update('full_name')}
                placeholder="John Doe"
                className="flex-1 bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email</label>
            <div className="flex items-center gap-3 bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 focus-within:border-[#0ea5e9]/60 transition-colors">
              <Mail size={16} className="text-[var(--muted-fg)]" />
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                required
                placeholder="you@example.com"
                className="flex-1 bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Password</label>
            <div className="flex items-center gap-3 bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 focus-within:border-[#0ea5e9]/60 transition-colors">
              <Lock size={16} className="text-[var(--muted-fg)]" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={update('password')}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="flex-1 bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)]"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0ea5e9] text-white font-bold rounded-xl hover:bg-[#0284c7] transition-all disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--muted-fg)] mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0ea5e9] font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

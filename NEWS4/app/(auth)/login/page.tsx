'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Welcome back!')
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">Welcome back</h1>
        <p className="text-[var(--muted-fg)] text-sm mb-6">Sign in to your NEWS4 account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email</label>
            <div className="flex items-center gap-3 bg-[var(--muted-color)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 focus-within:border-[#0ea5e9]/60 transition-colors">
              <Mail size={16} className="text-[var(--muted-fg)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--muted-fg)] mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#0ea5e9] font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}

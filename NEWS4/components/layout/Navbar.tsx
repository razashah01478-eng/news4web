'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Moon, Sun, Bell, User, Bookmark, ChevronDown, Globe } from 'lucide-react'
import { CATEGORIES } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('news4-dark')
    const isDark = saved === 'true'
    setDark(isDark)
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    setMobileOpen(false)
    setCategoriesOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('news4-dark', String(next))
    document.documentElement.classList.toggle('dark', next)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const mainLinks = [
    { label: 'Home', href: '/' },
    { label: 'World', href: '/category/world' },
    { label: 'Politics', href: '/category/politics' },
    { label: 'Technology', href: '/category/technology' },
    { label: 'Business', href: '/category/business' },
    { label: 'Sports', href: '/category/sports' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#0a0f1e]/95 backdrop-blur-xl shadow-sm border-b border-[var(--border-color)]'
            : 'bg-transparent'
        }`}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-[var(--foreground)]">
              NEWS<span className="text-[#0ea5e9]">4</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 ml-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-[#0ea5e9] bg-[#0ea5e9]/10'
                    : 'text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--muted-color)]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* More categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--muted-color)] transition-all"
              >
                More <ChevronDown size={14} className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[var(--background)] border border-[var(--border-color)] rounded-xl shadow-2xl p-2 grid grid-cols-2 gap-1"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--muted-color)] transition-colors"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <span>{cat.icon}</span>
                        <span className="font-medium text-[var(--foreground)]">{cat.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--muted-color)] transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--muted-color)] transition-all"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User actions */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--muted-color)] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white text-xs font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[var(--background)] border border-[var(--border-color)] rounded-xl shadow-2xl p-1.5"
                    >
                      <div className="px-3 py-2 border-b border-[var(--border-color)] mb-1">
                        <p className="text-xs text-[var(--muted-fg)] truncate">{user.email}</p>
                      </div>
                      <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--muted-color)] transition-colors">
                        <User size={14} /> Profile
                      </Link>
                      <Link href="/saved" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--muted-color)] transition-colors">
                        <Bookmark size={14} /> Saved Articles
                      </Link>
                      <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors">
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0ea5e9] text-white text-sm font-semibold rounded-lg hover:bg-[#0284c7] transition-all"
              >
                <User size={14} /> Sign In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--muted-color)] transition-all"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <form onSubmit={handleSearch} className="flex items-center gap-3 bg-[var(--background)] rounded-2xl border border-[var(--border-color)] shadow-2xl px-4 py-3">
                <Search size={20} className="text-[var(--muted-fg)] flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search news, topics, countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[var(--foreground)] text-lg placeholder:text-[var(--muted-fg)]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--muted-color)] transition-colors"
                >
                  <X size={16} className="text-[var(--muted-fg)]" />
                </button>
              </form>
              <div className="flex gap-2 mt-3 flex-wrap">
                {['Ukraine', 'AI', 'Climate', 'Markets', 'Mars', 'Elections'].map((term) => (
                  <button
                    key={term}
                    onClick={() => { setSearchQuery(term); router.push(`/search?q=${encodeURIComponent(term)}`); setSearchOpen(false) }}
                    className="px-3 py-1.5 bg-white/10 dark:bg-white/5 text-white text-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: 'var(--navbar-height)' }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--background)] border-l border-[var(--border-color)] overflow-y-auto p-4">
              <div className="space-y-1">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-[#0ea5e9]/10 text-[#0ea5e9]'
                        : 'hover:bg-[var(--muted-color)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-[var(--border-color)] mt-3">
                  <p className="px-3 py-1 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Categories</p>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--muted-color)] transition-colors"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
                {!user && (
                  <div className="pt-3 border-t border-[var(--border-color)] mt-3">
                    <Link href="/login" className="block w-full text-center px-4 py-2.5 bg-[#0ea5e9] text-white rounded-lg font-semibold text-sm">
                      Sign In
                    </Link>
                    <Link href="/register" className="block w-full text-center px-4 py-2.5 border border-[var(--border-color)] rounded-lg font-semibold text-sm mt-2">
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div style={{ height: 'var(--navbar-height)' }} />
    </>
  )
}

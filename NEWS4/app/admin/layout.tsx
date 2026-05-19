import Link from 'next/link'
import { Globe, LayoutDashboard, FileText, Tag, Users, Mail, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'Categories', href: '/admin/categories', icon: Tag },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-[#0a0f1e] text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
              <Globe size={15} />
            </div>
            <span className="font-black">NEWS<span className="text-[#0ea5e9]">4</span> Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <LogOut size={16} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-[var(--background)] overflow-auto">
        {children}
      </main>
    </div>
  )
}

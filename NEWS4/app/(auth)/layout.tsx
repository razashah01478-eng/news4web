import Link from 'next/link'
import { Globe } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--muted-color)] px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 bg-[#0ea5e9] rounded-xl flex items-center justify-center">
          <Globe size={20} className="text-white" />
        </div>
        <span className="text-2xl font-black text-[var(--foreground)]">
          NEWS<span className="text-[#0ea5e9]">4</span>
        </span>
      </Link>
      {children}
    </div>
  )
}

import Link from 'next/link'
import { Globe } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--background)]">
      <div className="text-center">
        <div className="w-16 h-16 bg-[#0ea5e9] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Globe size={32} className="text-white" />
        </div>
        <h1 className="text-8xl font-black text-[#0ea5e9] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Page Not Found</h2>
        <p className="text-[var(--muted-fg)] mb-8 max-w-sm">
          The article or page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex items-center gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#0ea5e9] text-white font-semibold rounded-xl hover:bg-[#0284c7] transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/search"
            className="px-5 py-2.5 border border-[var(--border-color)] rounded-xl font-semibold text-sm hover:bg-[var(--muted-color)] transition-colors"
          >
            Search News
          </Link>
        </div>
      </div>
    </div>
  )
}

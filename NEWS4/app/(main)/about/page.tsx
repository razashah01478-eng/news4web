import type { Metadata } from 'next'
import { Globe, Zap, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About NEWS4',
  description: 'Learn about NEWS4 — the AI-powered global news platform.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#0ea5e9] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Globe size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-black text-[var(--foreground)] mb-3">
          About NEWS<span className="text-[#0ea5e9]">4</span>
        </h1>
        <p className="text-lg text-[var(--muted-fg)] max-w-2xl mx-auto">
          The world&apos;s most advanced AI-powered news platform, delivering breaking news and in-depth analysis from every corner of the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Zap, title: 'AI-Powered', desc: 'Every article is enhanced with AI summaries, smart tags, and SEO optimization for a better reading experience.', color: '#f59e0b' },
          { icon: Globe, title: 'Global Coverage', desc: 'We cover news from 190+ countries across 13 categories, ensuring you never miss what matters.', color: '#0ea5e9' },
          { icon: Shield, title: 'Trusted Sources', desc: 'All our news comes from verified sources including Reuters, AP, BBC, and leading global outlets.', color: '#22c55e' },
          { icon: Users, title: 'Community', desc: 'Join millions of readers who rely on NEWS4 for accurate, unbiased, and timely journalism.', color: '#ec4899' },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}20` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">{title}</h3>
            <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-white/90 leading-relaxed max-w-2xl mx-auto">
          To democratize access to accurate, timely, and comprehensive news from around the world. We believe an informed public is the foundation of a healthy democracy and a connected global community.
        </p>
      </div>
    </div>
  )
}

import { createServerSupabase } from '@/lib/supabase'
import { Mail, Users, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

export default async function AdminNewsletterPage() {
  const supabase = createServerSupabase()
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })
    .limit(100)

  const activeCount = subscribers?.filter((s) => s.is_active).length ?? 0

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Newsletter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5">
          <div className="w-9 h-9 bg-[#0ea5e9]/10 rounded-xl flex items-center justify-center mb-3">
            <Users size={18} className="text-[#0ea5e9]" />
          </div>
          <div className="text-2xl font-black text-[var(--foreground)]">{activeCount}</div>
          <div className="text-sm text-[var(--muted-fg)]">Active Subscribers</div>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5">
          <div className="w-9 h-9 bg-green-500/10 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-green-500" />
          </div>
          <div className="text-2xl font-black text-[var(--foreground)]">{subscribers?.length ?? 0}</div>
          <div className="text-sm text-[var(--muted-fg)]">Total Signups</div>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5">
          <div className="w-9 h-9 bg-orange-500/10 rounded-xl flex items-center justify-center mb-3">
            <Mail size={18} className="text-orange-500" />
          </div>
          <div className="text-2xl font-black text-[var(--foreground)]">{(subscribers?.length ?? 0) - activeCount}</div>
          <div className="text-sm text-[var(--muted-fg)]">Unsubscribed</div>
        </div>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border-color)]">
          <h2 className="font-bold text-[var(--foreground)]">Subscribers</h2>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {(subscribers ?? []).map((sub) => (
            <div key={sub.id} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] text-xs font-bold">
                  {sub.email[0].toUpperCase()}
                </div>
                <span className="text-sm text-[var(--foreground)]">{sub.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sub.is_active ? 'bg-green-500/10 text-green-500' : 'bg-[var(--muted-color)] text-[var(--muted-fg)]'}`}>
                  {sub.is_active ? 'Active' : 'Unsubscribed'}
                </span>
                <span className="text-xs text-[var(--muted-fg)]">{formatDate(sub.subscribed_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

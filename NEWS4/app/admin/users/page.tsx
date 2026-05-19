import { createServerSupabase } from '@/lib/supabase'
import { Users } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

export default async function AdminUsersPage() {
  const supabase = createServerSupabase()
  const { data: users } = await supabase
    .from('users_profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
        <Users size={22} className="text-[#0ea5e9]" />
        Users ({users?.length ?? 0})
      </h1>

      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--muted-color)]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Username</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {(users ?? []).map((user) => (
                <tr key={user.id} className="hover:bg-[var(--muted-color)]/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white text-xs font-bold">
                        {user.full_name?.[0] || user.username?.[0] || 'U'}
                      </div>
                      <span className="text-sm font-medium text-[var(--foreground)]">{user.full_name || 'Unnamed User'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-[var(--muted-fg)]">@{user.username || '—'}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-red-500/10 text-red-500' :
                      user.role === 'editor' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-[var(--muted-color)] text-[var(--muted-fg)]'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[var(--muted-fg)]">{formatDate(user.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

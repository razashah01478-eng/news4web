export default function SkeletonCard({ variant = 'default' }: { variant?: 'default' | 'horizontal' | 'featured' }) {
  if (variant === 'horizontal') {
    return (
      <div className="flex gap-3 p-3 rounded-xl border border-[var(--border-color)]">
        <div className="skeleton w-24 h-20 flex-shrink-0 rounded-lg" />
        <div className="flex-1">
          <div className="skeleton h-3 w-16 mb-2 rounded" />
          <div className="skeleton h-4 w-full mb-1.5 rounded" />
          <div className="skeleton h-4 w-3/4 mb-2 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="skeleton rounded-2xl aspect-[16/9]" />
    )
  }

  return (
    <div className="rounded-xl border border-[var(--border-color)] overflow-hidden bg-[var(--card-bg)]">
      <div className="skeleton aspect-[16/10]" />
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
        <div className="skeleton h-5 w-full mb-1.5 rounded" />
        <div className="skeleton h-5 w-4/5 mb-3 rounded" />
        <div className="skeleton h-3 w-full mb-1 rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
    </div>
  )
}

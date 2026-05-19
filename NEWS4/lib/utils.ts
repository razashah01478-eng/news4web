import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatDate(date: string) {
  return format(new Date(date), 'MMMM d, yyyy')
}

export function formatDateShort(date: string) {
  return format(new Date(date), 'MMM d, yyyy')
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

export function getReadingTime(content: string) {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export const CATEGORIES = [
  { name: 'Politics', slug: 'politics', icon: '🏛️', color: '#ef4444' },
  { name: 'World', slug: 'world', icon: '🌍', color: '#3b82f6' },
  { name: 'Wars & Conflicts', slug: 'wars-conflicts', icon: '⚔️', color: '#dc2626' },
  { name: 'Crime', slug: 'crime', icon: '⚖️', color: '#7c3aed' },
  { name: 'Accidents', slug: 'accidents', icon: '⚠️', color: '#f59e0b' },
  { name: 'Diseases', slug: 'diseases', icon: '🦠', color: '#10b981' },
  { name: 'Science', slug: 'science', icon: '🔬', color: '#06b6d4' },
  { name: 'Discoveries', slug: 'discoveries', icon: '🔭', color: '#8b5cf6' },
  { name: 'Technology', slug: 'technology', icon: '💻', color: '#0ea5e9' },
  { name: 'Business', slug: 'business', icon: '📈', color: '#f97316' },
  { name: 'Sports', slug: 'sports', icon: '🏆', color: '#22c55e' },
  { name: 'Entertainment', slug: 'entertainment', icon: '🎬', color: '#ec4899' },
  { name: 'Health', slug: 'health', icon: '❤️', color: '#14b8a6' },
]

export function getCategoryColor(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.color ?? '#0ea5e9'
}

export function getCategoryIcon(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.icon ?? '📰'
}

import { createServerSupabase } from './supabase'
import type { Article, Category } from '@/types/database'

export async function getArticles({
  limit = 20,
  offset = 0,
  category,
  country,
  trending,
  breaking,
  featured,
}: {
  limit?: number
  offset?: number
  category?: string
  country?: string
  trending?: boolean
  breaking?: boolean
  featured?: boolean
} = {}) {
  const supabase = createServerSupabase()
  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) query = query.eq('category_slug', category)
  if (country) query = query.eq('country', country)
  if (trending) query = query.eq('is_trending', true)
  if (breaking) query = query.eq('is_breaking', true)
  if (featured) query = query.eq('is_featured', true)

  const { data, error } = await query
  if (error) throw error
  return data as Article[]
}

export async function getArticleBySlug(slug: string) {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data as Article | null
}

export async function getCategories() {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data as Category[]
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data as Category | null
}

export async function searchArticles(query: string, category?: string) {
  const supabase = createServerSupabase()
  let dbQuery = supabase
    .from('articles')
    .select('*')
    .textSearch('search_vector', query, { type: 'websearch' })
    .order('published_at', { ascending: false })
    .limit(20)

  if (category) dbQuery = dbQuery.eq('category_slug', category)

  const { data, error } = await dbQuery
  if (error) {
    // Fallback to ilike if full-text search fails
    let fallback = supabase
      .from('articles')
      .select('*')
      .ilike('title', `%${query}%`)
      .order('published_at', { ascending: false })
      .limit(20)
    if (category) fallback = fallback.eq('category_slug', category)
    const { data: d2 } = await fallback
    return (d2 ?? []) as Article[]
  }
  return (data ?? []) as Article[]
}

export async function getRelatedArticles(articleId: string, categorySlug: string) {
  const supabase = createServerSupabase()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('category_slug', categorySlug)
    .neq('id', articleId)
    .order('published_at', { ascending: false })
    .limit(4)

  return (data ?? []) as Article[]
}

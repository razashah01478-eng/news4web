import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  const category = searchParams.get('category') ?? undefined
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50)

  if (!q) {
    return NextResponse.json({ articles: [] })
  }

  const supabase = createServerSupabase()

  // Try full-text search first
  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (category) query = query.eq('category_slug', category)

  const { data, error } = await query.textSearch('search_vector', q, { type: 'websearch' })

  if (error || !data?.length) {
    // Fallback to title ilike
    let fallbackQuery = supabase
      .from('articles')
      .select('*')
      .ilike('title', `%${q}%`)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (category) fallbackQuery = fallbackQuery.eq('category_slug', category)
    const { data: fallbackData } = await fallbackQuery
    return NextResponse.json({ articles: fallbackData ?? [] })
  }

  return NextResponse.json({ articles: data })
}

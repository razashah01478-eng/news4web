import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50)
  const offset = parseInt(searchParams.get('offset') ?? '0')
  const category = searchParams.get('category') ?? undefined
  const country = searchParams.get('country') ?? undefined
  const breaking = searchParams.get('breaking') === 'true'
  const trending = searchParams.get('trending') === 'true'
  const featured = searchParams.get('featured') === 'true'

  const supabase = createServerSupabase()
  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) query = query.eq('category_slug', category)
  if (country) query = query.eq('country', country)
  if (breaking) query = query.eq('is_breaking', true)
  if (trending) query = query.eq('is_trending', true)
  if (featured) query = query.eq('is_featured', true)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    { articles: data, total: count },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  )
}

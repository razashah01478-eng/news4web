import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const articleId = searchParams.get('article_id')
  if (!articleId) return NextResponse.json({ error: 'Missing article_id' }, { status: 400 })

  const supabase = createServerSupabase()
  const { data } = await supabase
    .from('comments')
    .select('*, user:users_profiles(username, full_name, avatar_url)')
    .eq('article_id', articleId)
    .eq('is_approved', true)
    .order('created_at', { ascending: true })

  return NextResponse.json({ comments: data ?? [] })
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser(auth.replace('Bearer ', ''))
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const content = body?.content?.trim()
  const article_id = body?.article_id

  if (!content || content.length < 1 || content.length > 2000) {
    return NextResponse.json({ error: 'Comment must be 1-2000 characters' }, { status: 400 })
  }
  if (!article_id) return NextResponse.json({ error: 'Missing article_id' }, { status: 400 })

  const { data, error } = await supabase
    .from('comments')
    .insert({ article_id, user_id: user.id, content })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comment: data })
}

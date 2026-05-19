export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: Article
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'search_vector'>
        Update: Partial<Omit<Article, 'id' | 'created_at' | 'search_vector'>>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
      }
      bookmarks: {
        Row: Bookmark
        Insert: Omit<Bookmark, 'id' | 'created_at'>
        Update: Partial<Omit<Bookmark, 'id' | 'created_at'>>
      }
      comments: {
        Row: Comment
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Comment, 'id' | 'created_at'>>
      }
      users_profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id' | 'created_at'>>
      }
      newsletter_subscribers: {
        Row: NewsletterSubscriber
        Insert: Omit<NewsletterSubscriber, 'id' | 'subscribed_at'>
        Update: Partial<Omit<NewsletterSubscriber, 'id' | 'subscribed_at'>>
      }
      tags: {
        Row: Tag
        Insert: Omit<Tag, 'id' | 'created_at'>
        Update: Partial<Omit<Tag, 'id' | 'created_at'>>
      }
    }
    Functions: {
      increment_article_views: {
        Args: { article_slug: string }
        Returns: void
      }
    }
  }
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  source_name: string
  source_url: string
  author: string
  category_id: string | null
  category_slug: string
  country: string
  language: string
  is_breaking: boolean
  is_featured: boolean
  is_trending: boolean
  view_count: number
  ai_summary: string
  ai_tags: string[]
  seo_description: string
  url_hash: string
  published_at: string
  created_at: string
  updated_at: string
  search_vector?: unknown
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  article_count: number
  created_at: string
}

export interface Bookmark {
  id: string
  user_id: string
  article_id: string
  created_at: string
}

export interface Comment {
  id: string
  article_id: string
  user_id: string
  content: string
  is_approved: boolean
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  username: string | null
  full_name: string
  avatar_url: string
  bio: string
  role: 'user' | 'editor' | 'admin'
  preferences: {
    darkMode: boolean
    notifications: boolean
    newsletter: boolean
  }
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

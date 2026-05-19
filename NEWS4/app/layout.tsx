import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://news4.vercel.app'),
  title: {
    default: 'NEWS4 — AI-Powered Global News',
    template: '%s | NEWS4',
  },
  description:
    'NEWS4 delivers breaking news, in-depth analysis, and AI-powered journalism from around the world. Stay informed with real-time coverage of politics, technology, business, sports, and more.',
  keywords: ['news', 'breaking news', 'world news', 'AI news', 'global news', 'live news'],
  authors: [{ name: 'NEWS4' }],
  creator: 'NEWS4',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://news4.vercel.app',
    siteName: 'NEWS4',
    title: 'NEWS4 — AI-Powered Global News',
    description: 'Breaking news, in-depth analysis, and AI-powered journalism from around the world.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NEWS4' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEWS4 — AI-Powered Global News',
    description: 'Breaking news, in-depth analysis, and AI-powered journalism.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              background: 'var(--card-bg)',
              color: 'var(--foreground)',
              border: '1px solid var(--border-color)',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}

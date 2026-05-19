import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/profile/', '/saved/'],
      },
    ],
    sitemap: 'https://news4.vercel.app/sitemap.xml',
  }
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'NEWS4 Privacy Policy — How we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[var(--foreground)] mb-2">Privacy Policy</h1>
      <p className="text-[var(--muted-fg)] text-sm mb-8">Last updated: January 1, 2026</p>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        {[
          {
            title: '1. Information We Collect',
            body: 'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or comment on articles. This includes email addresses, names, and preferences. We also collect usage data including pages visited, articles read, and search queries to improve our service.',
          },
          {
            title: '2. How We Use Your Information',
            body: 'We use your information to provide, maintain, and improve NEWS4, send you news updates and newsletters (with your consent), personalize your news feed, and communicate with you about your account. We do not sell your personal information to third parties.',
          },
          {
            title: '3. Data Security',
            body: 'We implement industry-standard security measures including encryption, secure data storage, and access controls to protect your personal information. All data is stored on secure servers and we regularly review our security practices.',
          },
          {
            title: '4. Cookies',
            body: 'NEWS4 uses cookies to remember your preferences (such as dark mode), analyze site traffic, and improve user experience. You can disable cookies in your browser settings, though this may affect some features.',
          },
          {
            title: '5. Third-Party Services',
            body: 'We use third-party services including Supabase for data storage and authentication. These services have their own privacy policies and we encourage you to review them.',
          },
          {
            title: '6. Your Rights',
            body: 'You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at privacy@news4.com. Users in the EU have additional rights under GDPR.',
          },
          {
            title: '7. Contact',
            body: 'For privacy-related questions, contact our Data Protection Officer at privacy@news4.com.',
          },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">{title}</h2>
            <p className="text-[var(--muted-fg)] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

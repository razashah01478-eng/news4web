import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'NEWS4 Terms of Service.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[var(--foreground)] mb-2">Terms of Service</h1>
      <p className="text-[var(--muted-fg)] text-sm mb-8">Last updated: January 1, 2026</p>

      <div className="space-y-8">
        {[
          { title: '1. Acceptance of Terms', body: 'By accessing and using NEWS4, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.' },
          { title: '2. Use of Service', body: 'NEWS4 provides a news aggregation and publishing platform. You may use the service for personal, non-commercial purposes. You agree not to engage in any activity that interferes with or disrupts the service.' },
          { title: '3. User Accounts', body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate information when creating an account.' },
          { title: '4. Content', body: 'News content on NEWS4 is sourced from third-party publishers. We do not endorse, guarantee, or take responsibility for the accuracy of third-party content. User-generated content (comments) must comply with our community guidelines.' },
          { title: '5. Intellectual Property', body: 'The NEWS4 name, logo, and platform design are the intellectual property of NEWS4. Original content created by our editorial team is protected by copyright. Third-party news content is owned by the respective publishers.' },
          { title: '6. Limitation of Liability', body: 'NEWS4 is provided "as is" without warranties of any kind. We are not liable for any damages resulting from your use of the service, including indirect, incidental, or consequential damages.' },
          { title: '7. Changes to Terms', body: 'We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.' },
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

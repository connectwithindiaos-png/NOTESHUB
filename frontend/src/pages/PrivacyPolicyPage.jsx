import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl } from '../utils/canonicalUrl'

const sections = [
  {
    title: 'information we collect',
    content: 'We collect minimal information needed to provide our service. This includes anonymous usage data through cookies and analytics to help us improve the platform. We do not require registration or personal information to access notes.',
  },
  {
    title: 'how we use your information',
    content: 'Usage data helps us understand which notes and subjects are most popular, so we can prioritize content updates. We do not sell, rent, or share your personal information with third parties.',
  },
  {
    title: 'cookies',
    content: 'We use minimal cookies for basic functionality and anonymous analytics. You can disable cookies in your browser settings, though this may affect certain features like theme preferences.',
  },
  {
    title: 'third-party links',
    content: 'NotesHub may contain links to external websites (e.g., Telegram, WhatsApp). We are not responsible for the privacy practices of these external services.',
  },
  {
    title: 'data security',
    content: 'We implement reasonable security measures to protect your data. However, no online platform can guarantee absolute security. Use our services at your own discretion.',
  },
  {
    title: 'changes to this policy',
    content: 'We may update this privacy policy from time to time. Any changes will be posted on this page. Continued use of NotesHub after changes constitutes acceptance of the updated policy.',
  },
  {
    title: 'contact us',
    content: 'If you have questions about this privacy policy, please reach out to us on Telegram or email at hello@noteshub.com.',
  },
]

export default function PrivacyPolicyPage() {
  const canonical = getCanonicalUrl('/privacy-policy')

  return (
    <main>
      <MetaTags
        title="Privacy Policy - NotesHub"
        description="NotesHub privacy policy. Learn how we collect, use, and protect your information when you use our free engineering notes platform."
        keywords="noteshub privacy policy, privacy, data protection, noteshub"
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: 'Privacy Policy', url: canonical }
      ])]} />
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: canonical }]} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="bg-stone-50 dark:bg-stone-800 py-16 sm:py-20 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">privacy policy</p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight mb-4">
                your privacy matters
              </h1>
              <p className="font-sans text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
                last updated: january 2026
              </p>
            </motion.div>

            <div className="space-y-6">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-stone-700 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-600"
                >
                  <h2 className="font-serif text-base sm:text-lg text-amber-700 dark:text-amber-300 mb-2 lowercase">{section.title}</h2>
                  <p className="font-sans text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

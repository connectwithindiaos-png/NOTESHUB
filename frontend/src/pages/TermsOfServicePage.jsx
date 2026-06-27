import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl } from '../utils/canonicalUrl'

const sections = [
  {
    title: 'acceptance of terms',
    content: 'By accessing or using NotesHub, you agree to be bound by these terms of service. If you do not agree with any part of these terms, you should not use our platform.',
  },
  {
    title: 'use of content',
    content: 'All notes and study materials on NotesHub are provided for personal educational use only. You may download, print, and share notes with fellow students, but you may not sell, redistribute for profit, or claim ownership of any content from this platform.',
  },
  {
    title: 'user contributions',
    content: 'Users who contribute notes grant NotesHub a non-exclusive license to display, distribute, and modify the submitted content for educational purposes. Contributors retain ownership of their original work.',
  },
  {
    title: 'accuracy of content',
    content: 'While we strive to ensure all notes are accurate and up-to-date, NotesHub makes no guarantees about the completeness or accuracy of any study material. Notes are provided as-is for reference purposes.',
  },
  {
    title: 'prohibited conduct',
    content: 'Users agree not to: upload malicious content, attempt to disrupt platform services, scrape or mass-download content without authorization, or use the platform for any unlawful purpose.',
  },
  {
    title: 'intellectual property',
    content: 'The NotesHub name, logo, and brand assets are our intellectual property. The notes themselves may be sourced from various educational resources and are shared for educational purposes under fair use.',
  },
  {
    title: 'limitation of liability',
    content: 'NotesHub and its operators shall not be held liable for any damages arising from the use or inability to use the platform or its content. This includes, but is not limited to, exam performance or academic outcomes.',
  },
  {
    title: 'changes to terms',
    content: 'We reserve the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the platform after changes constitutes acceptance of the new terms.',
  },
  {
    title: 'contact',
    content: 'For questions about these terms, please contact us via Telegram or email at hello@noteshub.com.',
  },
]

export default function TermsOfServicePage() {
  const canonical = getCanonicalUrl('/terms-of-service')

  return (
    <main>
      <MetaTags
        title="Terms of Service - NotesHub"
        description="NotesHub terms of service. Understand the rules and guidelines for using our free engineering notes platform."
        keywords="noteshub terms of service, terms, conditions, noteshub guidelines"
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: 'Terms of Service', url: canonical }
      ])]} />
      <Breadcrumbs items={[{ name: 'Terms of Service', url: canonical }]} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="bg-stone-50 dark:bg-stone-800 py-16 sm:py-20 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">terms of service</p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight mb-4">
                how we roll
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

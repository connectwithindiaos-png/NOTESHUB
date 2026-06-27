import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl } from '../utils/canonicalUrl'
import { faqs } from '../data/faqs'

const categories = [
  { id: 'general', label: 'general' },
  { id: 'btech-cse', label: 'B.Tech CSE' },
  { id: 'bca', label: 'BCA' },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('general')
  const canonical = getCanonicalUrl('/faq')

  const allFAQs = faqs[activeCategory] || faqs.home

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <main>
      <MetaTags
        title="FAQ - NotesHub | Frequently Asked Questions"
        description="Find answers to frequently asked questions about NotesHub — how it works, which courses we cover, how to download notes, and more."
        keywords="noteshub faq, frequently asked questions, noteshub help, how to download notes, noteshub courses"
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: 'FAQ', url: canonical }
      ]), schema]} />
      <Breadcrumbs items={[{ name: 'FAQ', url: canonical }]} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="bg-stone-50 dark:bg-stone-800 py-16 sm:py-20 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">got questions?</p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight mb-4">
                we have answers.
              </h1>
              <p className="font-sans text-sm sm:text-base text-stone-500 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
                everything you need to know about NotesHub. cant find what you are looking for? reach out on telegram or email.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenIndex(null) }}
                  className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white dark:bg-stone-700 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-600 hover:border-amber-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <motion.div
              className="space-y-2"
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {allFAQs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <article
                    key={index}
                    className={`bg-white dark:bg-stone-700 rounded-xl border transition-all duration-200 ${
                      isOpen
                        ? 'border-rose-300 dark:border-rose-600 shadow-md'
                        : 'border-stone-200 dark:border-stone-600 hover:border-stone-300 dark:hover:border-stone-500'
                    }`}
                  >
                    <h3>
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-400 rounded-xl"
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif text-sm sm:text-base text-stone-800 dark:text-stone-200 pr-4">{faq.question}</span>
                        <svg
                          className={`flex-shrink-0 w-5 h-5 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-rose-500' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </h3>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                            <p className="font-sans text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                )
              })}
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}

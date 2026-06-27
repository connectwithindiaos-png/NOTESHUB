import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '../../data/faqs'
import SchemaMarkup from '../seo/SchemaMarkup'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const faqItems = faqs.home || []

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <SchemaMarkup schemas={[schema]} />
      <section
        className="py-20 sm:py-28 bg-stone-100 dark:bg-stone-700 rounded-2xl sm:rounded-3xl overflow-hidden"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">
              got questions?
            </p>
            <h2
              id="faq-heading"
              className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight lowercase"
            >
              curious? we have answers.
            </h2>
          </motion.div>

          <motion.div
            className="space-y-2"
            itemScope
            itemType="https://schema.org/FAQPage"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.08 }}
          >
            {faqItems.map((faq, index) => {
              const isOpen = openIndex === index
              const questionId = `faq-q-${index}`
              const answerId = `faq-a-${index}`

              return (
                <article
                  key={index}
                  className={`bg-white dark:bg-stone-800 rounded-xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-rose-300 dark:border-rose-600 shadow-md shadow-rose-200/20'
                      : 'border-stone-200 dark:border-stone-600 hover:border-stone-300 dark:hover:border-stone-500 hover:shadow-sm'
                  }`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3>
                    <button
                      id={questionId}
                      onClick={() => toggleFAQ(index)}
                      className={`w-full flex items-center justify-between px-6 py-4 sm:py-5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-400 rounded-xl ${
                        isOpen ? 'border-l-4 border-rose-400 rounded-l-md' : ''
                      }`}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="font-serif text-base sm:text-lg font-medium text-stone-800 dark:text-stone-200 pr-4" itemProp="name">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 w-6 h-6 relative">
                        <svg
                          className={`absolute inset-0 w-6 h-6 text-stone-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-90 opacity-0' : 'opacity-100'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <svg
                          className={`absolute inset-0 w-6 h-6 text-rose-500 transition-transform duration-300 ${
                            isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </div>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        key="answer"
                        role="region"
                        aria-labelledby={questionId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-6 pb-5 sm:pb-6"
                          itemScope
                          itemProp="acceptedAnswer"
                          itemType="https://schema.org/Answer"
                        >
                          <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed" itemProp="text">
                            {faq.answer}
                          </p>
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
    </>
  )
}

export function FAQSectionWrapper() {
  return (
    <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
      <FAQSection />
    </div>
  )
}

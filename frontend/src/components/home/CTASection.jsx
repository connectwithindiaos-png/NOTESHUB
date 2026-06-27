import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Call to action"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-amber-50 to-rose-400/20" aria-hidden="true" />

      <svg
        className="absolute top-0 left-0 w-64 h-64 text-amber-300/10"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <rect x="20" y="20" width="160" height="160" rx="16" stroke="currentColor" strokeWidth="2" />
        <path d="M60 100h80M100 60v80" stroke="currentColor" strokeWidth="2" />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-72 h-72 text-rose-300/10 -scale-x-100"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" />
        <path d="M60 100h80M100 60v80" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-amber-500/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h2
                className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to ace your exams?
              </motion.h2>
              <motion.p
                className="font-sans text-base sm:text-lg text-amber-100/80 leading-relaxed max-w-md mx-auto lg:mx-0 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join thousands of students who study smarter, not harder. All notes,
                all subjects, all free — forever.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-amber-800 font-semibold rounded-xl hover:bg-amber-50 transition-colors shadow-lg shadow-amber-900/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Browse Free Notes
                </Link>
                <p className="font-mono text-[10px] text-amber-200/60 uppercase tracking-wider mt-3">
                  join 10,000+ students
                </p>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-48 h-48 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-mono text-4xl font-bold text-white">10K</p>
                  <p className="font-mono text-[10px] text-amber-200 uppercase tracking-wider mt-1">students & counting</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-stone-900 to-transparent" aria-hidden="true" />
    </section>
  )
}

export function CTASectionWrapper() {
  return (
    <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
      <CTASection />
    </div>
  )
}

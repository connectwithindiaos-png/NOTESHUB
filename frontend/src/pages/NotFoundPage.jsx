import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl } from '../utils/canonicalUrl'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function NotFoundPage() {
  const canonical = getCanonicalUrl('/404')

  return (
    <main>
      <MetaTags
        title="Page Not Found - NotesHub"
        description="The page you are looking for does not exist. Browse our courses and find the study material you need."
        keywords="404, page not found, noteshub"
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: '404', url: canonical }
      ])]} />
      <Breadcrumbs items={[{ name: '404', url: canonical }]} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="min-h-[80vh] flex items-center bg-stone-50 dark:bg-stone-800 py-16 rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="not-found-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="lg:w-1/2 text-center lg:text-left" variants={itemVariants}>
              <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-4">
                error 404
              </p>
              <h1
                id="not-found-heading"
                className="font-serif text-8xl sm:text-9xl lg:text-[10rem] text-stone-200 dark:text-stone-600 leading-none mb-2"
              >
                404
              </h1>
              <p className="font-mono text-base sm:text-lg text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-6">
                page not found
              </p>
              <p className="font-sans text-base sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>

              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Go Home
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300 font-semibold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  Browse Courses
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            <motion.div className="lg:w-1/2 flex justify-center" variants={itemVariants}>
              <svg className="w-full max-w-sm" viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="200" cy="180" r="120" stroke="#d6d3d1" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                <circle cx="200" cy="180" r="85" stroke="#d6d3d1" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                <circle cx="200" cy="180" r="50" stroke="#d6d3d1" strokeWidth="1" fill="none" />

                <line x1="200" y1="60" x2="200" y2="300" stroke="#d6d3d1" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="80" y1="180" x2="320" y2="180" stroke="#d6d3d1" strokeWidth="1" strokeDasharray="4 4" />

                <path d="M170 130 L200 100 L230 130" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="200" y1="100" x2="200" y2="160" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="200" cy="175" r="4" fill="#f59e0b" />

                <path d="M140 220 Q200 180 260 220" stroke="#f43f5e" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M150 240 Q200 210 250 240" stroke="#f43f5e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />

                <text x="200" y="330" textAnchor="middle" fill="#a8a29e" fontSize="13" fontFamily="monospace">
                  lost? let's get you back.
                </text>

                <line x1="155" y1="327" x2="245" y2="327" stroke="#a8a29e" strokeWidth="0.5" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-stone-100 dark:bg-stone-700 rounded-full border border-stone-200 dark:border-stone-600">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
                did you know? NotesHub has <span className="text-amber-700 dark:text-amber-300 font-bold">500+ subjects</span> across <span className="text-rose-700 dark:text-rose-300 font-bold">10 courses</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </main>
  )
}

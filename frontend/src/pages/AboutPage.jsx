import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl } from '../utils/canonicalUrl'

const stats = [
  { label: 'courses', value: '10' },
  { label: 'subjects', value: '500+' },
  { label: 'notes', value: '2000+' },
  { label: 'students', value: '50k+' },
]

const values = [
  { title: 'free for everyone', desc: 'no paywalls, no subscriptions. every note, every resource — completely free, always.' },
  { title: 'built by students', desc: 'created by students who have been through the grind. we know exactly what you need.' },
  { title: 'always updated', desc: 'curriculum changes? we update. new topics added? we cover them. notes stay fresh.' },
  { title: 'community first', desc: 'a platform by the community, for the community. share, learn, and grow together.' },
]

export default function AboutPage() {
  const canonical = getCanonicalUrl('/about')

  return (
    <main>
      <MetaTags
        title="About Us - NotesHub"
        description="NotesHub is a free platform providing engineering and college notes for B.Tech, BCA, B.Sc CS students. Semester-wise study material, handwritten notes, and previous year papers."
        keywords="about noteshub, free engineering notes, about us, college notes platform"
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: 'About', url: canonical }
      ])]} />
      <Breadcrumbs items={[{ name: 'About', url: canonical }]} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="bg-stone-50 dark:bg-stone-800 py-16 sm:py-20 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">about us</p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight mb-4">
                education should be <span className="text-amber-600 dark:text-amber-400">free</span>, forever.
              </h1>
              <p className="font-sans text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
                NotesHub was born from a simple idea — every student deserves access to quality study material without spending a rupee.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-14"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center bg-white dark:bg-stone-700 rounded-2xl p-4 sm:p-6 border border-stone-200 dark:border-stone-600">
                  <p className="font-serif text-2xl sm:text-3xl text-amber-600 dark:text-amber-400 font-bold">{s.value}</p>
                  <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-stone dark:prose-invert max-w-none mb-14"
            >
              <div className="bg-white dark:bg-stone-700 rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-stone-600">
                <h2 className="font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 mb-4">our story</h2>
                <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                  NotesHub started as a small WhatsApp group where engineering students shared notes before exams. What began with a handful of PDFs and a shared Google Drive link has grown into a platform serving thousands of students every day.
                </p>
                <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                  We saw how expensive textbooks and coaching materials had become. Students were spending thousands on resources that should have been freely available. So we built NotesHub — a place where anyone can find semester-wise, subject-wise notes without signing up, without paying, without barriers.
                </p>
                <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                  Today, NotesHub covers 10 courses, 500+ subjects, and thousands of notes — all free, all curated, all actually useful. And we are just getting started.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 text-center mb-8">what we believe in</h2>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {values.map((v) => (
                  <div key={v.title} className="bg-white dark:bg-stone-700 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-600">
                    <h3 className="font-serif text-base sm:text-lg text-amber-700 dark:text-amber-300 mb-2 lowercase">{v.title}</h3>
                    <p className="font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-14 text-center"
            >
              <div className="bg-amber-100/60 dark:bg-amber-900/30 rounded-2xl p-6 sm:p-8 border border-amber-200 dark:border-amber-700">
                <p className="font-serif text-lg sm:text-xl text-stone-800 dark:text-stone-200 mb-4">ready to start learning?</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-colors"
                >
                  browse courses
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}

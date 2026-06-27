import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getCourseIcon } from '../utils/icons'
import { getAllCoursesSEO } from '../data/seoContent'
import { getCanonicalUrl, getCourseUrl } from '../utils/canonicalUrl'
import { courses as staticCourses } from '../data/courses'
import { fetchCourses } from '../utils/api'

const rotations = [-0.8, 0.6, -0.4, 1.0, -0.5, 0.3, -0.7, 0.9, -0.3, 0.5]

const cardColors = [
  { border: 'border-amber-200 dark:border-amber-700', hover: 'hover:border-amber-300 dark:hover:border-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', iconBg: 'bg-amber-100 dark:bg-amber-900/40' },
  { border: 'border-rose-200 dark:border-rose-700', hover: 'hover:border-rose-300 dark:hover:border-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-300', iconBg: 'bg-rose-100 dark:bg-rose-900/40' },
  { border: 'border-emerald-200 dark:border-emerald-700', hover: 'hover:border-emerald-300 dark:hover:border-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  { border: 'border-cyan-200 dark:border-cyan-700', hover: 'hover:border-cyan-300 dark:hover:border-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-300', iconBg: 'bg-cyan-100 dark:bg-cyan-900/40' },
  { border: 'border-stone-200 dark:border-stone-600', hover: 'hover:border-stone-300 dark:hover:border-stone-500', bg: 'bg-stone-50 dark:bg-stone-700', text: 'text-stone-700 dark:text-stone-300', iconBg: 'bg-stone-100 dark:bg-stone-600' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function CoursesPage() {
  const [courses, setCourses] = useState(staticCourses)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
      .then(data => setCourses(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const seo = getAllCoursesSEO()
  const canonical = getCanonicalUrl('/courses')

  const breadcrumbItems = [
    { name: 'All Courses', url: canonical }
  ]

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seo.title,
    description: seo.description
  }

  if (loading) {
    return (
      <main className="animate-pulse">
        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
          <section className="py-12 sm:py-16 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="mb-10 space-y-3">
                <div className="h-3 w-28 bg-stone-200 dark:bg-stone-700 rounded" />
                <div className="h-10 w-48 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                <div className="h-4 w-80 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="p-4 bg-stone-200/60 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600 rounded-xl space-y-3">
                    <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                    <div className="h-4 w-16 bg-stone-200 dark:bg-stone-700 rounded" />
                    <div className="h-3 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
                    <div className="flex gap-2">
                      <div className="h-5 w-14 bg-stone-200 dark:bg-stone-700 rounded-full" />
                      <div className="h-5 w-10 bg-stone-200 dark:bg-stone-700 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main>
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={canonical}
      />
      <SchemaMarkup schemas={[collectionSchema]} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="py-12 sm:py-16 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="courses-page-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">
              browse programs
            </p>
            <h1 id="courses-page-heading" className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 leading-tight mb-3">
              All Courses
            </h1>
            <p className="font-sans text-base text-stone-500 max-w-xl">
              Pick your course and access semester-wise notes, study materials, and more.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courses.map((course, index) => {
              const colors = cardColors[index % cardColors.length]
              const rot = rotations[index % rotations.length]

              return (
                <motion.div
                  key={course.slug}
                  variants={cardVariants}
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  <Link
                    to={getCourseUrl(course.slug)}
                    className={`block p-4 ${colors.bg} ${colors.border} ${colors.hover} border rounded-xl transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 h-full`}
                    aria-label={`View ${course.name} course`}
                  >
                    <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center mb-3`} aria-hidden="true">
                      {getCourseIcon(course.slug)}
                    </div>
                    <h2 className={`font-mono text-sm font-semibold ${colors.text} mb-1 leading-tight`}>
                      {course.name}
                    </h2>
                    <p className="font-sans text-[11px] text-stone-400 dark:text-stone-400 leading-tight line-clamp-2 mb-3">
                      {course.fullName}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-stone-400 px-2 py-0.5 rounded-full bg-white/60 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600">
                        {course.duration}
                      </span>
                      <span className={`font-mono text-[10px] ${colors.text.replace('text-', 'text-').replace('700', '500')}`}>
                        {course.totalSubjects} sub
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
      </div>
    </main>
  )
}

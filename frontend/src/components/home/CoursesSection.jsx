import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getCourseIcon } from '../../utils/icons'
import { courses as staticCourses } from '../../data/courses'
import { fetchCourses } from '../../utils/api'

function hashRotation(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return ((hash % 11) - 5) / 10
}

const accentColors = [
  { bg: 'bg-amber-100 dark:bg-amber-900/40', border: 'border-amber-300 dark:border-amber-600', text: 'text-amber-900 dark:text-amber-100', hover: 'hover:bg-amber-200 dark:hover:bg-amber-800/60', active: 'bg-amber-400' },
  { bg: 'bg-rose-100 dark:bg-rose-900/40', border: 'border-rose-300 dark:border-rose-600', text: 'text-rose-900 dark:text-rose-100', hover: 'hover:bg-rose-200 dark:hover:bg-rose-800/60', active: 'bg-rose-400' },
  { bg: 'bg-emerald-100 dark:bg-emerald-900/40', border: 'border-emerald-300 dark:border-emerald-600', text: 'text-emerald-900 dark:text-emerald-100', hover: 'hover:bg-emerald-200 dark:hover:bg-emerald-800/60', active: 'bg-emerald-400' },
  { bg: 'bg-cyan-100 dark:bg-cyan-900/40', border: 'border-cyan-300 dark:border-cyan-600', text: 'text-cyan-900 dark:text-cyan-100', hover: 'hover:bg-cyan-200 dark:hover:bg-cyan-800/60', active: 'bg-cyan-400' },
  { bg: 'bg-orange-100 dark:bg-orange-900/40', border: 'border-orange-300 dark:border-orange-600', text: 'text-orange-900 dark:text-orange-100', hover: 'hover:bg-orange-200 dark:hover:bg-orange-800/60', active: 'bg-orange-400' },
  { bg: 'bg-stone-100 dark:bg-stone-700', border: 'border-stone-300 dark:border-stone-600', text: 'text-stone-900 dark:text-stone-100', hover: 'hover:bg-stone-200 dark:hover:bg-stone-600', active: 'bg-stone-400' },
]

export default function CoursesSection() {
  const [courses, setCourses] = useState(staticCourses)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchCourses()
      .then(data => { setCourses(data); setSelected(null) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const active = selected ? courses.find((c) => c.slug === selected) : courses[0]
  const featured = courses

  useEffect(() => {
    if (featured.length > 0 && !selected) {
      setSelected(featured[0].slug)
    }
  }, [featured, selected])

  if (loading) {
    return (
      <section className="py-12 sm:py-20 lg:py-28 bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse" aria-label="Loading courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <div className="h-3 w-24 bg-stone-200 dark:bg-stone-700 rounded mb-3" />
            <div className="h-8 w-64 bg-stone-200 dark:bg-stone-700 rounded-lg mb-3" />
            <div className="h-4 w-96 bg-stone-200 dark:bg-stone-700 rounded" />
          </div>
          <div className="flex gap-3 mb-10">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className="h-8 w-24 bg-stone-200 dark:bg-stone-700 rounded-full" />
            ))}
          </div>
          <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600 p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                  <div className="h-6 w-40 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-stone-200 dark:bg-stone-700 rounded" />
                  <div className="h-3 w-3/4 bg-stone-200 dark:bg-stone-700 rounded" />
                  <div className="h-3 w-1/2 bg-stone-200 dark:bg-stone-700 rounded" />
                </div>
                <div className="flex gap-4">
                  <div className="h-6 w-24 bg-stone-200 dark:bg-stone-700 rounded-full" />
                  <div className="h-6 w-28 bg-stone-200 dark:bg-stone-700 rounded-full" />
                  <div className="h-6 w-32 bg-stone-200 dark:bg-stone-700 rounded-full" />
                </div>
                <div className="h-4 w-20 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
              <aside className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 p-5 space-y-3">
                  <div className="h-3 w-20 bg-stone-200 dark:bg-stone-700 rounded" />
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-3 w-full bg-stone-200 dark:bg-stone-700 rounded" />
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="courses-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-2xl mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[10px] sm:text-xs text-rose-500 uppercase tracking-[0.2em] mb-2 sm:mb-3">
            explore programs
          </p>
          <h2
            id="courses-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-stone-100 leading-tight mb-2 sm:mb-3"
          >
            Pick your path.
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed">
            From core engineering to specialized computing &mdash; find your course and dive in.
          </p>
        </motion.div>

        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-10 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin flex-nowrap sm:flex-wrap">
          {featured.map((course, i) => {
            const isSelected = selected === course.slug
            const colors = accentColors[i % accentColors.length]
            const rot = hashRotation(course.slug + 'pill')

            return (
              <motion.button
                key={course.slug}
                onClick={() => setSelected(course.slug)}
                layout
                className={`relative font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-stone-400 flex-shrink-0 ${
                  isSelected
                    ? `${colors.active} ${colors.text} ${colors.border} shadow-md`
                    : `${colors.bg} ${colors.text} ${colors.border} ${colors.hover} opacity-80 hover:opacity-100`
                }`}
                style={{ transform: 'rotate(' + rot + 'deg)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={isSelected}
                aria-label={`Select ${course.name}`}
              >
                <span className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 block flex-shrink-0" aria-hidden="true">{getCourseIcon(course.slug)}</span>
                {course.name}
              </motion.button>
            )
          })}
          <Link
            to="/courses"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border-2 border-dashed border-stone-300 dark:border-stone-600 text-stone-500 dark:text-stone-400 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors whitespace-nowrap flex-shrink-0"
          >
            View All &rarr;
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600 p-4 sm:p-8 lg:p-10 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 block flex-shrink-0" aria-hidden="true">{getCourseIcon(active.slug)}</span>
                    <h3 className="font-serif text-lg sm:text-2xl text-stone-900 dark:text-stone-100 truncate">{active.name}</h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-3 sm:mb-4">
                    {active.longDescription || active.description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-5">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {active.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {active.totalSubjects} subjects
                    </span>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      {active.totalSemesters} semesters
                    </span>
                  </div>
                  <Link
                    to={`/course/${active.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200 transition-colors group"
                  >
                    View Notes
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {active.brochurePoints && (
                  <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 p-4 sm:p-5">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2 sm:mb-3">Highlights</h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {active.brochurePoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-1.5 sm:gap-2 font-sans text-xs text-stone-600 dark:text-stone-300">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export function CoursesSectionWrapper() {
  return (
    <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
      <CoursesSection />
    </div>
  )
}

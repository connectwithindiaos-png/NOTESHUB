import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getCourseIcon } from '../utils/icons'
import { getCourseSEO } from '../data/seoContent'
import { universities } from '../data/universities'
import { getBreadcrumbSchema, getCourseSchema } from '../utils/schema'
import { getCanonicalUrl, getCourseUrl, getSemesterUrl } from '../utils/canonicalUrl'
import { getCourseBySlug, courses as allCourses } from '../data/courses'
import { fetchCourses, fetchCourseBySlug, fetchSemesters } from '../utils/api'

const cardColors = [
  { border: 'border-amber-200 dark:border-amber-700', hover: 'hover:border-amber-300 dark:hover:border-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  { border: 'border-rose-200 dark:border-rose-700', hover: 'hover:border-rose-300 dark:hover:border-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-300', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  { border: 'border-emerald-200 dark:border-emerald-700', hover: 'hover:border-emerald-300 dark:hover:border-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  { border: 'border-cyan-200 dark:border-cyan-700', hover: 'hover:border-cyan-300 dark:hover:border-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-300', badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200' },
]

const rotations = [-0.8, 0.6, -0.4, 1.0, -0.5, 0.3, -0.7, 0.9]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
}

export default function CoursePage() {
  const { courseSlug } = useParams()
  const [course, setCourse] = useState(null)
  const [relatedCourses, setRelatedCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedUni, setSelectedUni] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('noteshub-selected-uni')
    if (saved && universities.some(u => u.id === saved)) {
      setSelectedUni(saved)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchCourseBySlug(courseSlug)
      .then(apiCourse => {
        setCourse(apiCourse)
        fetchCourses()
          .then(all => setRelatedCourses(all.filter(c => c.slug !== courseSlug).slice(0, 4)))
          .catch(() => setRelatedCourses(allCourses.filter(c => c.slug !== courseSlug).slice(0, 4)))
        fetchSemesters(courseSlug)
          .then(sems => setCourse(prev => ({ ...prev, semesters: sems })))
          .catch(() => {})
      })
      .catch(() => {
        const courseData = getCourseBySlug(courseSlug)
        setCourse(courseData)
        if (courseData) {
          setRelatedCourses(allCourses.filter(c => c.slug !== courseSlug).slice(0, 4))
          fetchSemesters(courseSlug)
            .then(data => setCourse({ ...courseData, semesters: data }))
            .catch(() => {})
        }
      })
      .finally(() => setLoading(false))
  }, [courseSlug])

  const selectUniversity = (id) => {
    setSelectedUni(id)
    localStorage.setItem('noteshub-selected-uni', id)
  }

  const activeUni = universities.find(u => u.id === selectedUni)

  const seo = course ? getCourseSEO(courseSlug) : null

  if (loading) {
    return (
      <main className="animate-pulse">
        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
          <section className="py-8 sm:py-12 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-stone-200 dark:bg-stone-700 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-7 w-40 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                  <div className="h-4 w-64 bg-stone-200 dark:bg-stone-700 rounded" />
                </div>
              </div>
              <div className="bg-white dark:bg-stone-700 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-600 mb-6">
                <div className="h-3 w-48 bg-stone-200 dark:bg-stone-700 rounded mb-3" />
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-9 w-28 bg-stone-200 dark:bg-stone-700 rounded-xl" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 w-64 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="p-3 bg-stone-200/50 dark:bg-stone-700/50 border border-stone-200 dark:border-stone-600 rounded-lg space-y-2">
                      <div className="w-8 h-8 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                      <div className="h-4 w-20 bg-stone-200 dark:bg-stone-700 rounded" />
                      <div className="h-3 w-14 bg-stone-200 dark:bg-stone-700 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
          <section className="py-16 bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="h-6 w-40 bg-stone-200 dark:bg-stone-700 rounded-lg mb-8" />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex-shrink-0 w-64 p-5 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 space-y-3">
                    <div className="w-8 h-8 bg-stone-200 dark:bg-stone-700 rounded" />
                    <div className="h-5 w-24 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                    <div className="space-y-1">
                      <div className="h-3 w-full bg-stone-200 dark:bg-stone-700 rounded" />
                      <div className="h-3 w-3/4 bg-stone-200 dark:bg-stone-700 rounded" />
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

  if (!course) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-stone-50 dark:bg-stone-800">
        <div className="text-center px-6">
          <p className="font-serif text-6xl text-stone-200 dark:text-stone-600 mb-4">404</p>
          <h1 className="font-sans text-xl text-stone-700 dark:text-stone-300 mb-4">Course not found</h1>
          <p className="font-sans text-stone-500 dark:text-stone-400 mb-6">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors"
          >
            Browse all courses
          </Link>
        </div>
      </main>
    )
  }

  const semesters = course.semesters || []
  const canonical = getCanonicalUrl(getCourseUrl(courseSlug))

  const breadcrumbItems = [
    { name: 'Courses', url: getCanonicalUrl('/courses') },
    { name: course.name, url: canonical }
  ]

  const schemas = [
    getBreadcrumbSchema([
      { name: 'Home', url: getCanonicalUrl('/') },
      { name: 'Courses', url: getCanonicalUrl('/courses') },
      { name: course.name, url: canonical }
    ]),
    getCourseSchema({
      name: course.fullName,
      description: course.description,
      provider: 'NotesHub'
    })
  ]

  return (
    <main>
      <MetaTags
        title={seo?.title || `${course.name} Notes PDF Download`}
        description={seo?.description || course.description}
        keywords={seo?.keywords || ''}
        canonical={canonical}
      />
      <SchemaMarkup schemas={schemas} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="py-8 sm:py-12 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="course-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center p-2.5" aria-hidden="true">
                  {getCourseIcon(course.slug)}
                </span>
                <div>
                  <h1 id="course-heading" className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-tight">
                    {course.name}
                  </h1>
                  <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-0.5">{course.fullName}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-stone-700 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-600 mb-6">
                <p className="font-mono text-[10px] sm:text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">
                  step 1: select your university
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {universities.map((uni) => {
                    const isActive = selectedUni === uni.id
                    return (
                      <button
                        key={uni.id}
                        onClick={() => selectUniversity(uni.id)}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border transition-all text-xs sm:text-sm ${
                          isActive
                            ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                            : 'bg-stone-50 dark:bg-stone-600 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-500 hover:border-amber-300 dark:hover:border-amber-600'
                        }`}
                      >
                        <img
                          src={uni.image}
                          alt={uni.short}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-contain bg-white"
                        />
                        <span className="font-mono font-semibold">{uni.short}</span>
                      </button>
                    )
                  })}
                </div>
                {activeUni && (
                  <p className="font-sans text-xs text-emerald-600 dark:text-emerald-400 mt-3">
                    &#10003; studying at {activeUni.fullName}
                  </p>
                )}
              </div>
            </motion.div>

            {selectedUni && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 mb-4">
                  {activeUni.short} &mdash; choose semester
                </h2>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {semesters.map((semester, index) => {
                    const colors = cardColors[index % cardColors.length]
                    const rot = rotations[index % rotations.length]

                    return (
                      <motion.div
                        key={semester.slug}
                        variants={cardVariants}
                        style={{ transform: `rotate(${rot}deg)` }}
                      >
                        <Link
                          to={`${getSemesterUrl(courseSlug, semester.slug)}?uni=${selectedUni}`}
                          className={`block p-3 ${colors.bg} ${colors.border} ${colors.hover} border rounded-lg transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 h-full`}
                          aria-label={`Semester ${semester.semesterNumber}`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${colors.badge.split(' ')[0]} flex items-center justify-center mb-2`} aria-hidden="true">
                            <span className={`font-mono text-xs font-bold ${colors.text}`}>{semester.semesterNumber}</span>
                          </div>
                          <h3 className={`font-mono text-xs font-semibold ${colors.text} mb-1 leading-tight`}>
                            {semester.name || `Semester ${semester.semesterNumber}`}
                          </h3>
                          <span className={`font-mono text-[10px] ${colors.badge} px-1.5 py-0.5 rounded-full inline-block`}>
                            {semester.totalSubjects} sub
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      </div>

      {relatedCourses.length > 0 && (
        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="py-16 bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="related-courses-heading">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 id="related-courses-heading" className="font-serif text-2xl text-stone-900 dark:text-stone-100">Other Courses</h2>
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {relatedCourses.map((rc) => (
                <Link
                  key={rc.slug}
                  to={getCourseUrl(rc.slug)}
                  className="flex-shrink-0 w-64 p-5 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-md transition-all group focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label={`View ${rc.name} course`}
                >
                  <span className="w-8 h-8 block mb-2" aria-hidden="true">{getCourseIcon(rc.slug)}</span>
                  <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">{rc.name}</h3>
                  <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">{rc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        </div>
      )}
    </main>
  )
}

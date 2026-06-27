import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getSemesterSEO } from '../data/seoContent'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl, getCourseUrl, getSemesterUrl, getSubjectUrl } from '../utils/canonicalUrl'
import { getSemesterNumber, ordinalSuffix } from '../utils/slugs'
import { fetchCourseBySlug, fetchSubjects } from '../utils/api'

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
}

const subjectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function SemesterPage() {
  const { courseSlug, semesterSlug } = useParams()
  const semesterNumber = getSemesterNumber(semesterSlug)

  const [course, setCourse] = useState(null)
  const [semester, setSemester] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  const [expandedSubject, setExpandedSubject] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchCourseBySlug(courseSlug).catch(() => null),
      fetchSubjects(courseSlug, semesterNumber).catch(() => []),
    ])
      .then(([courseData, subjectsData]) => {
        setCourse(courseData)
        setSubjects(subjectsData)
        if (courseData) {
          const sem = (courseData.semesters || []).find(s => s.slug === semesterSlug)
          setSemester(sem || null)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [courseSlug, semesterSlug, semesterNumber])

  const toggleSubject = (slug) => {
    setExpandedSubject(prev => prev === slug ? null : slug)
  }

  if (loading) {
    return (
      <main className="animate-pulse">
        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
          <section className="py-12 sm:py-16 lg:py-20 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="max-w-3xl mb-12 space-y-3">
                <div className="h-3 w-48 bg-stone-200 dark:bg-stone-700 rounded" />
                <div className="h-10 w-64 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                <div className="h-4 w-96 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
              <div className="max-w-4xl space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-5 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-xl" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-4 w-40 bg-stone-200 dark:bg-stone-700 rounded" />
                        <div className="h-3 w-56 bg-stone-200 dark:bg-stone-700 rounded" />
                      </div>
                      <div className="h-6 w-6 bg-stone-200 dark:bg-stone-700 rounded-full" />
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

  if (!course || !semester) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-stone-50 dark:bg-stone-800">
        <div className="text-center px-6">
          <p className="font-serif text-6xl text-stone-200 dark:text-stone-600 mb-4">404</p>
          <h1 className="font-sans text-xl text-stone-700 dark:text-stone-300 mb-4">Semester not found</h1>
          <p className="font-sans text-stone-500 dark:text-stone-400 mb-6">The semester you&apos;re looking for doesn&apos;t exist.</p>
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

  const canonical = getCanonicalUrl(getSemesterUrl(courseSlug, semesterSlug))
  const ordinal = ordinalSuffix(semesterNumber)

  const breadcrumbItems = [
    { name: 'Courses', url: getCanonicalUrl('/courses') },
    { name: course.name, url: getCanonicalUrl(getCourseUrl(courseSlug)) },
    { name: `${ordinal} Semester`, url: canonical }
  ]

  const seoData = getSemesterSEO(courseSlug, semesterNumber)
  const seoTitle = seoData?.title || `${course.name} ${ordinal} Semester Notes PDF Download`
  const seoDesc = seoData?.description || `Download ${course.name} ${ordinal} Semester notes PDF for all subjects. Free study material for engineering students.`
  const seoContent = seoData?.content

  return (
    <main>
      <MetaTags
        title={seoTitle}
        description={seoDesc}
        keywords={seoData?.keywords || `${course.name} ${ordinal} semester notes, ${courseSlug} notes`}
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: 'Courses', url: getCanonicalUrl('/courses') },
        { name: course.name, url: getCanonicalUrl(getCourseUrl(courseSlug)) },
        { name: `${ordinal} Semester`, url: canonical }
      ])]} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="py-12 sm:py-16 lg:py-20 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="semester-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">
              {course.name} &mdash; {ordinal} Semester
            </p>
            <h1 id="semester-heading" className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 leading-tight mb-4">
              {ordinal} Semester
            </h1>
            <p className="font-sans text-lg text-stone-500 dark:text-stone-400 leading-relaxed">
              {semester.name} &mdash; {subjects.length} subjects with comprehensive study materials, notes, and exam preparation resources.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mb-16"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {subjects.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600">
                <svg className="w-12 h-12 mx-auto mb-4 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <h2 className="font-serif text-2xl text-stone-700 dark:text-stone-300 mb-2">No subjects yet</h2>
                <p className="font-sans text-stone-500 dark:text-stone-400">Subjects for this semester are being added. Check back soon!</p>
              </div>
            ) : (
              subjects.map((subject, index) => {
                const isExpanded = expandedSubject === subject.slug
                const isAmber = index % 4 === 0 || index % 4 === 2

                return (
                  <motion.div
                    key={subject.slug}
                    variants={subjectVariants}
                    className="mb-3"
                  >
                    <button
                      onClick={() => toggleSubject(subject.slug)}
                      className={`w-full flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border transition-all text-left focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                        isExpanded
                          ? (isAmber ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-600 shadow-sm' : 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-600 shadow-sm')
                          : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-600 hover:border-stone-300 dark:hover:border-stone-500'
                      }`}
                      aria-expanded={isExpanded}
                      aria-controls={`subject-${subject.slug}`}
                      aria-label={`${subject.name} — ${subject.code}`}
                    >
                      <span className={`flex-shrink-0 font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                        isAmber
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200'
                      }`}>
                        {subject.code}
                      </span>

                      <span className="flex-1 font-serif text-sm sm:text-base text-stone-900 dark:text-stone-100">
                        {subject.name}
                      </span>

                      <span className="flex-shrink-0 text-stone-400 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`subject-${subject.slug}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className={`p-3 border border-t-0 rounded-b-xl ${
                            isAmber ? 'bg-amber-50/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700' : 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700'
                          }`}>
                            <p className="font-sans text-xs text-stone-600 dark:text-stone-300 mb-3 leading-relaxed">
                              {subject.description}
                            </p>

                            {subject.syllabus && subject.syllabus.length > 0 && (
                              <div className="mb-3">
                                <h4 className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mb-1.5">Topics Covered</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {subject.syllabus.slice(0, 6).map((item) => (
                                    <span key={item.unit || item} className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                                      isAmber ? 'bg-amber-100/70 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-rose-100/70 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                                    }`}>
                                      {item.unit || item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <Link
                              to={getSubjectUrl(courseSlug, semesterSlug, subject.slug)}
                              className={`inline-flex items-center gap-1 font-mono text-xs ${
                                isAmber ? 'text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200' : 'text-rose-700 dark:text-rose-300 hover:text-rose-600 dark:hover:text-rose-200'
                              } transition-colors group`}
                              aria-label={`View ${subject.name} notes`}
                            >
                              View Notes
                              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })
            )}
          </motion.div>

          {seoContent && (
            <motion.article
              className="max-w-4xl prose prose-stone"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600 p-6 sm:p-8 lg:p-10">
                {seoContent.introduction && (
                  <section className="mb-8">
                    <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3">About {ordinal} Semester</h2>
                    <p className="font-sans text-base text-stone-600 dark:text-stone-300 leading-relaxed">{seoContent.introduction}</p>
                  </section>
                )}

                {seoContent.subjectsCovered && (
                  <section className="mb-8">
                    <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3">Subjects Covered</h2>
                    <p className="font-sans text-base text-stone-600 dark:text-stone-300 leading-relaxed">{seoContent.subjectsCovered}</p>
                  </section>
                )}

                {seoContent.benefits && (
                  <section className="mb-8">
                    <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3">Benefits of Our Notes</h2>
                    <p className="font-sans text-base text-stone-600 dark:text-stone-300 leading-relaxed">{seoContent.benefits}</p>
                  </section>
                )}

                {seoContent.examTips && (
                  <section className="mb-8">
                    <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3">Exam Preparation Tips</h2>
                    <p className="font-sans text-base text-stone-600 dark:text-stone-300 leading-relaxed">{seoContent.examTips}</p>
                  </section>
                )}

                {seoContent.resources && (
                  <section>
                    <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3">Study Resources</h2>
                    <p className="font-sans text-base text-stone-600 dark:text-stone-300 leading-relaxed">{seoContent.resources}</p>
                  </section>
                )}
              </div>
            </motion.article>
          )}
        </div>
      </section>
      </div>
    </main>
  )
}

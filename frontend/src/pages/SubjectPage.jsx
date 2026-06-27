import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl, getCourseUrl, getSemesterUrl, getSubjectUrl } from '../utils/canonicalUrl'
import { getSemesterNumber, ordinalSuffix } from '../utils/slugs'
import { fetchCourseBySlug, fetchSubjects, fetchSubjectBySlug, fetchNotes, fetchPYQs, fetchSyllabus, fetchOrganiser } from '../utils/api'

const TABS = [
  { id: 'notes', label: 'NOTES' },
  { id: 'pyqs', label: 'PYQS' },
  { id: 'syllabus', label: 'SYLLABUS' },
  { id: 'organiser', label: 'ORGANISER' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' }
  })
}

export default function SubjectPage() {
  const { courseSlug, semesterSlug, subjectSlug } = useParams()
  const semesterNumber = getSemesterNumber(semesterSlug)

  const [course, setCourse] = useState(null)
  const [semester, setSemester] = useState(null)
  const [subject, setSubject] = useState(null)
  const [allSubjects, setAllSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState('notes')
  const [expandedUnits, setExpandedUnits] = useState({})
  const [notes, setNotes] = useState(null)
  const [pyqs, setPyqs] = useState(null)
  const [syllabus, setSyllabus] = useState(null)
  const [organiser, setOrganiser] = useState(null)
  const [tabLoading, setTabLoading] = useState('')

  const toggleUnit = (unit) => {
    setExpandedUnits(prev => ({ ...prev, [unit]: !prev[unit] }))
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchCourseBySlug(courseSlug).catch(() => null),
      fetchSubjects(courseSlug, semesterNumber).catch(() => []),
    ])
      .then(([courseData, subjectsData]) => {
        setCourse(courseData)
        setAllSubjects(subjectsData)
        if (courseData) {
          const sem = (courseData.semesters || []).find(s => s.slug === semesterSlug)
          setSemester(sem || null)
        }
        const found = subjectsData.find(s => s.slug === subjectSlug)
        setSubject(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [courseSlug, semesterSlug, semesterNumber, subjectSlug])

  useEffect(() => {
    setNotes(null)
    setPyqs(null)
    setSyllabus(null)
    setOrganiser(null)
  }, [subjectSlug])

  useEffect(() => {
    if (!subject) return
    const tab = activeTab
    if (tab === 'notes' && notes === null) {
      setTabLoading('notes')
      fetchNotes(courseSlug, semesterNumber, subjectSlug)
        .then(data => { setNotes(data); setTabLoading('') })
        .catch(() => { setNotes([]); setTabLoading('') })
    }
    if (tab === 'pyqs' && pyqs === null) {
      setTabLoading('pyqs')
      fetchPYQs(courseSlug, semesterNumber, subjectSlug)
        .then(data => { setPyqs(data); setTabLoading('') })
        .catch(() => { setPyqs([]); setTabLoading('') })
    }
    if (tab === 'syllabus' && syllabus === null) {
      setTabLoading('syllabus')
      fetchSyllabus(courseSlug, semesterNumber, subjectSlug)
        .then(data => { setSyllabus(data); setTabLoading('') })
        .catch(() => { setSyllabus([]); setTabLoading('') })
    }
    if (tab === 'organiser' && organiser === null) {
      setTabLoading('organiser')
      fetchOrganiser(courseSlug, semesterNumber, subjectSlug)
        .then(data => { setOrganiser(data); setTabLoading('') })
        .catch(() => { setOrganiser([]); setTabLoading('') })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, courseSlug, semesterSlug, subjectSlug])

  if (loading) {
    return (
      <main className="animate-pulse">
        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
          <section className="py-12 sm:py-16 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 min-w-0">
                  <div className="mb-10 space-y-3">
                    <div className="h-3 w-48 bg-stone-200 dark:bg-stone-700 rounded" />
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-64 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                      <div className="h-6 w-16 bg-stone-200 dark:bg-stone-700 rounded-full" />
                    </div>
                    <div className="h-4 w-96 bg-stone-200 dark:bg-stone-700 rounded" />
                  </div>
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-8 w-20 bg-stone-200 dark:bg-stone-700 rounded-lg" />
                    ))}
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600">
                        <div className="h-4 w-48 bg-stone-200 dark:bg-stone-700 rounded mb-2" />
                        <div className="h-3 w-full bg-stone-200 dark:bg-stone-700 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
                <aside className="w-full lg:w-80 flex-shrink-0">
                  <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600 p-6 space-y-4">
                    <div className="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="space-y-1">
                        <div className="h-3 w-32 bg-stone-200 dark:bg-stone-700 rounded" />
                        <div className="h-3 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  if (!course || !semester || !subject) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-stone-50 dark:bg-stone-800">
        <div className="text-center px-6">
          <p className="font-serif text-6xl text-stone-200 dark:text-stone-600 mb-4">404</p>
          <h1 className="font-sans text-xl text-stone-700 dark:text-stone-300 mb-4">Subject not found</h1>
          <p className="font-sans text-stone-500 dark:text-stone-400 mb-6">The subject you're looking for doesn't exist.</p>
          <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors">Browse all courses</Link>
        </div>
      </main>
    )
  }

  const relatedSubjects = allSubjects.filter(s => s.slug !== subjectSlug).slice(0, 4)
  const ordinal = ordinalSuffix(semesterNumber)
  const canonical = getCanonicalUrl(getSubjectUrl(courseSlug, semesterSlug, subjectSlug))

  const breadcrumbItems = [
    { name: 'Courses', url: getCanonicalUrl('/courses') },
    { name: course.name, url: getCanonicalUrl(getCourseUrl(courseSlug)) },
    { name: `${ordinal} Semester`, url: getCanonicalUrl(getSemesterUrl(courseSlug, semesterSlug)) },
    { name: subject.name, url: canonical }
  ]

  return (
    <main>
      <MetaTags
        title={`${subject.name} Notes PDF | ${course.name} ${ordinal} Semester`}
        description={`Download ${subject.name} notes PDF for ${course.name} ${ordinal} Semester. Free study material, topic-wise notes, important questions and exam preparation resources.`}
        keywords={`${subject.name} notes, ${courseSlug} notes, ${ordinal} semester ${course.name} notes, ${subject.code} notes`}
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: 'Courses', url: getCanonicalUrl('/courses') },
        { name: course.name, url: getCanonicalUrl(getCourseUrl(courseSlug)) },
        { name: `${ordinal} Semester`, url: getCanonicalUrl(getSemesterUrl(courseSlug, semesterSlug)) },
        { name: subject.name, url: canonical }
      ])]} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="py-12 sm:py-16 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="subject-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-3">
                  {course.name} &mdash; {ordinal} Semester
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <h1 id="subject-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight">
                    {subject.name}
                  </h1>
                  <span className="font-mono text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                    {subject.code}
                  </span>
                </div>
                <p className="font-sans text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-3xl">
                  {subject.description}
                </p>
              </motion.div>

              <div className="mb-8">
                <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 dark:bg-stone-700/60 rounded-xl" role="tablist" aria-label="Content sections">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                          isActive
                            ? 'bg-white dark:bg-stone-600 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                            : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-600/50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {tabLoading === 'notes' ? (
                      <p className="font-sans text-sm text-stone-400 animate-pulse">loading notes...</p>
                    ) : !notes || notes.length === 0 ? (
                      <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600">
                        <svg className="w-10 h-10 mx-auto mb-3 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <p className="font-serif text-lg text-stone-500 dark:text-stone-400">no notes available</p>
                        <p className="font-sans text-xs text-stone-400 dark:text-stone-500 mt-1">notes for this subject are being prepared.</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {notes.map((note, i) => (
                          <motion.div
                            key={note.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={`${note.width || 'w-full sm:w-1/2 md:w-1/3'} group`}
                          >
                            <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 p-3 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-sm transition-all h-full flex flex-col">
                              <div className="flex items-start justify-between mb-2">
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 font-semibold">{note.fileType || 'PDF'}</span>
                                <div className="flex items-center gap-2 text-[10px] text-stone-400">
                                  <span className="flex items-center gap-0.5" title="Downloads">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    {note.downloads?.toLocaleString() || 0}
                                  </span>
                                  <span className="flex items-center gap-0.5" title="Views">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    {note.views?.toLocaleString() || 0}
                                  </span>
                                </div>
                              </div>
                              <h4 className="font-serif text-sm text-stone-900 dark:text-stone-100 mb-1">{note.title}</h4>
                              <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3 flex-1">{note.description}</p>
                              <div className="flex items-center gap-2 mt-auto">
                                <Link to={`/note/${note.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-lg hover:bg-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                  Preview
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'pyqs' && (
                  <motion.div
                    key="pyqs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {tabLoading === 'pyqs' ? (
                      <p className="font-sans text-sm text-stone-400 animate-pulse">loading pyqs...</p>
                    ) : !pyqs || pyqs.length === 0 ? (
                      <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600">
                        <svg className="w-10 h-10 mx-auto mb-3 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <p className="font-serif text-lg text-stone-500 dark:text-stone-400">no pyqs available</p>
                        <p className="font-sans text-xs text-stone-400 dark:text-stone-500 mt-1">previous year papers for this subject are being added.</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {pyqs.map((item, i) => (
                          <motion.div key={item.id} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`${item.width || 'w-full sm:w-1/2'} group`}>
                            <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 p-3 hover:border-rose-200 dark:hover:border-rose-700 hover:shadow-sm transition-all h-full flex flex-col">
                              <div className="flex items-start justify-between mb-2">
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 font-semibold">{item.fileType || 'PDF'}</span>
                                <div className="flex items-center gap-2 text-[10px] text-stone-400">
                                  <span className="flex items-center gap-0.5" title="Downloads"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>{item.downloads?.toLocaleString() || 0}</span>
                                  <span className="flex items-center gap-0.5" title="Views"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>{item.views?.toLocaleString() || 0}</span>
                                </div>
                              </div>
                              <h4 className="font-serif text-sm text-stone-900 dark:text-stone-100 mb-1">{item.title}</h4>
                              <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3 flex-1">{item.description}</p>
                              <div className="flex items-center gap-2 mt-auto">
                                <Link to={`/note/${item.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-500 text-white text-xs font-semibold rounded-lg hover:bg-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300" aria-label={`Preview ${item.title}`}>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                  Preview
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'syllabus' && (
                  <motion.div
                    key="syllabus"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {tabLoading === 'syllabus' ? (
                      <p className="font-sans text-sm text-stone-400 animate-pulse">loading syllabus...</p>
                    ) : !syllabus || syllabus.length === 0 ? (
                      <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600">
                        <svg className="w-10 h-10 mx-auto mb-3 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        <p className="font-serif text-lg text-stone-500 dark:text-stone-400">syllabus not available</p>
                        <p className="font-sans text-xs text-stone-400 dark:text-stone-500 mt-1">syllabus for this subject is being uploaded.</p>
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 divide-y divide-stone-100 dark:divide-stone-700">
                        {syllabus.map((item) => {
                          const isUnitExpanded = expandedUnits[item.unit]
                          return (
                            <div key={item.unit}>
                              <button
                                onClick={() => toggleUnit(item.unit)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
                                aria-expanded={isUnitExpanded}
                              >
                                <span className="font-mono text-sm font-semibold text-stone-700 dark:text-stone-300">{item.unit}</span>
                                <svg className="w-4 h-4 text-stone-400 transition-transform duration-200" style={{ transform: isUnitExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                              </button>
                              <AnimatePresence>
                                {isUnitExpanded && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                    <p className="px-4 pb-4 font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{item.topics}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'organiser' && (
                  <motion.div
                    key="organiser"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {tabLoading === 'organiser' ? (
                      <p className="font-sans text-sm text-stone-400 animate-pulse">loading organiser...</p>
                    ) : !organiser || organiser.length === 0 ? (
                      <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600">
                        <svg className="w-10 h-10 mx-auto mb-3 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="font-serif text-lg text-stone-500 dark:text-stone-400">organiser not available</p>
                        <p className="font-sans text-xs text-stone-400 dark:text-stone-500 mt-1">study planner for this subject is being created.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {organiser.map((item, i) => (
                          <div key={i} className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 p-4">
                            <h4 className="font-serif text-sm text-stone-900 dark:text-stone-100 mb-1">{item.title}</h4>
                            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {relatedSubjects.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-4">other subjects in this semester</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {relatedSubjects.map((rs) => (
                            <Link
                              key={rs.slug}
                              to={getSubjectUrl(courseSlug, semesterSlug, rs.slug)}
                              className="block p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-amber-400"
                              aria-label={`View ${rs.name}`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400">{rs.code}</span>
                              </div>
                              <h4 className="font-serif text-sm text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">{rs.name}</h4>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {activeTab !== 'organiser' && relatedSubjects.length > 0 && (
              <motion.aside
                className="lg:w-72 flex-shrink-0"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="lg:sticky lg:top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100">Other Subjects</h2>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400">{relatedSubjects.length}</span>
                  </div>
                  <div className="space-y-3">
                    {relatedSubjects.map((rs) => (
                      <Link
                        key={rs.slug}
                        to={getSubjectUrl(courseSlug, semesterSlug, rs.slug)}
                        className="block p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-amber-400"
                        aria-label={`View ${rs.name}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400">{rs.code}</span>
                        </div>
                        <h3 className="font-serif text-sm text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">{rs.name}</h3>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}

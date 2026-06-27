import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchCourses, fetchSemesters, fetchSubjects } from '../../utils/api'
import { courses as staticCourses } from '../../data/courses'
import { getCourseUrl, getSemesterUrl, getSubjectUrl } from '../../utils/canonicalUrl'
import { getCourseIcon } from '../../utils/icons'
import { getSemesterNumber, ordinalSuffix } from '../../utils/slugs'

const rotations = [-0.8, 0.6, -0.4, 1.0, -0.5, 0.3, -0.7, 0.9, -0.3, 0.5]

export default function CourseNav() {
  const params = useParams()
  const courseSlug = params.courseSlug || null
  const semesterSlug = params.semesterSlug || null

  const [courses, setCourses] = useState(staticCourses)
  const [expandedCourse, setExpandedCourse] = useState(courseSlug)
  const [semesters, setSemesters] = useState([])
  const [subjects, setSubjects] = useState([])
  const [expandedSemester, setExpandedSemester] = useState(semesterSlug)
  const [expandedSubject, setExpandedSubject] = useState(params.subjectSlug || null)

  const semesterNumber = expandedSemester ? getSemesterNumber(expandedSemester) : null

  useEffect(() => {
    fetchCourses()
      .then(data => setCourses(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (expandedCourse) {
      fetchSemesters(expandedCourse)
        .then(data => setSemesters(data))
        .catch(() => setSemesters([]))
    }
  }, [expandedCourse])

  useEffect(() => {
    if (expandedCourse && semesterNumber) {
      fetchSubjects(expandedCourse, semesterNumber)
        .then(data => setSubjects(data))
        .catch(() => setSubjects([]))
    }
  }, [expandedCourse, semesterNumber])

  const currentCourse = courses.find(c => c.slug === expandedCourse)

  return (
    <section className="bg-white border-b border-stone-200 shadow-sm" aria-label="Course navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-3">
          Quick Navigate
        </p>

        <div className="mb-3">
          <p className="font-mono text-[11px] text-stone-500 mb-2">Courses</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {courses.map((course, i) => {
              const isActive = course.slug === expandedCourse
              return (
                <button
                  key={course.slug}
                  onClick={() => {
                    setExpandedCourse(course.slug)
                    setExpandedSemester(null)
                    setExpandedSubject(null)
                    setSemesters([])
                    setSubjects([])
                  }}
                  style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    isActive
                      ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-sm'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`View ${course.name}`}
                >
                  <span aria-hidden="true" className="w-5 h-5 block flex-shrink-0">{getCourseIcon(course.slug)}</span>
                  {course.name}
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {expandedCourse && semesters.length > 0 && (
            <motion.div
              key={`sems-${expandedCourse}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mb-3"
            >
              <p className="font-mono text-[11px] text-stone-500 mb-2">
                {currentCourse?.name || ''} Semesters
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {semesters.map((sem, i) => {
                  const isActive = sem.slug === expandedSemester
                  return (
                    <button
                      key={sem.slug}
                      onClick={() => {
                        setExpandedSemester(sem.slug)
                        setExpandedSubject(null)
                        setSubjects([])
                      }}
                      style={{ transform: `rotate(${rotations[i % rotations.length] * 0.6}deg)` }}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                        isActive
                          ? 'bg-rose-100 border-rose-300 text-rose-800 shadow-sm'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                      }`}
                      aria-pressed={isActive}
                    >
                      {ordinalSuffix(sem.semesterNumber)} Sem
                    </button>
                  )
                })}
                {expandedCourse && (
                  <Link
                    to={getCourseUrl(expandedCourse)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-mono text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    View All &rarr;
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {expandedCourse && expandedSemester && subjects.length > 0 && (
            <motion.div
              key={`subs-${expandedCourse}-${expandedSemester}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mb-3"
            >
              <p className="font-mono text-[11px] text-stone-500 mb-2">
                {ordinalSuffix(semesterNumber)} Semester Subjects
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {subjects.map((sub, i) => {
                  const isActive = sub.slug === expandedSubject
                  return (
                    <button
                      key={sub.slug}
                      onClick={() => setExpandedSubject(sub.slug)}
                      style={{ transform: `rotate(${rotations[i % rotations.length] * 0.4}deg)` }}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                        isActive
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-sm'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                      }`}
                      aria-pressed={isActive}
                    >
                      {sub.name}
                    </button>
                  )
                })}
                {expandedCourse && expandedSemester && (
                  <Link
                    to={getSemesterUrl(expandedCourse, expandedSemester)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-mono text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    View All &rarr;
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {expandedCourse && expandedSemester && expandedSubject && (
            <motion.div
              key={`notes-${expandedCourse}-${expandedSemester}-${expandedSubject}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-mono text-[11px] text-stone-500 mb-2">Notes</p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <Link
                  to={getSubjectUrl(expandedCourse, expandedSemester, expandedSubject)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-mono text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  View All &rarr;
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

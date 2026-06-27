import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import { getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl, getCourseUrl, getSubjectUrl } from '../utils/canonicalUrl'
import { getCourseIcon } from '../utils/icons'
import { searchContent } from '../utils/api'

const FILTERS = ['All', 'Courses', 'Subjects', 'Notes']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

function highlightText(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="bg-amber-200 text-amber-900 px-0.5 rounded">{part}</mark>
      : part
  )
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  const [apiResults, setApiResults] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) { setApiResults(null); return }
    setSearchLoading(true)
    searchContent(query)
      .then(data => { setApiResults(data); setSearchLoading(false) })
      .catch(() => { setApiResults([]); setSearchLoading(false) })
  }, [query])

  const results = useMemo(() => {
    if (!query.trim() || !apiResults) return { courses: [], subjects: [], notes: [] }

    return {
      courses: apiResults.courses || [],
      subjects: apiResults.subjects || [],
      notes: apiResults.notes || [],
    }
  }, [query, apiResults])

  const filteredResults = useMemo(() => {
    switch (activeFilter) {
      case 'Courses': return results.courses
      case 'Subjects': return results.subjects
      case 'Notes': return results.notes
      default: return [
        ...results.courses.map(c => ({ type: 'course', ...c })),
        ...results.subjects.map(s => ({ type: 'subject', ...s })),
        ...results.notes.map(n => ({ type: 'note', ...n })),
      ]
    }
  }, [activeFilter, results])

  const totalPages = Math.ceil(filteredResults.length / perPage)
  const paginatedResults = filteredResults.slice((currentPage - 1) * perPage, currentPage * perPage)

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchInput.trim()
    if (q) {
      setSearchParams({ q })
      setCurrentPage(1)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, query])

  const canonical = query ? getCanonicalUrl(`/search?q=${encodeURIComponent(query)}`) : getCanonicalUrl('/search')

  return (
    <main>
      <MetaTags
        title={query ? `Search Results: ${query} - NotesHub` : 'Search Notes - NotesHub'}
        description={query ? `Search results for "${query}" on NotesHub. Find engineering notes, study material, and college resources.` : 'Search for engineering notes, subjects, courses on NotesHub.'}
        keywords={`${query}, search notes, engineering study material, ${query} notes`}
        canonical={canonical}
      />
      <SchemaMarkup schemas={[getBreadcrumbSchema([
        { name: 'Home', url: getCanonicalUrl('/') },
        { name: 'Search', url: canonical }
      ])]} />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <section className="py-12 sm:py-16 bg-stone-50 dark:bg-stone-800 min-h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden" aria-labelledby="search-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 id="search-heading" className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 text-center mb-6">
              Search NotesHub
            </h1>
            <form onSubmit={handleSearch} role="search" aria-label="Search notes and courses">
              <label htmlFor="search-input" className="sr-only">Search for notes, subjects, or courses</label>
              <div className="relative">
                <input
                  id="search-input"
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for notes, subjects, courses..."
                  className="w-full pl-12 pr-20 py-4 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-2xl text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent font-sans text-base shadow-sm"
                  aria-label="Search for notes, subjects, or courses"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          {query && (
            <>
              <motion.div
                className="flex flex-wrap items-center gap-2 mb-8 justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter
                  let count = 0
                  if (filter === 'All') count = results.courses.length + results.subjects.length + results.notes.length
                  else if (filter === 'Courses') count = results.courses.length
                  else if (filter === 'Subjects') count = results.subjects.length
                  else if (filter === 'Notes') count = results.notes.length

                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                        isActive
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-600 hover:border-amber-300 dark:hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-300'
                      }`}
                      aria-pressed={isActive}
                    >
                      {filter}
                      <span className={`ml-1.5 ${isActive ? 'text-amber-200' : 'text-stone-400'}`}>({count})</span>
                    </button>
                  )
                })}
              </motion.div>

              {searchLoading ? (
                <div className="text-center py-16">
                  <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-sans text-sm text-stone-400">searching...</p>
                </div>
              ) : paginatedResults.length === 0 ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-32 h-32 mx-auto mb-6 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h2 className="font-serif text-2xl text-stone-700 dark:text-stone-300 mb-2">No results found</h2>
                  <p className="font-sans text-stone-500 dark:text-stone-400 mb-2">
                    We couldn&apos;t find anything for &ldquo;{query}&rdquo;
                  </p>
                  <p className="font-sans text-sm text-stone-400">
                    Try searching with different keywords or browse our courses.
                  </p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors"
                  >
                    Browse Courses
                  </Link>
                </motion.div>
              ) : (
                <>
                  <p className="font-sans text-sm text-stone-400 text-center mb-6">
                    Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                  </p>

                  <motion.div
                    className="max-w-3xl mx-auto space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {paginatedResults.map((item) => {
                      if (item.type === 'course') {
                        return (
                          <motion.div key={`course-${item.slug}`} variants={itemVariants}>
                            <Link
                              to={getCourseUrl(item.slug)}
                              className="flex items-center gap-4 p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-amber-400"
                              aria-label={`View ${item.name} course`}
                            >
                              <span className="w-8 h-8 flex-shrink-0 block" aria-hidden="true">{getCourseIcon(item.slug)}</span>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-serif text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                                  {highlightText(item.name, query)}
                                </h3>
                                <p className="font-sans text-xs text-stone-400 mt-0.5">{item.fullName}</p>
                              </div>
                              <span className="font-mono text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 flex-shrink-0">{item.duration}</span>
                              <svg className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-amber-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </motion.div>
                        )
                      }

                      if (item.type === 'subject') {
                        return (
                          <motion.div key={`subject-${item.slug}`} variants={itemVariants}>
                            <Link
                              to={getSubjectUrl(item.courseSlug, item.semesterSlug, item.slug)}
                              className="block p-5 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-amber-400"
                              aria-label={`View ${item.name} subject`}
                            >
                              <div className="flex items-start gap-3 mb-2">
                                <span className="font-mono text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 flex-shrink-0">{item.code}</span>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-serif text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                                    {highlightText(item.name, query)}
                                  </h3>
                                  <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">{item.description}</p>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        )
                      }

                      if (item.type === 'note') {
                        return (
                          <motion.div key={`note-${item.slug}`} variants={itemVariants}>
                            <Link
                              to={`/note/${item.slug}`}
                              className="flex items-center gap-3 p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-amber-400"
                              aria-label={`View ${item.title}`}
                            >
                              <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </span>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-serif text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                                  {highlightText(item.title, query)}
                                </h3>
                              </div>
                              <svg className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-amber-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </motion.div>
                        )
                      }

                      return null
                    })}
                  </motion.div>

                  {totalPages > 1 && (
                    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Search results pagination">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-mono rounded-lg border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                        aria-label="Previous page"
                      >
                        Prev
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 text-sm font-mono rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            currentPage === page
                              ? 'bg-amber-500 text-white'
                              : 'border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                          }`}
                          aria-label={`Page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-mono rounded-lg border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                        aria-label="Next page"
                      >
                        Next
                      </button>
                    </nav>
                  )}
                </>
              )}
            </>
          )}

          {!query && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-24 h-24 mx-auto mb-6 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="font-serif text-2xl text-stone-700 dark:text-stone-300 mb-2">Search for study material</h2>
              <p className="font-sans text-stone-500 dark:text-stone-400">Type a course name, subject, or topic to find notes.</p>
            </motion.div>
          )}
        </div>
      </section>
      </div>
    </main>
  )
}

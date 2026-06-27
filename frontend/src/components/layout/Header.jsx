import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/ThemeContext'
import { courses as staticCourses } from '../../data/courses'
import { fetchCourses } from '../../utils/api'

const pageLabels = {
  '/': 'home',
  '/about': 'about',
  '/courses': 'courses',
  '/contact': 'contact',
  '/search': 'search',
  '/faq': 'faq',
}

function SquigglyLine() {
  return (
    <svg className="w-full h-full" viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="squiggle-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M2,4 Q15,0 30,4 T60,4 T90,4 T118,4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        filter="url(#squiggle-glow)"
      />
    </svg>
  )
}

function StampBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-wider bg-stone-100/80 dark:bg-stone-700/80 px-2 py-0.5 rounded-md rotate-[-0.5deg] select-none">
      {children}
    </span>
  )
}

export default function Header() {
  const [courses, setCourses] = useState(staticCourses)
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const coursesRef = useRef(null)
  const location = useLocation()
  const { theme, toggle } = useTheme()
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    fetchCourses()
      .then(data => setCourses(data))
      .catch(() => {})
  }, [])

  const isCoursesPage = location.pathname === '/courses' || location.pathname.startsWith('/course/')

  const currentPage = Object.entries(pageLabels).find(([path]) =>
    location.pathname === path
  )?.[1] || location.pathname.slice(1) || 'home'

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50" role="banner">
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-amber-300/10 dark:from-amber-500/5 to-transparent pointer-events-none" aria-hidden="true" />
      )}

      <div className={`transition-all duration-500 ease-out relative ${
        scrolled ? 'max-w-5xl mx-auto mt-3 px-3 sm:px-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      }`}>
        <div className={`transition-all duration-500 ease-out relative ${
          scrolled
            ? 'bg-amber-50/80 dark:bg-stone-800/80 backdrop-blur-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.4)] rounded-2xl border border-amber-200/50 dark:border-stone-700/50'
            : 'bg-transparent rounded-none'
        }`}>
          {scrolled && (
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 via-transparent to-rose-200/10 dark:from-amber-500/5 dark:via-transparent dark:to-rose-500/5" />
            </div>
          )}
          <div className="relative flex items-center justify-between h-14 md:h-16 px-3 sm:px-5">
            <Link
              to="/"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="NotesHub Home"
            >
              <div className="-rotate-1 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
                <div className="relative">
                  <img
                    src="/brandlogo.png"
                    alt="NotesHub"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover ring-2 ring-amber-300/60 dark:ring-amber-600/60 group-hover:ring-amber-400 dark:group-hover:ring-amber-500 shadow-sm transition-all duration-500"
                  />
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-amber-400/20 to-rose-400/20 dark:from-amber-500/20 dark:to-rose-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" aria-hidden="true" />
                </div>
              </div>
              <span className="hidden sm:inline font-serif text-base sm:text-lg text-amber-900 dark:text-amber-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors tracking-tight">
                NotesHub
              </span>
            </Link>

            <nav className="hidden md:flex items-center mx-2" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-2.5 lg:px-3 py-2 font-mono text-[11px] lg:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap rounded-lg ${
                      isActive
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-stone-500 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/40 dark:hover:bg-stone-700/40'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-2 right-2 h-4 flex items-end justify-center overflow-visible">
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="w-full h-2 text-rose-400 dark:text-rose-400"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        >
                          <SquigglyLine />
                        </motion.span>
                      )}
                      {!isActive && (
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400/50 dark:group-hover:bg-amber-500/50 transition-all duration-300 mb-0.5" />
                      )}
                    </span>
                  </Link>
                )
              })}
              <div
                ref={coursesRef}
                className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <button
                  className={`relative px-2.5 lg:px-3 py-2 font-mono text-[11px] lg:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap rounded-lg flex items-center gap-1 ${
                    isCoursesPage
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-stone-500 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/40 dark:hover:bg-stone-700/40'
                  }`}
                  aria-expanded={coursesOpen}
                  aria-haspopup="true"
                >
                  Courses
                  <svg className={`w-3 h-3 transition-transform duration-300 ${coursesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-2 right-2 h-4 flex items-end justify-center overflow-visible">
                    {isCoursesPage && (
                      <motion.span
                        layoutId="nav-underline"
                        className="w-full h-2 text-rose-400 dark:text-rose-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      >
                        <SquigglyLine />
                      </motion.span>
                    )}
                    {!isCoursesPage && (
                      <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400/50 dark:group-hover:bg-amber-500/50 transition-all duration-300 mb-0.5" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {coursesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-amber-50/95 dark:bg-stone-800/95 backdrop-blur-2xl rounded-2xl border border-amber-200 dark:border-stone-700 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-amber-50 dark:bg-stone-800 border-l border-t border-amber-200 dark:border-stone-700" aria-hidden="true" />
                      <div className="pt-2 pb-1 max-h-80 overflow-y-auto">
                        {courses.map((course) => (
                          <Link
                            key={course.slug}
                            to={`/course/${course.slug}`}
                            className={`flex items-center gap-3 px-4 py-2.5 transition-all duration-200 ${
                              location.pathname === `/course/${course.slug}`
                                ? 'text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-900/20'
                                : 'text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-stone-700/50'
                            }`}
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400/60 dark:bg-amber-500/60" />
                            <div className="min-w-0">
                              <span className="font-mono text-xs font-semibold block">{course.name}</span>
                              <span className="text-[10px] text-stone-400 dark:text-stone-500 truncate block leading-tight">{course.fullName}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-amber-200 dark:border-stone-700 px-4 py-2.5 bg-amber-100/30 dark:bg-stone-700/30">
                        <Link
                          to="/courses"
                          className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200 transition-colors"
                        >
                          View All Courses
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={toggle}
                className="p-2 sm:p-2.5 rounded-xl text-stone-400 hover:text-amber-700 hover:bg-amber-100/60 dark:text-stone-400 dark:hover:text-amber-300 dark:hover:bg-stone-700/60 transition-all duration-300"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <div ref={searchRef} className="relative flex items-center">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 sm:p-2.5 rounded-xl text-stone-400 hover:text-amber-700 hover:bg-amber-100/60 dark:text-stone-400 dark:hover:text-amber-300 dark:hover:bg-stone-700/60 transition-all duration-300"
                  aria-label={searchOpen ? 'Close search' : 'Open search'}
                  title="Search"
                >
                  <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.form
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 160, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      role="search"
                      onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}` }}
                    >
                      <label htmlFor="header-search" className="sr-only">Search notes, subjects, courses</label>
                      <input
                        ref={inputRef}
                        id="header-search"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search notes..."
                        className="w-full pl-3 pr-3 py-1.5 text-sm bg-amber-100/60 dark:bg-stone-700/60 border border-amber-200 dark:border-stone-600 rounded-xl outline-none text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 font-sans focus:border-amber-400 dark:focus:border-amber-500 transition-all"
                        aria-label="Search notes"
                      />
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden xl:flex items-center pl-1.5">
                <StampBadge>
                  <span className="text-rose-400">✦</span>
                  {currentPage}
                </StampBadge>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative p-2 sm:p-2.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/60 dark:hover:bg-stone-700/60 transition-all duration-300"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-amber-50/95 dark:bg-stone-800/95 backdrop-blur-2xl border-l border-amber-200 dark:border-stone-700 shadow-2xl z-50"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-amber-200 dark:border-stone-700">
              <Link to="/" className="flex items-center gap-2" aria-label="NotesHub Home">
                <img src="/brandlogo.png" alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-amber-200/60 dark:ring-amber-700/60" />
                <span className="font-serif text-sm text-amber-900 dark:text-amber-200">NotesHub</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-amber-700 hover:bg-amber-100 dark:text-stone-400 dark:hover:text-amber-300 dark:hover:bg-stone-700 transition-all"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-1 overflow-y-auto max-h-[60vh]">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative block px-4 py-3 font-mono text-sm uppercase tracking-widest rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20'
                        : 'text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/60 dark:hover:bg-stone-700/60'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span className="ml-2 inline-block text-[10px] text-rose-400" aria-hidden="true">✦</span>
                    )}
                  </Link>
                )
              })}
              <div className="pt-2">
                <button
                  onClick={() => setCoursesOpen(!coursesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 font-mono text-sm uppercase tracking-widest rounded-xl transition-all duration-300 ${
                    isCoursesPage
                      ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20'
                      : 'text-stone-600 dark:text-stone-300'
                  }`}
                  aria-expanded={coursesOpen}
                >
                  Courses
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${coursesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {coursesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pl-3 pt-1 space-y-0.5">
                        {courses.map((course) => (
                          <Link
                            key={course.slug}
                            to={`/course/${course.slug}`}
                            className="block px-4 py-2.5 font-sans text-sm rounded-xl transition-colors hover:bg-amber-100/60 dark:hover:bg-stone-700/60"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="font-mono text-xs font-semibold text-stone-700 dark:text-stone-200">{course.name}</span>
                            <span className="block text-[10px] text-stone-400 dark:text-stone-500 truncate">{course.fullName}</span>
                          </Link>
                        ))}
                        <Link
                          to="/courses"
                          className="block px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          View All Courses &rarr;
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-200 dark:border-stone-700 bg-gradient-to-t from-amber-50/80 to-transparent dark:from-stone-800/80 dark:to-transparent">
              <form
                onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}` }}
                role="search"
              >
                <label htmlFor="mobile-search" className="sr-only">Search notes, subjects, courses</label>
                <div className="relative">
                  <input
                    id="mobile-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-amber-100/60 dark:bg-stone-700/60 border border-amber-200 dark:border-stone-600 rounded-xl outline-none text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 font-sans focus:border-amber-400 dark:focus:border-amber-500 transition-colors"
                    aria-label="Search notes"
                  />
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  )
}

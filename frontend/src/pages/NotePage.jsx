import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import CourseNav from '../components/navigation/CourseNav'
import { getArticleSchema, getBreadcrumbSchema } from '../utils/schema'
import { getCanonicalUrl, getNoteUrl } from '../utils/canonicalUrl'
import { fetchNoteDetail } from '../utils/api'

export default function NotePage() {
  const { noteSlug } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetchNoteDetail(noteSlug)
      .then(data => { setNote(data); setLoading(false) })
      .catch(() => { setNote(null); setLoading(false); setError('not available') })
  }, [noteSlug])

  const canonical = getCanonicalUrl(getNoteUrl(noteSlug))

  const breadcrumbItems = [
    { name: 'Notes', url: getCanonicalUrl('/search') },
    { name: note?.title || 'Note', url: canonical }
  ]

  return (
    <main>
      <MetaTags
        title={note ? `${note.title} | NotesHub Free Study Material` : 'Note not available | NotesHub'}
        description={note?.description || 'This note is not available.'}
        canonical={canonical}
      />
      <SchemaMarkup schemas={[
        getBreadcrumbSchema([
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Notes', url: getCanonicalUrl('/search') },
          { name: note?.title || 'Note', url: canonical }
        ]),
        ...(note ? [getArticleSchema({
          title: note.title, description: note.description, url: canonical,
          image: note.thumbnail || '', datePublished: note.datePublished || '', author: note.author || 'NotesHub'
        })] : [])
      ]} />
      <Breadcrumbs items={breadcrumbItems} />
      <CourseNav />

      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <article className="py-12 sm:py-16 bg-stone-50 dark:bg-stone-800 rounded-2xl sm:rounded-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-sans text-sm text-stone-400">loading note...</p>
                </div>
              ) : error || !note ? (
                <div className="text-center py-20">
                  <svg className="w-16 h-16 mx-auto mb-4 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <h1 className="font-serif text-2xl text-stone-500 dark:text-stone-400 mb-2">note not available</h1>
                  <p className="font-sans text-sm text-stone-400 dark:text-stone-500">this note has not been uploaded yet or does not exist.</p>
                  <Link to="/courses" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-400 transition-colors">Browse courses</Link>
                </div>
              ) : (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8">
                    <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight mb-3">{note.title}</h1>
                    <p className="font-sans text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{note.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {note.fileType && <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 font-semibold">{note.fileType}</span>}
                      <span className="flex items-center gap-1 text-stone-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span>{note.downloads?.toLocaleString() || 0} downloads</span>
                      </span>
                      <span className="flex items-center gap-1 text-stone-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        <span>{note.views?.toLocaleString() || 0} views</span>
                      </span>
                      {note.fileSize && <span className="font-mono text-xs text-stone-400">{note.fileSize}</span>}
                      {note.datePublished && <span className="text-xs text-stone-400">{note.datePublished}</span>}
                    </div>
                  </motion.div>

                  {note.content && (
                    <motion.div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-600 p-6 sm:p-8 lg:p-10 mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                      <h2 className="sr-only">Note content</h2>
                      <div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: note.content }} />
                    </motion.div>
                  )}

                  {note.fileUrl && (
                    <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                      <a href={note.fileUrl} download className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download PDF
                      </a>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </article>
      </div>
    </main>
  )
}

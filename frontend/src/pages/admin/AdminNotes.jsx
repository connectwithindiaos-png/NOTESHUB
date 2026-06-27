import { useState, useEffect } from 'react'
import { fetchAdminNotes, createNote, updateNote, deleteNote } from '../../utils/api'
import ConfirmModal from '../../components/admin/ConfirmModal'
import toast from 'react-hot-toast'

const emptyForm = {
  subjectId: '', title: '', description: '', driveUrl: '', category: 'note',
  fileType: 'pdf', isPremium: false, isFree: true, tags: '',
}

export default function AdminNotes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [confirm, setConfirm] = useState({ open: false, id: '', title: '' })
  const [saving, setSaving] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const load = () => {
    setLoading(true)
    fetchAdminNotes(page)
      .then(data => {
        if (Array.isArray(data)) {
          setNotes(data)
        } else if (data?.notes) {
          setNotes(data.notes)
          setTotalPages(Math.ceil((data.total || 0) / 20))
        } else {
          setNotes([])
        }
      })
      .catch(err => toast.error('Failed to load notes: ' + err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [page])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        isPremium: form.isPremium === true || form.isPremium === 'true',
        isFree: form.isFree === true || form.isFree === 'true',
      }
      if (editing) {
        await updateNote(editing, payload)
        toast.success('Note updated successfully')
      } else {
        await createNote(payload)
        toast.success('Note created successfully')
      }
      setShowForm(false)
      setEditing(null)
      setForm(emptyForm)
      load()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (note) => {
    setEditing(note.id)
    setForm({
      subjectId: note.subjectId || '',
      title: note.title || '',
      description: note.description || '',
      driveUrl: note.driveUrl || '',
      category: note.category || 'note',
      fileType: note.fileType || 'pdf',
      isPremium: note.isPremium || false,
      isFree: note.isFree || true,
      tags: Array.isArray(note.tags) ? note.tags.join(', ') : (note.tags || ''),
    })
    setShowForm(true)
  }

  const handleDelete = (id, title) => {
    setConfirm({ open: true, id, title })
  }

  const confirmDelete = async () => {
    try {
      await deleteNote(confirm.id)
      toast.success('Note deleted successfully')
      setConfirm({ open: false, id: '', title: '' })
      if (notes.length <= 1 && page > 1) setPage(p => p - 1)
      else load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <ConfirmModal
        open={confirm.open}
        title="Delete Note"
        message={`Delete "${confirm.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={confirmDelete}
        onCancel={() => setConfirm({ open: false, id: '', title: '' })}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Notes</h1>
          <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-1">Manage notes and study materials</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyForm) }}
          className={`px-4 py-2 rounded-xl font-mono text-sm transition-all ${
            showForm
              ? 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-600'
              : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          {showForm ? 'Cancel' : '+ Add Note'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-sm text-cyan-700 dark:text-cyan-300 font-mono font-bold">
              {editing ? '✎' : '+'}
            </span>
            <h2 className="font-mono text-sm font-semibold text-stone-700 dark:text-stone-300">
              {editing ? 'Edit Note' : 'New Note'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Subject ID *</label>
              <input type="text" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all font-mono text-xs" placeholder="Subject UUID" required />
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="e.g. Unit 1 Notes" required />
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Drive URL *</label>
              <input type="url" value={form.driveUrl} onChange={(e) => setForm({ ...form, driveUrl: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="https://drive.google.com/..." required />
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all">
                <option value="note">Note</option>
                <option value="pyq">PYQ (Previous Year Question)</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">File Type</label>
              <select value={form.fileType} onChange={(e) => setForm({ ...form, fileType: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all">
                <option value="pdf">PDF</option>
                <option value="doc">DOC</option>
                <option value="video">Video</option>
                <option value="link">Link</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Tags</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="unit-1, important, exam" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.isFree === true || form.isFree === 'true' ? 'bg-emerald-500 border-emerald-500' : 'border-stone-300 dark:border-stone-500 group-hover:border-stone-400'}`}>
                  {(form.isFree === true || form.isFree === 'true') && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                <input type="checkbox" className="hidden" checked={form.isFree === true || form.isFree === 'true'} onChange={(e) => setForm({ ...form, isFree: e.target.checked })} />
                <span className="font-mono text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">Free</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.isPremium === true || form.isPremium === 'true' ? 'bg-amber-500 border-amber-500' : 'border-stone-300 dark:border-stone-500 group-hover:border-stone-400'}`}>
                  {(form.isPremium === true || form.isPremium === 'true') && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                <input type="checkbox" className="hidden" checked={form.isPremium === true || form.isPremium === 'true'} onChange={(e) => setForm({ ...form, isPremium: e.target.checked })} />
                <span className="font-mono text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">Premium</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all h-20 resize-none" placeholder="Brief description of the note..." />
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-white rounded-xl font-mono text-sm transition-all flex items-center gap-2">
              {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {editing ? 'Update Note' : 'Create Note'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm) }} className="px-4 py-2.5 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 rounded-xl font-mono text-sm hover:bg-stone-200 dark:hover:bg-stone-600 transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-sm">
        {loading ? (
          <div className="animate-pulse p-6 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-stone-200 dark:bg-stone-700 rounded" />
                  <div className="h-3 w-1/2 bg-stone-200 dark:bg-stone-700 rounded" />
                </div>
                <div className="w-16 h-6 bg-stone-200 dark:bg-stone-700 rounded-full" />
                <div className="w-12 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
                <div className="w-20 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-700/30">
                  <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center">
                      <div className="text-stone-300 dark:text-stone-500 text-3xl mb-2">☰</div>
                      <p className="text-stone-400 font-sans text-sm">No notes yet</p>
                      <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm) }} className="mt-3 text-xs font-mono text-amber-600 hover:text-amber-500">+ Add your first note</button>
                    </td>
                  </tr>
                )}
                {notes.map((note, i) => (
                  <tr key={note.id} className={`border-b border-stone-100 dark:border-stone-700/50 hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors ${i % 2 === 0 ? '' : 'bg-stone-50/30 dark:bg-stone-800/30'}`}>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-stone-800 dark:text-stone-200">{note.title}</div>
                      {note.description && <div className="text-xs text-stone-400 mt-0.5 line-clamp-1">{note.description}</div>}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono ${
                        note.category === 'pyq'
                          ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                          : 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                      }`}>
                        {note.category || 'note'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-stone-500 uppercase">{note.fileType || 'pdf'}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        {note.isFree && <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">free</span>}
                        {note.isPremium && <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">premium</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button onClick={() => handleEdit(note)} className="px-3 py-1.5 text-xs font-mono text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all mr-1.5">Edit</button>
                      <button onClick={() => handleDelete(note.id, note.title)} className="px-3 py-1.5 text-xs font-mono text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {notes.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-5">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm font-mono text-stone-600 dark:text-stone-400 disabled:opacity-30 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all disabled:cursor-not-allowed">
            ← Previous
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
              if (p > totalPages) return null
              return (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-xs font-mono transition-all ${
                  p === page
                    ? 'bg-amber-500 text-white'
                    : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}>
                  {p}
                </button>
              )
            })}
          </div>
          <button onClick={() => setPage(p => p + 1)} disabled={notes.length < 20} className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm font-mono text-stone-600 dark:text-stone-400 disabled:opacity-30 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all disabled:cursor-not-allowed">
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

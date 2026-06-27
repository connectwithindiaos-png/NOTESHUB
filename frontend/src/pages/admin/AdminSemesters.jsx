import { useState, useEffect } from 'react'
import { fetchAdminSemesters, fetchAdminCourses, createSemester, updateSemester, deleteSemester } from '../../utils/api'
import ConfirmModal from '../../components/admin/ConfirmModal'
import toast from 'react-hot-toast'

const emptyForm = { courseId: '', semesterNumber: '', name: '', slug: '' }

function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center gap-4 p-4 border-b border-stone-100 dark:border-stone-700/50">
      <div className="h-4 w-12 bg-stone-200 dark:bg-stone-700 rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 bg-stone-200 dark:bg-stone-700 rounded" />
        <div className="h-3 w-1/4 bg-stone-200 dark:bg-stone-700 rounded" />
      </div>
      <div className="w-16 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
      <div className="w-20 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
    </div>
  )
}

export default function AdminSemesters() {
  const [semesters, setSemesters] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [confirm, setConfirm] = useState({ open: false, id: '', name: '' })
  const [saving, setSaving] = useState(false)
  const [courseOptions, setCourseOptions] = useState([])

  const loadCourses = () => {
    fetchAdminCourses()
      .then(data => setCourseOptions(Array.isArray(data) ? data : []))
      .catch(() => {})
  }

  const load = () => {
    setLoading(true)
    fetchAdminSemesters()
      .then(data => setSemesters(Array.isArray(data) ? data : []))
      .catch(err => toast.error('Failed to load semesters: ' + err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(); loadCourses() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        await updateSemester(editing, { name: form.name, slug: form.slug || undefined })
        toast.success('Semester updated successfully')
      } else {
        await createSemester({
          courseId: form.courseId,
          semesterNumber: parseInt(form.semesterNumber),
          name: form.name,
          slug: form.slug || undefined,
        })
        toast.success('Semester created successfully')
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

  const handleEdit = (sem) => {
    setEditing(sem.id)
    setForm({
      courseId: sem.courseId || '',
      semesterNumber: String(sem.semesterNumber || ''),
      name: sem.name || '',
      slug: sem.slug || '',
    })
    setShowForm(true)
  }

  const handleDelete = (id, name) => {
    setConfirm({ open: true, id, name })
  }

  const confirmDelete = async () => {
    try {
      await deleteSemester(confirm.id)
      toast.success('Semester deleted successfully')
      setConfirm({ open: false, id: '', name: '' })
      load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const semesterRange = [1, 2, 3, 4, 5, 6, 7, 8]

  const getCourseName = (courseId) => {
    const c = courseOptions.find(c => c.id === courseId || c.slug === courseId)
    return c ? c.name : courseId
  }

  return (
    <div>
      <ConfirmModal
        open={confirm.open}
        title="Delete Semester"
        message={`Delete "${confirm.name}"? This will also remove related subjects and notes. This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={confirmDelete}
        onCancel={() => setConfirm({ open: false, id: '', name: '' })}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Semesters</h1>
          <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-1">{semesters.length} semester{semesters.length !== 1 ? 's' : ''} across all courses</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyForm) }}
          className={`px-4 py-2 rounded-xl font-mono text-sm transition-all ${
            showForm
              ? 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-600'
              : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          {showForm ? 'Cancel' : '+ Add Semester'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-sm text-emerald-700 dark:text-emerald-300 font-mono font-bold">
              {editing ? '✎' : '+'}
            </span>
            <h2 className="font-mono text-sm font-semibold text-stone-700 dark:text-stone-300">
              {editing ? 'Edit Semester' : 'New Semester'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Course *</label>
              <select value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" required disabled={!!editing}>
                <option value="">Select course</option>
                {courseOptions.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} — {c.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Semester Number *</label>
              <select value={form.semesterNumber} onChange={(e) => setForm({ ...form, semesterNumber: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" required disabled={!!editing}>
                <option value="">Select number</option>
                {semesterRange.map(n => (
                  <option key={n} value={n}>Semester {n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="e.g. Semester 1" required />
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="e.g. semester-1" disabled={!!editing} />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-white rounded-xl font-mono text-sm transition-all flex items-center gap-2">
              {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {editing ? 'Update Semester' : 'Create Semester'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm) }} className="px-4 py-2.5 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 rounded-xl font-mono text-sm hover:bg-stone-200 dark:hover:bg-stone-600 transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-700/30">
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">#</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Course</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Slug</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Subjects</th>
                <th className="text-right px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : semesters.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center">
                    <div className="text-stone-300 dark:text-stone-500 text-3xl mb-2">⊡</div>
                    <p className="text-stone-400 font-sans text-sm">No semesters yet</p>
                    <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm) }} className="mt-3 text-xs font-mono text-amber-600 hover:text-amber-500">+ Add your first semester</button>
                  </td>
                </tr>
              ) : (
                semesters.map((sem, i) => (
                  <tr key={sem.id} className={`border-b border-stone-100 dark:border-stone-700/50 hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors ${i % 2 === 0 ? '' : 'bg-stone-50/30 dark:bg-stone-800/30'}`}>
                    <td className="px-4 py-3.5 font-mono text-stone-500">{sem.semesterNumber}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-stone-800 dark:text-stone-200">{sem.name}</div>
                    </td>
                    <td className="px-4 py-3.5 text-stone-600 dark:text-stone-400">{getCourseName(sem.courseId)}</td>
                    <td className="px-4 py-3.5 font-mono text-xs text-stone-500">{sem.slug}</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                        {sem.totalSubjects} sub{sem.totalSubjects !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button onClick={() => handleEdit(sem)} className="px-3 py-1.5 text-xs font-mono text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all mr-1.5">Edit</button>
                      <button onClick={() => handleDelete(sem.id, sem.name)} className="px-3 py-1.5 text-xs font-mono text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

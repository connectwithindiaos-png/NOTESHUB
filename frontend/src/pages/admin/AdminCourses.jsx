import { useState, useEffect } from 'react'
import { fetchAdminCourses, createCourse, updateCourse, deleteCourse } from '../../utils/api'
import ConfirmModal from '../../components/admin/ConfirmModal'
import toast from 'react-hot-toast'

const emptyForm = {
  name: '', fullName: '', slug: '', description: '', longDescription: '',
  duration: '', totalSemesters: '', totalSubjects: '', keywords: '',
}

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [confirm, setConfirm] = useState({ open: false, slug: '' })
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    fetchAdminCourses()
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(err => toast.error('Failed to load courses: ' + err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        await updateCourse(editing, form)
        toast.success('Course updated successfully')
      } else {
        await createCourse(form)
        toast.success('Course created successfully')
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

  const handleEdit = (course) => {
    setEditing(course.slug)
    setForm({
      name: course.name || '',
      fullName: course.fullName || '',
      slug: course.slug || '',
      description: course.description || '',
      longDescription: course.longDescription || '',
      duration: course.duration || '',
      totalSemesters: course.totalSemesters ? String(course.totalSemesters) : '',
      totalSubjects: course.totalSubjects ? String(course.totalSubjects) : '',
      keywords: course.keywords || '',
    })
    setShowForm(true)
  }

  const handleDelete = (slug) => {
    setConfirm({ open: true, slug })
  }

  const confirmDelete = async () => {
    try {
      await deleteCourse(confirm.slug)
      toast.success('Course deleted successfully')
      setConfirm({ open: false, slug: '' })
      load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-7 w-28 bg-stone-200 dark:bg-stone-700 rounded-lg mb-2" />
            <div className="h-4 w-48 bg-stone-200 dark:bg-stone-700 rounded" />
          </div>
          <div className="h-10 w-28 bg-stone-200 dark:bg-stone-700 rounded-xl" />
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-stone-100 dark:border-stone-700/50">
              <div className="flex-1 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="w-20 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="w-16 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="w-10 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="w-16 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <ConfirmModal
        open={confirm.open}
        title="Delete Course"
        message={`Delete "${confirm.slug}"? This will also remove related semesters, subjects, and notes. This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={confirmDelete}
        onCancel={() => setConfirm({ open: false, slug: '' })}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Courses</h1>
          <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-1">{courses.length} course{courses.length !== 1 ? 's' : ''} in the database</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyForm) }}
          className={`px-4 py-2 rounded-xl font-mono text-sm transition-all ${
            showForm
              ? 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-600'
              : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          {showForm ? 'Cancel' : '+ Add Course'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-sm text-amber-700 dark:text-amber-300 font-mono font-bold">
              {editing ? '✎' : '+'}
            </span>
            <h2 className="font-mono text-sm font-semibold text-stone-700 dark:text-stone-300">
              {editing ? 'Edit Course' : 'New Course'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="B.Tech CSE" required />
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Slug *</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed" placeholder="btech-cse" required={!editing} disabled={!!editing} />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="B.Tech Computer Science Engineering" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all h-16 resize-none" placeholder="Short description..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Long Description</label>
              <textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all h-20 resize-none" placeholder="Detailed description..." />
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Duration</label>
              <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="4 Years" />
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Total Semesters</label>
              <input type="number" value={form.totalSemesters} onChange={(e) => setForm({ ...form, totalSemesters: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" min="1" max="12" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Keywords</label>
              <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="btech, computer science, engineering" />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-white rounded-xl font-mono text-sm transition-all flex items-center gap-2">
              {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {editing ? 'Update Course' : 'Create Course'}
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
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Slug</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Duration</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Semesters</th>
                <th className="text-left px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3.5 font-mono text-xs text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center">
                    <div className="text-stone-300 dark:text-stone-500 text-3xl mb-2">⊞</div>
                    <p className="text-stone-400 font-sans text-sm">No courses in the database</p>
                    <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm) }} className="mt-3 text-xs font-mono text-amber-600 hover:text-amber-500">+ Add your first course</button>
                  </td>
                </tr>
              )}
              {courses.map((course, i) => (
                <tr key={course.id} className={`border-b border-stone-100 dark:border-stone-700/50 hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors ${i % 2 === 0 ? '' : 'bg-stone-50/30 dark:bg-stone-800/30'}`}>
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-stone-800 dark:text-stone-200">{course.name}</div>
                    {course.fullName && <div className="text-xs text-stone-400 mt-0.5">{course.fullName}</div>}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-stone-500">{course.slug}</td>
                  <td className="px-4 py-3.5 text-stone-600 dark:text-stone-400">{course.duration || '-'}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-sm font-semibold text-stone-700 dark:text-stone-300">{course.totalSemesters || 0}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono ${
                      course.isActive !== false
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${course.isActive !== false ? 'bg-emerald-500' : 'bg-red-400'}`} />
                      {course.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button onClick={() => handleEdit(course)} className="px-3 py-1.5 text-xs font-mono text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all mr-1.5">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(course.slug)} className="px-3 py-1.5 text-xs font-mono text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

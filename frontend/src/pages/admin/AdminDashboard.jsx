import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAdminDashboard } from '../../utils/api'
import toast from 'react-hot-toast'

const statCards = [
  { key: 'courses', label: 'Courses', to: '/admin/courses', color: 'amber', icon: '⊞' },
  { key: 'subjects', label: 'Subjects', to: '/admin/subjects', color: 'emerald', icon: '⊡' },
  { key: 'notes', label: 'Notes', to: '/admin/notes', color: 'cyan', icon: '☰' },
  { key: 'semesters', label: 'Semesters', to: null, color: 'violet', icon: '◈' },
]

const colorMap = {
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
    icon: 'bg-amber-100 dark:bg-amber-900/40',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-700 dark:text-cyan-300',
    icon: 'bg-cyan-100 dark:bg-cyan-900/40',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-800',
    text: 'text-violet-700 dark:text-violet-300',
    icon: 'bg-violet-100 dark:bg-violet-900/40',
  },
}

function StatSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800">
          <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-xl mb-3" />
          <div className="h-8 w-16 bg-stone-200 dark:bg-stone-700 rounded-lg mb-2" />
          <div className="h-4 w-20 bg-stone-200 dark:bg-stone-700 rounded" />
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminDashboard()
      .then(data => setStats(data))
      .catch(err => toast.error('Failed to load dashboard: ' + err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Dashboard</h1>
        <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-1">Overview of your NotesHub content</p>
      </div>

      {loading ? (
        <StatSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => {
              const data = stats?.[card.key]
              const total = data?.total ?? 0
              const active = data?.active
              const c = colorMap[card.color]
              const Wrapper = card.to ? Link : 'div'
              const wrapperProps = card.to ? { to: card.to } : {}

              return (
                <Wrapper
                  key={card.key}
                  {...wrapperProps}
                  className={`p-5 rounded-xl border ${c.bg} ${c.border} ${card.to ? 'hover:shadow-md cursor-pointer' : ''} transition-all`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center text-lg ${c.text}`}>
                      {card.icon}
                    </span>
                    <span className={`font-mono text-3xl font-bold text-stone-800 dark:text-stone-100`}>{total}</span>
                  </div>
                  <p className={`font-mono text-xs ${c.text} uppercase tracking-wider`}>
                    {card.label}
                    {active !== undefined && active !== null && (
                      <span className="ml-2 font-sans lowercase text-stone-400">
                        ({active} active)
                      </span>
                    )}
                  </p>
                </Wrapper>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
              <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <Link to="/admin/subjects" className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 rounded-xl font-mono text-xs hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all">
                  <span>+</span> Add Subject
                </Link>
                <Link to="/admin/notes" className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-xl font-mono text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all">
                  <span>+</span> Add Note
                </Link>
                <Link to="/admin/pyqs" className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 rounded-xl font-mono text-xs hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-all">
                  <span>+</span> Add PYQ
                </Link>
                <Link to="/admin/courses" className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-xl font-mono text-xs hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all">
                  <span>+</span> Add Course
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
              <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4">Content Summary</h2>
              <div className="space-y-3">
                {[
                  { label: 'Students', value: stats?.users?.students ?? 0, color: 'text-amber-600' },
                  { label: 'Active Content', value: stats?.notes?.active ?? 0, color: 'text-emerald-600' },
                  { label: 'Total Views', value: stats?.notes?.totalViews ?? 0, color: 'text-cyan-600' },
                  { label: 'Total Downloads', value: stats?.notes?.totalDownloads ?? 0, color: 'text-violet-600' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-stone-100 dark:border-stone-700 last:border-0">
                    <span className="font-mono text-xs text-stone-500 dark:text-stone-400">{item.label}</span>
                    <span className={`font-mono text-sm font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

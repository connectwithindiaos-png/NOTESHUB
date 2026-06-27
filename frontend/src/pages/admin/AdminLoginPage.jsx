import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { adminLogin } from '../../utils/api'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    setLoading(true)
    try {
      const data = await adminLogin(email, password)
      localStorage.setItem('noteshub-token', data.accessToken)
      toast.success('Welcome back, admin!')
      setTimeout(() => navigate(from, { replace: true }), 300)
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 mb-4 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30">
            <span className="text-white font-bold text-xl font-serif">N</span>
          </div>
          <h1 className="font-serif text-3xl text-amber-900 dark:text-amber-200 mb-1">NotesHub</h1>
          <p className="font-mono text-xs text-stone-400 uppercase tracking-[0.25em]">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 rounded-2xl p-8 border border-stone-200 dark:border-stone-700 shadow-lg shadow-stone-200/50 dark:shadow-black/20">
          <div className="mb-5">
            <label htmlFor="email" className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
              Email address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                placeholder="admin@noteshub.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-white font-semibold rounded-xl transition-all font-mono text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-200/50 dark:hover:shadow-amber-900/30 disabled:shadow-none"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 font-mono text-[10px] text-stone-400 uppercase tracking-wider">
          Authorized personnel only
        </p>
      </div>
    </div>
  )
}

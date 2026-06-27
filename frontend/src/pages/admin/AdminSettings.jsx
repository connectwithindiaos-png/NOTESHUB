import { useState, useEffect } from 'react'
import { fetchSettings, updateSettings, changePassword } from '../../utils/api'
import toast from 'react-hot-toast'

function SkeletonBlock() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="h-5 w-32 bg-stone-200 dark:bg-stone-700 rounded" />
      <div className="h-10 w-full bg-stone-200 dark:bg-stone-700 rounded-xl" />
      <div className="h-10 w-full bg-stone-200 dark:bg-stone-700 rounded-xl" />
      <div className="h-10 w-full bg-stone-200 dark:bg-stone-700 rounded-xl" />
    </div>
  )
}

export default function AdminSettings() {
  const [settings, setSettings] = useState({ telegramUrl: '', whatsappUrl: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [changingPass, setChangingPass] = useState(false)

  const load = () => {
    setLoading(true)
    fetchSettings()
      .then(data => setSettings({ telegramUrl: data.telegramUrl || '', whatsappUrl: data.whatsappUrl || '', email: data.email || '' }))
      .catch(err => toast.error('Failed to load settings: ' + err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const updated = await updateSettings({
        telegram_url: settings.telegramUrl,
        whatsapp_url: settings.whatsappUrl,
        email: settings.email,
      })
      setSettings({ telegramUrl: updated.telegramUrl || '', whatsappUrl: updated.whatsappUrl || '', email: updated.email || '' })
      toast.success('Settings saved')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passForm.newPassword !== passForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (passForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }
    setChangingPass(true)
    try {
      await changePassword({ currentPassword: passForm.currentPassword, newPassword: passForm.newPassword })
      toast.success('Password changed successfully')
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setChangingPass(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Settings</h1>
        <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-1">Manage social links and account security</p>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-sm">
          <SkeletonBlock />
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-sm text-amber-700 dark:text-amber-300 font-mono font-bold">&#9881;</span>
            <h2 className="font-mono text-sm font-semibold text-stone-700 dark:text-stone-300">Social Links</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Telegram URL</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">&#9993;</span>
                <input type="url" value={settings.telegramUrl} onChange={(e) => setSettings({ ...settings, telegramUrl: e.target.value })} className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="https://t.me/noteshub" />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">WhatsApp URL</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">&#9993;</span>
                <input type="url" value={settings.whatsappUrl} onChange={(e) => setSettings({ ...settings, whatsappUrl: e.target.value })} className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="https://wa.me/1234567890" />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">&#64;</span>
                <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="hello@noteshub.com" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-white rounded-xl font-mono text-sm transition-all flex items-center gap-2">
            {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            Save Changes
          </button>
        </form>
      )}

      <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-sm text-rose-700 dark:text-rose-300 font-mono font-bold">&#9878;</span>
          <h2 className="font-mono text-sm font-semibold text-stone-700 dark:text-stone-300">Change Password</h2>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Current Password</label>
            <input type="password" value={passForm.currentPassword} onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" required />
          </div>
          <div>
            <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">New Password</label>
            <input type="password" value={passForm.newPassword} onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" required minLength={6} />
          </div>
          <div>
            <label className="block font-mono text-xs text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Confirm New Password</label>
            <input type="password" value={passForm.confirmPassword} onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })} className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" required minLength={6} />
          </div>
          <button type="submit" disabled={changingPass} className="px-6 py-2.5 bg-rose-500 hover:bg-rose-400 disabled:bg-rose-300 text-white rounded-xl font-mono text-sm transition-all flex items-center gap-2">
            {changingPass && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            Change Password
          </button>
        </form>
      </div>
    </div>
  )
}

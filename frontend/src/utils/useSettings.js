import { useState, useEffect } from 'react'
import { fetchPublicSettings } from './api'

const defaults = {
  telegramUrl: 'https://t.me/noteshub',
  whatsappUrl: 'https://wa.me/1234567890',
  email: 'hello@noteshub.com',
}

let cached = null
let promise = null

function load() {
  if (cached) return Promise.resolve(cached)
  if (promise) return promise
  promise = fetchPublicSettings()
    .then(data => {
      cached = { telegramUrl: data.telegramUrl || defaults.telegramUrl, whatsappUrl: data.whatsappUrl || defaults.whatsappUrl, email: data.email || defaults.email }
      return cached
    })
    .catch(() => {
      cached = defaults
      return cached
    })
  return promise
}

export default function useSettings() {
  const [settings, setSettings] = useState(defaults)

  useEffect(() => {
    load().then(setSettings)
  }, [])

  return settings
}

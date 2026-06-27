export const SITE_URL = import.meta.env?.VITE_SITE_URL
  || (typeof window !== 'undefined' ? window.location.origin : process.env.VITE_SITE_URL || 'http://localhost:5173')
export const API_URL = import.meta.env?.VITE_API_URL
  || (typeof window !== 'undefined' ? '/api/v1' : process.env.VITE_API_URL || '/api/v1')

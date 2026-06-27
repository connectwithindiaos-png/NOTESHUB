import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './hooks/ThemeContext'
import './index.css'
import App from './App.jsx'

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-amber-50/30 dark:bg-stone-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-brand-300 dark:border-brand-600 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin mx-auto mb-4" />
      <p className="font-mono text-sm text-stone-500 dark:text-stone-400">loading...</p>
    </div>
  </div>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Suspense fallback={<LoadingFallback />}>
            <App />
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

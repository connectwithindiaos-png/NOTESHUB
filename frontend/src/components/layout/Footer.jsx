import { Link } from 'react-router-dom'
import useSettings from '../../utils/useSettings'

const resources = [
  { to: '/search', label: 'Search Notes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

const extras = [
  { to: '/privacy-policy', label: 'Privacy' },
  { to: '/terms-of-service', label: 'Terms' },
  { to: '/sitemap.xml', label: 'Sitemap' },
]

export default function Footer() {
  const { telegramUrl, whatsappUrl, email } = useSettings()
  return (
    <footer className="relative" role="contentinfo">
      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
        <div className="bg-amber-50/90 dark:bg-stone-900 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-6">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
              <div className="lg:w-2/5">
                <Link to="/" className="flex items-center gap-3 group mb-4" aria-label="NotesHub Home">
                  <div className="-rotate-1 group-hover:rotate-0 transition-transform duration-500">
                    <img src="/brandlogo.png" alt="NotesHub" className="h-8 w-8 rounded-full object-cover ring-2 ring-amber-600/60 group-hover:ring-amber-400 transition-all duration-500" />
                  </div>
                  <span className="font-serif text-lg text-amber-700 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-100 transition-colors">NotesHub</span>
                </Link>
                <p className="font-serif italic text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
                  &ldquo;education should be free, forever.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-sky-400 hover:bg-amber-100 dark:hover:bg-stone-800 transition-all" aria-label="Join us on Telegram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-emerald-400 hover:bg-amber-100 dark:hover:bg-stone-800 transition-all" aria-label="Chat on WhatsApp">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                  <a href={`mailto:${email}`} className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-amber-400 hover:bg-amber-100 dark:hover:bg-stone-800 transition-all" aria-label="Email us">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="lg:w-3/5 flex gap-10 lg:gap-16">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4">Navigate</h3>
                  <ul className="space-y-2.5">
                    {resources.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to} className="font-sans text-sm text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4">More</h3>
                  <ul className="space-y-2.5">
                    {extras.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to} className="font-sans text-sm text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-5 border-t border-amber-200/60 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="font-sans text-xs text-stone-400 dark:text-stone-600">
                &copy; {new Date().getFullYear()} NotesHub — share, learn, grow.
              </p>
              <span className="font-mono text-[10px] text-stone-400 dark:text-stone-600">
                crafted with <span className="text-rose-500/70">&hearts;</span> for curious minds
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

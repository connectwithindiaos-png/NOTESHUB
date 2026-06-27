import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-5" aria-label="Hero section">
      <div
        className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[calc(100vh-7rem)] flex items-center overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.7)), url(/hero-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" aria-hidden="true" style={{ backgroundSize: '200px 200px', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <motion.div
              className="flex-1 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-xs sm:text-sm text-rose-300/80 uppercase tracking-[0.2em] mb-5">
                no paywalls, just notes.
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[1.15] mb-2">
                Engineering notes.{' '}
                <span className="text-amber-400/90">No fluff.</span>
              </h1>
              <svg className="w-24 h-3 mb-6 text-amber-400/30" viewBox="0 0 96 8" fill="none" aria-hidden="true">
                <path d="M2,4 Q12,0 24,4 T48,4 T72,4 T94,4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>

              <p className="font-sans text-base sm:text-lg text-stone-300/80 leading-relaxed mb-8">
                Semester-wise PDFs, previous year papers, and study materials —
                all free, all actually useful. Built by students who've been
                through the grind.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  Browse Courses
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-stone-500/60 text-stone-300 font-medium rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  All Notes
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="hidden lg:block absolute bottom-0 -right-4 lg:-right-8 w-[46%] lg:w-[44%] h-full"
          initial={{ opacity: 0, x: 40, rotate: 0.6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <svg
            viewBox="0 -100 500 700"
            fill="none"
            className="w-full h-full"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
            style={{ fontFamily: 'Caveat, Kalam, "Segoe Print", "Bradley Hand", cursive' }}
          >
            <defs>
              <filter id="paper-shadow" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="-2" dy="4" stdDeviation="6" floodColor="#292524" floodOpacity="0.08" />
              </filter>
              <filter id="sticky-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="#292524" floodOpacity="0.12" />
              </filter>
            </defs>

            <rect x="0" y="0" width="500" height="600" rx="3" fill="#FFFDF5" stroke="#D6D3C8" strokeWidth="0.8" filter="url(#paper-shadow)" />

            <path d="M460 0 L500 0 L500 40 Z" fill="#F5F0E8" stroke="#D6D3C8" strokeWidth="0.6" />
            <path d="M460 0 L460 40 L500 0" fill="#EDE8DB" opacity="0.5" />
            <path d="M460 0 L460 6 L492 0" fill="#E8E3D5" opacity="0.6" />

            <line x1="80" y1="8" x2="80" y2="600" stroke="#FCA5A5" strokeWidth="1.5" opacity="0.2" />

            <line x1="100" y1="56" x2="440" y2="56" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="100" x2="440" y2="100" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="144" x2="440" y2="144" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="188" x2="440" y2="188" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="232" x2="440" y2="232" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="276" x2="440" y2="276" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="320" x2="440" y2="320" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="364" x2="440" y2="364" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="408" x2="440" y2="408" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="452" x2="440" y2="452" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="496" x2="440" y2="496" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="540" x2="440" y2="540" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />
            <line x1="100" y1="584" x2="440" y2="584" stroke="#DCD8CC" strokeWidth="0.6" opacity="0.4" />

            <g transform="rotate(-0.8 260 48)">
              <text x="100" y="48" fontSize="20" fontWeight="600" fill="#1C1917" opacity="0.85">Engineering Notes</text>
              <path d="M100 52 Q200 58 310 52" stroke="#1C1917" strokeWidth="0.6" fill="none" opacity="0.15" />
            </g>

            <g transform="rotate(0.4 260 88)">
              <text x="100" y="88" fontSize="13" fill="#57534E" opacity="0.7">B.Tech CSE · Semester 4 — Mathematics</text>
            </g>

            <g transform="rotate(-0.3 260 132)">
              <text x="100" y="132" fontSize="16" fontWeight="500" fill="#1C1917" opacity="0.8">Vector Spaces &amp; Linear Algebra</text>
              <path d="M100 136 Q180 140 330 136" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.25" />
            </g>

            <g transform="rotate(0.5 260 172)">
              <text x="100" y="172" fontSize="12" fill="#78716C" opacity="0.5">Definition:</text>
              <text x="148" y="172" fontSize="12" fill="#78716C" opacity="0.5">A vector space V over a field F</text>
              <text x="340" y="172" fontSize="12" fill="#B91C1C" opacity="0.4" textDecoration="line-through">is a set</text>
              <path d="M338 168 L370 176" stroke="#B91C1C" strokeWidth="0.8" opacity="0.3" />
            </g>

            <g transform="rotate(-0.5 260 212)">
              <text x="100" y="212" fontSize="13" fontWeight="500" fill="#047857" opacity="0.7">Properties of Vector Spaces:</text>
              <path d="M100 216 Q115 219 120 216" stroke="#047857" strokeWidth="1.5" fill="none" opacity="0.4" />
            </g>

            <g transform="rotate(0.3 260 248)">
              <circle cx="106" cy="244" r="3" fill="#D97706" opacity="0.5" />
              <text x="116" y="248" fontSize="12" fill="#1C1917" opacity="0.65">Closure under addition: u + v ∈ V</text>
            </g>
            <g transform="rotate(-0.2 260 288)">
              <circle cx="106" cy="284" r="3" fill="#D97706" opacity="0.5" />
              <text x="116" y="288" fontSize="12" fill="#1C1917" opacity="0.65">Scalar multiplication: c · v ∈ V</text>
            </g>
            <g transform="rotate(0.4 260 328)">
              <circle cx="106" cy="324" r="3" fill="#D97706" opacity="0.5" />
              <text x="116" y="328" fontSize="12" fill="#1C1917" opacity="0.65">Existence of zero vector: v + 0 = v</text>
            </g>

            <rect x="92" y="338" width="215" height="28" rx="3" fill="#FDE68A" opacity="0.2" transform="rotate(0.2 200 352)" />
            <g transform="rotate(0.2 200 355)">
              <text x="100" y="356" fontSize="13" fontWeight="600" fill="#B45309" opacity="0.75">Key Formula: v + 0 = v</text>
            </g>

            <g transform="rotate(-0.6 260 392)">
              <text x="100" y="392" fontSize="13" fontWeight="500" fill="#1C1917" opacity="0.7">Important: Linear Independence</text>
              <path d="M100 396 Q150 400 200 398 T310 396" stroke="#B91C1C" strokeWidth="0.8" fill="none" opacity="0.25" />
            </g>

            <g transform="rotate(0.3 260 432)">
              <text x="100" y="432" fontSize="12" fill="#1C1917" opacity="0.6">A set of vectors is linearly independent if</text>
            </g>
            <g transform="rotate(-0.1 260 468)">
              <text x="100" y="468" fontSize="12" fill="#1C1917" opacity="0.6">no vector can be written as a combination</text>
            </g>
            <g transform="rotate(0.2 260 504)">
              <text x="100" y="504" fontSize="12" fill="#1C1917" opacity="0.6">{'of the others. Eg: {v1, v2, ..., vn}'}</text>
            </g>

            <g transform="rotate(-0.4 260 540)">
              <text x="100" y="540" fontSize="12" fontWeight="500" fill="#047857" opacity="0.6">Linear combination: c1v1 + c2v2 + ... + cnvn</text>
            </g>

            <g transform="rotate(0.5 390 545)">
              <text x="370" y="548" fontSize="11" fill="#78716C" opacity="0.3">p. 42</text>
            </g>

            <g transform="rotate(-2.5 90 542)">
              <path d="M88 540 L92 546 L100 536" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="104" y="544" fontSize="10" fill="#059669" opacity="0.35">done</text>
            </g>

            <g transform="rotate(2 260 102)">
              <path d="M420 98 Q425 92 430 100 Q435 108 440 96" stroke="#1C1917" strokeWidth="0.5" fill="none" opacity="0.15" />
              <text x="416" y="98" fontSize="8" fill="#1C1917" opacity="0.2">revise later ✦</text>
            </g>

            <g transform="rotate(-4 425 180)">
              <text x="410" y="180" fontSize="9" fill="#B91C1C" opacity="0.25">important!</text>
            </g>

            <g transform="rotate(1.5 420 580)">
              <text x="390" y="590" fontSize="9" fill="#78716C" opacity="0.2">studynoteshub · 2026</text>
            </g>

            <g transform="rotate(6 390 130)">
              <rect x="375" y="118" width="90" height="65" rx="2" fill="#FEF9C3" stroke="#FDE68A" strokeWidth="0.6" filter="url(#sticky-shadow)" />
              <text x="382" y="136" fontSize="10" fontWeight="500" fill="#B45309" opacity="0.6">Quiz next week!</text>
              <text x="382" y="150" fontSize="9" fill="#92400E" opacity="0.4">Chapter 3-5</text>
              <text x="382" y="164" fontSize="9" fill="#92400E" opacity="0.4">Vector spaces</text>
              <text x="382" y="178" fontSize="9" fill="#B91C1C" opacity="0.35">+ Eigenvalues</text>
            </g>

            <circle cx="140" cy="580" r="18" fill="#D6D3C8" opacity="0.06" />
            <circle cx="140" cy="580" r="14" fill="#D6D3C8" opacity="0.04" />
            <circle cx="140" cy="580" r="10" fill="none" stroke="#D6D3C8" strokeWidth="0.5" opacity="0.08" />

            <circle cx="460" cy="560" r="12" fill="#FCA5A5" opacity="0.04" />
            <circle cx="460" cy="560" r="9" fill="none" stroke="#FCA5A5" strokeWidth="0.5" opacity="0.06" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

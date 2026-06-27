import { motion } from 'framer-motion'

function hashRotation(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return ((hash % 25) - 10) / 10
}

const features = [
  {
    title: 'Free Access',
    description: 'All notes are completely free — no subscriptions, no paywalls, no hidden charges. Education should not cost a thing.',
    accent: 'amber',
    rotation: hashRotation('Free Access'),
    padTop: true,
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
        <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Semester Wise',
    description: 'Everything organized by semester. No more digging through scattered files — find exactly what you need, when you need it.',
    accent: 'rose',
    rotation: hashRotation('Semester Wise'),
    padLeft: true,
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <polygon points="20,4 36,14 36,26 20,36 4,26 4,14" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Expert Curated',
    description: 'Notes reviewed by educators and toppers. Quality checked so you study what actually matters for your exams.',
    accent: 'emerald',
    rotation: hashRotation('Expert Curated'),
    padTop: true,
    padLeft: true,
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M20 16l3 6 6 1-4.5 4.5 1 6.5L20 30l-5.5 3 1-6.5L11 23l6-1 3-6z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'PDF Download',
    description: 'Download any note as PDF. Study offline, print them out, share with friends — zero restrictions.',
    accent: 'cyan',
    rotation: hashRotation('PDF Download'),
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <path d="M12 8h10l6 6v18a2 2 0 01-2 2H12a2 2 0 01-2-2V10a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" />
        <path d="M22 8v6h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 22l4 4 4-4M20 26V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Regular Updates',
    description: 'Syllabus changed? We update right away. Our notes stay current with the latest curriculum from all major universities.',
    accent: 'warm-stone',
    rotation: hashRotation('Regular Updates'),
    padTop: true,
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <path d="M20 8v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
        <path d="M12 5l-3 7 7-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'All Courses',
    description: 'B.Tech (CSE, AI, DS, ML, IT, ECE, EE, ME), BCA, B.Sc CS — we cover your entire engineering journey.',
    accent: 'orange',
    rotation: hashRotation('All Courses'),
    padLeft: true,
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <path d="M8 12h24M8 20h24M8 28h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="4" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
]

const accentMap = {
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    icon: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    shadow: 'shadow-amber-200/50',
    title: 'text-stone-800 dark:text-stone-200',
    desc: 'text-stone-500 dark:text-stone-400',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-700',
    icon: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
    shadow: 'shadow-rose-200/50',
    title: 'text-stone-800 dark:text-stone-200',
    desc: 'text-stone-500 dark:text-stone-400',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    icon: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    shadow: 'shadow-emerald-200/50',
    title: 'text-stone-800 dark:text-stone-200',
    desc: 'text-stone-500 dark:text-stone-400',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-700',
    icon: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/40',
    shadow: 'shadow-cyan-200/50',
    title: 'text-stone-800 dark:text-stone-200',
    desc: 'text-stone-500 dark:text-stone-400',
  },
  'warm-stone': {
    bg: 'bg-stone-50 dark:bg-stone-700/50',
    border: 'border-stone-200 dark:border-stone-600',
    icon: 'text-stone-600 dark:text-stone-400',
    iconBg: 'bg-stone-100 dark:bg-stone-600',
    shadow: 'shadow-stone-200/50',
    title: 'text-stone-800 dark:text-stone-200',
    desc: 'text-stone-500 dark:text-stone-400',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-700',
    icon: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    shadow: 'shadow-orange-200/50',
    title: 'text-stone-800 dark:text-stone-200',
    desc: 'text-stone-500 dark:text-stone-400',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function FeaturesSection() {
  return (
    <section
      className="py-20 sm:py-28 bg-stone-50 dark:bg-stone-800/60 overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em] mb-3">
            why NotesHub
          </p>
          <h2
            id="features-heading"
            className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight mb-3"
          >
            Built different. Built for you.
          </h2>
          <p className="font-sans text-base text-stone-500 dark:text-stone-400 leading-relaxed">
            Six reasons students trust us for their semester prep — no fluff, just quality.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, i) => {
            const colors = accentMap[feature.accent]
            const isSecondRow = i >= 3
            return (
              <motion.article
                key={feature.title}
                variants={itemVariants}
                className={`group rounded-2xl border ${colors.bg} ${colors.border} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${colors.shadow} ${
                  isSecondRow ? 'lg:mt-8' : ''
                } ${feature.padTop ? 'pt-8 sm:pt-10' : 'pt-6 sm:pt-8'} ${
                  feature.padLeft ? 'pl-6 sm:pl-8' : 'pl-6 sm:pl-8'
                } pr-6 sm:pr-8 pb-6 sm:pb-8`}
                style={{ transform: 'rotate(' + feature.rotation + 'deg)' }}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} ${colors.icon} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className={`font-serif text-lg font-bold ${colors.title} mb-2`}>
                  {feature.title}
                </h3>
                <p className={`font-sans text-sm ${colors.desc} leading-relaxed`}>
                  {feature.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function FeaturesSectionWrapper() {
  return (
    <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
      <FeaturesSection />
    </div>
  )
}

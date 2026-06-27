import { motion } from 'framer-motion'

const universities = [
  { name: 'MAKAUT', image: '/images/universities/makaut-logo.png' },
  { name: 'JU', image: '/images/universities/ju-logo.png' },
  { name: 'CU', image: '/images/universities/cu-logo.jpg' },
  { name: 'IIT KGP', image: '/images/universities/iitkgp-logo.png' },
  { name: 'NIT DGP', image: '/images/universities/nitdgp-logo.png' },
  { name: 'IIEST', image: '/images/universities/iiest-logo.png' },
  { name: 'WBUT', image: '/images/universities/makaut-logo.png' },
  { name: 'KNU', image: '/images/universities/knu-logo.png' },
  { name: 'VU', image: '/images/universities/vu-logo.jpg' },
  { name: 'BU', image: '/images/universities/bu-logo.png' },
]

const doubleItems = [...universities, ...universities]

export default function UniversitiesSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 bg-stone-50/80 dark:bg-stone-800/40" aria-label="Universities">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs text-rose-500 uppercase tracking-[0.2em] mb-2 text-center">
            trusted by students from
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-800 dark:text-stone-200 text-center leading-tight">
            top universities
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 lg:w-36 bg-gradient-to-r from-stone-50/80 dark:from-stone-800/40 to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 lg:w-36 bg-gradient-to-l from-stone-50/80 dark:from-stone-800/40 to-transparent z-10 pointer-events-none" aria-hidden="true" />

        <div className="flex overflow-hidden" role="list" aria-label="University logos">
          <motion.div
            className="flex gap-3 sm:gap-5 md:gap-8 lg:gap-12 items-center flex-shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {doubleItems.map((uni, i) => (
              <div
                key={`${uni.name}-${i}`}
                className="flex-shrink-0 h-7 sm:h-9 md:h-11 lg:h-14 flex items-center max-w-[28vw] sm:max-w-[18vw] md:max-w-none"
                role="listitem"
                title={uni.name}
              >
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="h-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

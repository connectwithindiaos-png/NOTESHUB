import { useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, inView) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  if (inView && !started) {
    setStarted(true)
    const duration = 2000
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return count
}

function StatItem({ target, suffix, qualifier, desc, rotation, delay }) {
  const [ref, setRef] = useState(null)
  const [inView, setInView] = useState(false)
  const count = useCountUp(target, inView)

  const handleRef = (node) => {
    if (node) {
      setRef(node)
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
        { threshold: 0.3 }
      )
      observer.observe(node)
    }
  }

  return (
    <motion.div
      ref={handleRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-left"
      style={{ transform: 'rotate(' + rotation + 'deg)' }}
    >
      <p className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-none mb-2 tabular-nums">
        {count}{suffix}
      </p>
      <p className="font-serif italic text-emerald-200 text-lg sm:text-xl mb-1 capitalize">
        {qualifier}
      </p>
      <p className="font-mono text-[11px] text-emerald-100/60 uppercase tracking-wider">
        {desc}
      </p>
    </motion.div>
  )
}

function hashRotation(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return ((hash % 21) - 10) / 10
}

const statData = [
  { target: 10, suffix: '+', qualifier: 'comprehensive', desc: 'engineering courses', rotation: hashRotation('10') },
  { target: 48, suffix: '+', qualifier: 'meticulous', desc: 'semesters mapped', rotation: hashRotation('48') },
  { target: 500, suffix: '+', qualifier: 'extensive', desc: 'subjects covered', rotation: hashRotation('500') },
  { target: 10, suffix: 'K+', qualifier: 'trusted', desc: 'active students', rotation: hashRotation('10K') },
]

export default function StatsSection() {
  return (
    <section
      className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-cyan-900"
      aria-label="Platform statistics"
    >
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs text-emerald-300 uppercase tracking-[0.2em] mb-3">
            by the numbers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
            Growing stronger, every semester.
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-between gap-10 md:gap-6">
          <div className="w-[calc(50%-1.25rem)] md:w-auto">
            <StatItem {...statData[0]} delay={0} />
          </div>
          <div className="w-[calc(50%-1.25rem)] md:w-auto md:mt-12">
            <StatItem {...statData[1]} delay={0.15} />
          </div>
          <div className="w-[calc(50%-1.25rem)] md:w-auto md:mt-6">
            <StatItem {...statData[2]} delay={0.3} />
          </div>
          <div className="w-[calc(50%-1.25rem)] md:w-auto md:mt-16">
            <StatItem {...statData[3]} delay={0.45} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="relative block w-full h-[80px]" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,30 1440,50 L1440,80 L0,80 Z"
            fill="#fef3c7"
            opacity="0.08"
          />
          <path
            d="M0,55 C240,70 480,40 720,55 C960,70 1200,35 1440,60 L1440,80 L0,80 Z"
            fill="#fef3c7"
            opacity="0.05"
          />
        </svg>
      </div>
    </section>
  )
}

export function StatsSectionWrapper() {
  return (
    <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-5">
      <StatsSection />
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { value: 12000, suffix: '+', label: 'Portfolios generated' },
  { value: 94,    suffix: '%', label: 'Average ATS score'    },
  { value: 60,    suffix: 's', label: 'Time to first export' },
]

function AnimatedStat({
  value,
  suffix,
  label,
  started,
}: {
  value: number
  suffix: string
  label: string
  started: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, value])

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-0" style={{ padding: '0 48px' }}>
      <div className="flex items-baseline gap-0 leading-none">
        <span className="font-display text-[56px] font-extrabold text-body" style={{ lineHeight: 1 }}>
          {value >= 1000 ? display.toLocaleString() : display}
        </span>
        <span className="font-display text-[56px] font-extrabold text-accent" style={{ lineHeight: 1 }}>
          {suffix}
        </span>
      </div>
      <p className="mt-2 font-mono text-[14px] tracking-[0.06em] text-muted-2">
        {label}
      </p>
    </div>
  )
}

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section
      ref={ref}
      className="flex flex-col md:flex-row border-t border-border"
      style={{ padding: '48px var(--page-px)' }}
    >
      {STATS.map((s, i) => (
        <div key={s.label} className="flex flex-1 flex-col md:flex-row">
          <AnimatedStat {...s} started={inView} />
          {i < STATS.length - 1 && (
            <div className="h-px md:h-full md:w-px bg-border self-stretch mx-8 md:mx-0 my-4 md:my-0" />
          )}
        </div>
      ))}
    </section>
  )
}
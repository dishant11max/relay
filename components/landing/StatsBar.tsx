'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { target: 12000, suffix: '+', label: 'Portfolios generated' },
  { target: 94,    suffix: '%', label: 'Average ATS score'    },
  { target: 60,    suffix: 's', label: 'Time to first export' },
]

function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, target, duration])
  return value
}

function StatItem({
  target,
  suffix,
  label,
  triggered,
}: {
  target: number
  suffix: string
  label: string
  triggered: boolean
}) {
  const value = useCountUp(target, 1800, triggered)
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6 md:py-0 md:px-12">
      <div className="flex items-baseline gap-0 leading-none">
        <span
          className="font-display font-extrabold text-body"
          style={{ fontSize: 'clamp(40px, 10vw, 56px)', lineHeight: 1 }}
        >
          {target >= 1000 ? value.toLocaleString() : value}
        </span>
        <span
          className="font-display font-extrabold text-accent"
          style={{ fontSize: 'clamp(40px, 10vw, 56px)', lineHeight: 1 }}
        >
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
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTriggered(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row border-t border-border"
      style={{ padding: '48px var(--page-px)' }}
    >
      {STATS.map((s, i) => (
        <div key={s.label} className="flex flex-1 flex-col md:flex-row">
          <StatItem {...s} triggered={triggered} />
          {i < STATS.length - 1 && (
            <div className="h-px md:h-full md:w-px bg-border self-stretch mx-8 md:mx-0 my-4 md:my-0" />
          )}
        </div>
      ))}
    </div>
  )
}
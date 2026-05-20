'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 1600, trigger: boolean) {
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

const TILES = [
  {
    label: 'TOTAL PORTFOLIOS',
    target: 12847,
    display: (v: number) => v.toLocaleString(),
    suffix: '+',
    sub: 'and growing',
    isNumber: true,
  },
  {
    label: 'RESUMES EXPORTED',
    target: 11313,
    display: (v: number) => v.toLocaleString(),
    suffix: '+',
    sub: 'LaTeX + PDF',
    isNumber: true,
  },
  {
    label: 'AVG ATS SCORE',
    target: 94,
    display: (v: number) => String(v),
    suffix: '%',
    sub: 'across all exports',
    isNumber: true,
  },
  {
    label: 'GITHUB REPOS READ',
    target: 284000,
    display: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)),
    suffix: '+',
    sub: 'public repos analyzed',
    isNumber: true,
  },
  {
    label: 'STACK MOST DETECTED',
    target: 0,
    display: () => 'Next.js',
    suffix: '',
    sub: 'in 34% of profiles',
    isNumber: false,
  },
  {
    label: 'FASTEST EXPORT',
    target: 8,
    display: (v: number) => String(v),
    suffix: 's',
    sub: 'record time',
    isNumber: true,
  },
]

function StatTile({
  tile,
  triggered,
  index,
}: {
  tile: (typeof TILES)[number]
  triggered: boolean
  index: number
}) {
  const value = useCountUp(tile.target, 1600 + index * 100, triggered)

  return (
    <div
      style={{
        background: '#080808',
        padding: '32px 28px',
        opacity: 0,
        animation: triggered ? `fadeIn 0.5s ease forwards` : 'none',
        animationDelay: `${index * 80}ms`,
      }}
    >
      <p
        className="font-mono text-muted uppercase"
        style={{ fontSize: 9, letterSpacing: '0.14em', marginBottom: 12 }}
      >
        {tile.label}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span className="font-display font-extrabold text-body" style={{ fontSize: 48, lineHeight: 1 }}>
          {tile.isNumber ? tile.display(value) : tile.display(0)}
        </span>
        {tile.suffix && (
          <span className="font-display font-extrabold text-accent" style={{ fontSize: 48, lineHeight: 1 }}>
            {tile.suffix}
          </span>
        )}
      </div>
      <p className="font-mono text-muted-2" style={{ fontSize: 10, marginTop: 4 }}>
        {tile.sub}
      </p>
    </div>
  )
}

export default function StatsGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTriggered(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3"
      style={{
        gap: 1,
        background: '#1a1a1a',
        marginTop: 48,
      }}
    >
      {TILES.map((tile, i) => (
        <StatTile key={tile.label} tile={tile} triggered={triggered} index={i} />
      ))}
    </div>
  )
}

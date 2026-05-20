'use client'
import { useEffect, useRef, useState } from 'react'

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

function StatCard({
  filename,
  badge,
  rows,
  triggered,
}: {
  filename: string
  badge: string
  rows: { key: string; value: string | number; isCountUp?: boolean; target?: number; suffix?: string }[]
  triggered: boolean
}) {
  return (
    <div
      style={{
        background: '#0c0c0c',
        border: '1px solid #1a1a1a',
        padding: '20px 24px',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span
          className="font-mono text-accent uppercase"
          style={{ fontSize: 9, letterSpacing: '0.14em' }}
        >
          {filename}
        </span>
        <span
          className="font-mono text-muted"
          style={{
            fontSize: 8,
            background: '#111',
            border: '1px solid #1a1a1a',
            padding: '2px 6px',
          }}
        >
          {badge}
        </span>
      </div>

      {/* Key-value rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((row) => (
          <div key={row.key} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="font-mono text-muted-2" style={{ fontSize: 10 }}>
              {row.key}
            </span>
            <span className="font-mono text-body font-bold" style={{ fontSize: 11 }}>
              {row.isCountUp && row.target !== undefined ? (
                <CountUpValue target={row.target} suffix={row.suffix ?? ''} triggered={triggered} />
              ) : (
                row.value
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CountUpValue({
  target,
  suffix,
  triggered,
}: {
  target: number
  suffix: string
  triggered: boolean
}) {
  const value = useCountUp(target, 1800, triggered)
  return (
    <>
      {target >= 1000 ? value.toLocaleString() : value}
      {suffix}
    </>
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
      className="border-t border-border"
      style={{
        paddingLeft: 'var(--page-px)',
        paddingRight: 'var(--page-px)',
        paddingTop: 'var(--page-px)',
        paddingBottom: 'var(--page-px)',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <StatCard
          filename="PORTFOLIO_STATS.JSON"
          badge="LIVE"
          triggered={triggered}
          rows={[
            { key: 'Total Portfolios', isCountUp: true, target: 12847, suffix: '', value: 0 },
            { key: 'New Today', value: '34' },
            { key: 'Last Updated', value: 'just now' },
          ]}
        />
        <StatCard
          filename="RESUME_EXPORTS.LOG"
          badge="RUNNING"
          triggered={triggered}
          rows={[
            { key: 'LaTeX Exports', isCountUp: true, target: 8204, suffix: '', value: 0 },
            { key: 'PDF Exports', isCountUp: true, target: 3109, suffix: '', value: 0 },
            { key: 'Last Export', value: '2 min ago' },
          ]}
        />
        <StatCard
          filename="ATS_ANALYSIS.DATA"
          badge="v2.1"
          triggered={triggered}
          rows={[
            { key: 'Avg ATS Score', isCountUp: true, target: 94, suffix: '%', value: 0 },
            { key: 'Highest Score', value: '99%' },
            { key: 'Roles Indexed', value: '847' },
          ]}
        />
      </div>
    </div>
  )
}
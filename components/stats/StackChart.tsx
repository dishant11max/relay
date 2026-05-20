'use client'

import { useEffect, useRef, useState } from 'react'

const STACKS = [
  { name: 'Next.js',     pct: 34 },
  { name: 'React',       pct: 27 },
  { name: 'TypeScript',  pct: 24 },
  { name: 'Node.js',     pct: 21 },
  { name: 'Python',      pct: 18 },
  { name: 'Supabase',    pct: 14 },
  { name: 'PostgreSQL',  pct: 12 },
  { name: 'Docker',      pct:  9 },
]

export default function StackChart() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTriggered(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ marginTop: 64 }}>
      {/* Section header */}
      <p
        className="font-mono text-accent uppercase"
        style={{ fontSize: 9, letterSpacing: '0.14em', marginBottom: 16 }}
      >
        STACK_FREQUENCY.JSON
      </p>
      <h2
        className="font-display font-extrabold text-body"
        style={{ fontSize: 32, marginBottom: 32 }}
      >
        Most common stacks on Relay.
      </h2>

      {/* Bar rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {STACKS.map((stack, i) => (
          <div
            key={stack.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              opacity: 0,
              animation: triggered ? `fadeIn 0.4s ease forwards` : 'none',
              animationDelay: `${i * 100}ms`,
            }}
          >
            <span
              className="font-mono text-muted-2"
              style={{ fontSize: 11, width: 100, flexShrink: 0 }}
            >
              {stack.name}
            </span>
            <div
              style={{
                flex: 1,
                height: 3,
                background: '#1a1a1a',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: triggered ? `${stack.pct}%` : '0%',
                  background: '#4afe80',
                  transition: `width 800ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                }}
              />
            </div>
            <span
              className="font-mono text-muted"
              style={{ fontSize: 10, width: 32, textAlign: 'right', flexShrink: 0 }}
            >
              {stack.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

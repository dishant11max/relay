'use client'

import { useState } from 'react'

const CONTENT_PARTS = [
  { text: 'CONNECT GITHUB', highlight: false },
  { text: '  ·  ', highlight: false },
  { text: 'ANALYZE', highlight: true },
  { text: ' REPOS  ·  GENERATE RESUME  ·  ', highlight: false },
  { text: 'ATS SCORE', highlight: true },
  { text: '  ·  ', highlight: false },
  { text: 'SHIP PORTFOLIO', highlight: true },
  { text: '  ⬡  ', highlight: false },
]

// Content string twice
const REPEATED = Array.from({ length: 2 }, () => CONTENT_PARTS).flat()

export default function CurvedLoopBand() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      className="relative overflow-hidden border-t border-border"
      style={{ height: 80, background: 'transparent' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[140px]"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[140px]"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }}
      />

      <svg width="100%" height="80" style={{ overflow: 'hidden' }}>
        <defs>
          <path
            id="curvedPath"
            d="M -400,50 C 0,20 400,20 800,50 C 1200,80 1600,20 2000,50 C 2400,80 2800,20 3200,50"
          />
        </defs>
        <text
          fontFamily="'Space Mono', monospace"
          fontSize="11"
          letterSpacing="0.18em"
          style={{
            animation: paused
              ? 'curvedScroll 22s linear infinite paused'
              : 'curvedScroll 22s linear infinite',
          }}
        >
          <textPath href="#curvedPath" startOffset="0%">
            {REPEATED.map((part, i) => (
              <tspan
                key={i}
                fill={part.highlight ? 'rgba(74,254,128,0.5)' : '#1e1e1e'}
              >
                {part.text}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </section>
  )
}
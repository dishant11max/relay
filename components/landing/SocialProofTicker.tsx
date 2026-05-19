'use client'

import { useRef } from 'react'

/* ─── Data ────────────────────────────────────────────────── */
const ITEMS = [
  { user: '@harshsrivastava', co: 'Yardstick',    role: 'Fullstack Engineer',    ats: 91 },
  { user: '@divyanshgarg',    co: 'Zarvyn',        role: 'Backend Developer',     ats: 88 },
  { user: '@vajnathpatil',    co: 'Clink Rewards', role: 'Frontend Engineer',     ats: 94 },
  { user: '@prayagmehta',     co: 'Accenture',     role: 'Software Engineer',     ats: 86 },
  { user: '@ojassharma',      co: 'Razorpay',      role: 'SDE-2',                ats: 93 },
  { user: '@aniruddhk',       co: 'Amazon',        role: 'Backend Engineer',      ats: 90 },
  { user: '@ishikajain',      co: 'Google',        role: 'Software Engineer',     ats: 96 },
  { user: '@samarthrao',      co: 'Flipkart',      role: 'Platform Engineer',     ats: 89 },
]

function Item({ user, co, role, ats }: (typeof ITEMS)[0]) {
  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap px-7">
      {/* ATS pill */}
      <span
        className="font-mono text-[12px] font-bold"
        style={{
          padding: '1px 7px',
          background: 'rgba(74,254,128,0.09)',
          border: '1px solid rgba(74,254,128,0.18)',
          color: '#4afe80',
        }}
      >
        {ats}%
      </span>
      {/* Username */}
      <span className="font-mono" style={{ fontSize: 14, color: '#2a2a2a' }}>
        {user}
      </span>
      {/* Arrow */}
      <span className="font-mono text-[12px]" style={{ color: '#1e1e1e' }}>
        &#8594;
      </span>
      {/* Role @ Company */}
      <span className="font-mono" style={{ fontSize: 14, color: '#2a2a2a' }}>
        {role}
      </span>
      <span className="font-mono text-[12px]" style={{ color: '#1e1e1e' }}>
        @&nbsp;<span style={{ color: '#3a3a3a' }}>{co}</span>
      </span>
      {/* Dot separator */}
      <span className="text-[#161616]">·</span>
    </span>
  )
}

export default function SocialProofTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  const DOUBLED = [...ITEMS, ...ITEMS]

  return (
    <section
      className="relative overflow-hidden border-b border-t border-border"
      style={{ height: 44, background: '#060606' }}
      aria-label="Users hired via Relay"
    >
      {/* Left fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
        style={{ background: 'linear-gradient(to right, #060606, transparent)' }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
        style={{ background: 'linear-gradient(to left, #060606, transparent)' }}
      />

      {/* Left label */}
      <div
        className="absolute left-0 top-0 z-20 flex h-full items-center font-mono text-[12px] tracking-[0.14em]"
        style={{
          padding: '0 16px 0 var(--page-px)',
          color: '#737373',
          borderRight: '1px solid #141414',
          background: '#060606',
        }}
      >
        RECENTLY
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex h-full items-center"
        style={{
          animation: 'ticker 34s linear infinite',
          width: 'max-content',
          paddingLeft: 120,
        }}
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'running'
        }}
      >
        {DOUBLED.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </div>
    </section>
  )
}
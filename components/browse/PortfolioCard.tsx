'use client'

import { Portfolio } from './mockData'

export default function PortfolioCard({ username, role, stack, ats, repos, stars, contributions }: Portfolio) {
  const initials = username.slice(0, 2).toUpperCase()

  return (
    <div
      style={{
        background: '#0c0c0c',
        border: '1px solid #1a1a1a',
        padding: 20,
        cursor: 'pointer',
        transition: 'border-color 200ms ease, transform 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(74,254,128,0.2)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1a1a1a'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left: avatar + username + role */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div
            className="font-mono font-bold bg-accent text-black"
            style={{
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <div className="font-mono font-bold text-body" style={{ fontSize: 15 }}>
              {username}
            </div>
            <div className="font-mono text-muted-2" style={{ fontSize: 13 }}>
              {role}
            </div>
          </div>
        </div>

        {/* Right: ATS badge */}
        <div
          style={{
            background: 'rgba(74,254,128,0.08)',
            border: '1px solid rgba(74,254,128,0.2)',
            padding: '2px 8px',
            textAlign: 'center',
          }}
        >
          <div className="font-mono text-accent" style={{ fontSize: 13 }}>
            {ats}%
          </div>
          <div className="font-mono text-muted" style={{ fontSize: 11 }}>
            ATS
          </div>
        </div>
      </div>

      {/* Stack pills */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="font-mono"
            style={{
              fontSize: 12,
              padding: '1px 6px',
              background: 'rgba(74,254,128,0.06)',
              border: '1px solid rgba(74,254,128,0.15)',
              color: 'rgba(74,254,128,0.7)',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Metrics row */}
      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid #141414',
          display: 'flex',
          gap: 16,
        }}
      >
        {[
          { value: repos,         label: 'REPOS'   },
          { value: stars,         label: 'STARS'   },
          { value: contributions, label: 'COMMITS' },
        ].map(({ value, label }) => (
          <div key={label}>
            <div className="font-mono font-bold text-body" style={{ fontSize: 16 }}>
              {value.toLocaleString()}
            </div>
            <div className="font-mono text-muted" style={{ fontSize: 12, letterSpacing: '0.06em' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="font-mono text-muted" style={{ fontSize: 12 }}>
          {username}.resumegit.dev
        </span>
        <a
          href={`https://${username}.resumegit.dev`}
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-accent"
          style={{ fontSize: 12, textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          VIEW →
        </a>
      </div>
    </div>
  )
}

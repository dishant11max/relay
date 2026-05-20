'use client'

import { motion } from 'framer-motion'

const BREAKDOWN = [
  { label: 'Commit velocity',    pts: 23, max: 25, note: 'Highly consistent, 3+ commits/wk' },
  { label: 'README quality',     pts: 19, max: 20, note: 'Setup, env vars, deployment docs' },
  { label: 'Type coverage',      pts: 17, max: 20, note: 'Strict TypeScript, zero implicit any' },
  { label: 'Stack diversity',    pts: 14, max: 20, note: 'Next.js, Supabase, Python, Docker' },
  { label: 'Project relevance',  pts: 12, max: 15, note: '7 production repos detected' },
]

const SCORE = 85
const USERNAME = 'dishant11max'
const LANGUAGES = ['TypeScript', 'Next.js', 'Python', 'Supabase']

export default function SampleResult() {
  return (
    <div style={{ marginTop: 80 }}>
      {/* Section header */}
      <p
        className="font-mono text-accent uppercase"
        style={{ fontSize: 9, letterSpacing: '0.18em', marginBottom: 16 }}
      >
        SAMPLE_OUTPUT.JSON
      </p>
      <h2
        className="font-display font-extrabold text-body"
        style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em', marginBottom: 8 }}
      >
        What a real analysis looks like.
      </h2>
      <p
        className="font-mono text-muted-2"
        style={{ fontSize: 13, marginBottom: 32, maxWidth: 440 }}
      >
        This is the breakdown Relay generates from reading a GitHub profile — commit history, docs, stack signals.
      </p>

      {/* Result panel — 2-col asymmetric */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr]"
        style={{ border: '1px solid #1a1a1a', background: '#0a0a0a' }}
      >
        {/* Left — score */}
        <div
          className="border-b md:border-b-0 md:border-r border-[#1a1a1a]"
          style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <p className="font-mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', marginBottom: 16 }}>
              ATS READINESS SCORE
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span
                className="font-display font-extrabold text-accent"
                style={{ fontSize: 72, lineHeight: 1 }}
              >
                {SCORE}
              </span>
              <span className="font-mono text-muted" style={{ fontSize: 16 }}>/100</span>
            </div>
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                color: '#4afe80',
                background: 'rgba(74,254,128,0.08)',
                border: '1px solid rgba(74,254,128,0.2)',
                padding: '2px 8px',
                display: 'inline-block',
                marginBottom: 20,
              }}
            >
              STRONG
            </span>

            {/* Score bar */}
            <div style={{ height: 2, background: '#1a1a1a', width: '100%' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${SCORE}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ height: '100%', background: '#4afe80' }}
              />
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <p className="font-mono text-muted" style={{ fontSize: 10, letterSpacing: '0.12em', marginBottom: 10 }}>
              PROFILE
            </p>
            <p className="font-mono text-body" style={{ fontSize: 14 }}>
              @{USERNAME}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {LANGUAGES.map((l) => (
                <span
                  key={l}
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    background: 'rgba(74,254,128,0.07)',
                    border: '1px solid rgba(74,254,128,0.15)',
                    color: '#4afe80',
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — breakdown */}
        <div style={{ padding: '32px 28px' }}>
          <p className="font-mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', marginBottom: 20 }}>
            SIGNAL BREAKDOWN
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {BREAKDOWN.map(({ label, pts, max, note }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                style={{
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : '1px solid #141414',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div style={{ flex: 1 }}>
                  <p className="font-mono text-body" style={{ fontSize: 13, marginBottom: 2 }}>{label}</p>
                  <p className="font-mono text-muted" style={{ fontSize: 11 }}>{note}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{ width: 60, height: 2, background: '#1a1a1a' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(pts / max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.07 }}
                      style={{ height: '100%', background: pts >= max * 0.7 ? '#4afe80' : '#3a3a3a' }}
                    />
                  </div>
                  <span
                    className="font-mono font-bold"
                    style={{
                      fontSize: 12,
                      color: pts >= max * 0.7 ? '#4afe80' : '#444',
                      width: 36,
                      textAlign: 'right',
                    }}
                  >
                    {pts}/{max}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, Fragment } from 'react'

const TABS = [
  { id: 0, num: '01', label: 'CONNECT' },
  { id: 1, num: '02', label: 'ANALYZE' },
  { id: 2, num: '03', label: 'GENERATE' },
  { id: 3, num: '04', label: 'EXPORT' },
]

/* ─────────────────────────────────────────────────────────────
   TAB 01 — CONNECT
   Left: GitHub OAuth mock | Right: "What Relay reads" panel
───────────────────────────────────────────────────────────── */
function TabConnect() {
  const READS = [
    { label: 'Commit history', detail: 'Volume, consistency, recency', active: true  },
    { label: 'README quality', detail: 'Completeness score, keywords', active: true  },
    { label: 'Stack diversity', detail: 'Languages, frameworks, tools', active: true  },
    { label: 'PR activity',    detail: 'Review depth, collaboration',   active: false },
    { label: 'Issue patterns', detail: 'Bug fix cadence, labels',       active: false },
  ]

  return (
    <div className="flex flex-col md:flex-row w-full border border-border" style={{ minHeight: 320 }}>
      {/* Left — OAuth card */}
      <div
        className="flex flex-col justify-center border-r border-border bg-surface"
        style={{ flex: '0 0 42%', padding: '40px 36px' }}
      >
        <div className="mb-6 flex justify-center">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="#e8e8e8">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </div>
        <h3 className="mb-1.5 text-center font-mono text-[17px] font-bold text-body">
          Authorize Relay
        </h3>
        <p className="mb-6 text-center font-mono text-[13px] text-muted-2">
          relay.dev · read-only access
        </p>
        <div className="mb-6 space-y-2.5 border border-border p-3" style={{ background: '#0a0a0a' }}>
          {['Public repositories (read)', 'Profile data (username, avatar)', 'No write permissions ever'].map((perm) => (
            <div key={perm} className="flex items-center gap-2.5">
              <span className="font-mono text-[13px] text-accent">✓</span>
              <span className="font-mono text-[13px] text-muted-2">{perm}</span>
            </div>
          ))}
        </div>
        <button className="w-full bg-accent py-2.5 font-mono text-[14px] font-bold tracking-[0.06em] text-black">
          AUTHORIZE RELAY →
        </button>
        <p className="mt-3 text-center font-mono text-[12px]" style={{ color: '#737373' }}>
          Revoke at any time from GitHub settings
        </p>
      </div>

      {/* Right — What Relay reads */}
      <div
        className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-border"
        style={{ flex: 1, padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)', background: '#090909' }}
      >
        <p className="mb-6 font-mono text-[12px] tracking-[0.18em]" style={{ color: '#737373' }}>
          WHAT RELAY READS FROM YOUR ACCOUNT
        </p>
        <div className="space-y-0">
          {READS.map(({ label, detail, active }, i) => (
            <div
              key={label}
              className="flex items-start gap-4 border-t border-[#141414] py-3.5"
            >
              <div
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center font-mono text-[12px]"
                style={{
                  background: active ? 'rgba(74,254,128,0.1)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(74,254,128,0.25)' : '#1e1e1e'}`,
                  color: active ? '#4afe80' : '#737373',
                }}
              >
                {active ? '✓' : '○'}
              </div>
              <div>
                <p className="font-mono text-[15px] font-bold" style={{ color: active ? '#e8e8e8' : '#737373' }}>
                  {label}
                </p>
                <p className="mt-0.5 font-mono text-[13px]" style={{ color: active ? '#a3a3a3' : '#1e1e1e' }}>
                  {detail}
                </p>
              </div>
              <div className="ml-auto flex-shrink-0 font-mono text-[12px]" style={{ color: active ? '#4afe80' : '#1e1e1e' }}>
                {active ? 'ENABLED' : 'SOON'}
              </div>
            </div>
          ))}
          <div className="border-t border-[#141414]" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB 02 — ANALYZE
   Full-width 2-col: file tree | AI summary (no maxWidth cap)
───────────────────────────────────────────────────────────── */
function TabAnalyze() {
  const SIGNALS = [
    { label: 'Commit velocity',  score: 91, },
    { label: 'README quality',   score: 87, },
    { label: 'Type coverage',    score: 94, },
    { label: 'Stack diversity',  score: 78, },
  ]

  return (
    <div className="flex flex-col md:flex-row w-full border border-border" style={{ minHeight: 320 }}>
      {/* Left — File tree */}
      <div
        className="border-r border-border bg-surface"
        style={{ flex: '0 0 40%', padding: '28px 24px' }}
      >
        <p className="mb-4 font-mono text-[12px] tracking-[0.14em] text-muted-2">REPO / dishant11max</p>
        {[
          { depth: 0, name: 'package.json',       tag: 'Node.js',       accent: true  },
          { depth: 0, name: 'README.md',           tag: 'Quality: 87%',  accent: true  },
          { depth: 0, name: 'tailwind.config.ts',  tag: 'Tailwind CSS',  accent: false },
          { depth: 0, name: 'src/',                tag: null,            accent: false },
          { depth: 1, name: 'app/',                tag: null,            accent: false },
          { depth: 2, name: 'page.tsx',            tag: 'React',         accent: true  },
          { depth: 2, name: 'layout.tsx',          tag: null,            accent: false },
          { depth: 1, name: 'components/',         tag: null,            accent: false },
          { depth: 2, name: 'ui/',                 tag: 'TypeScript',    accent: true  },
          { depth: 0, name: 'supabase/',           tag: 'Supabase',      accent: true  },
        ].map(({ depth, name, tag, accent }) => (
          <div key={name} className="mb-1 flex items-center justify-between gap-2" style={{ paddingLeft: depth * 14 }}>
            <span className="font-mono text-[13px]" style={{ color: depth === 0 && !name.endsWith('/') ? '#5a5a5a' : depth > 0 ? '#a3a3a3' : '#a3a3a3' }}>
              {name.endsWith('/') ? '▸ ' : '  '}{name}
            </span>
            {tag && (
              <span
                className="flex-shrink-0 px-1.5 py-0.5 font-mono text-[11px]"
                style={{
                  background: accent ? 'rgba(74,254,128,0.08)' : 'transparent',
                  border: `1px solid ${accent ? 'rgba(74,254,128,0.2)' : '#1e1e1e'}`,
                  color: accent ? '#4afe80' : '#737373',
                }}
              >
                {tag}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Right — AI analysis */}
      <div className="border-t md:border-t-0 md:border-l border-border" style={{ flex: 1, background: '#090909' }}>
        {/* Top: summary block */}
        <div className="border-b border-[#141414] p-6">
          <p className="mb-4 font-mono text-[12px] tracking-[0.14em]" style={{ color: '#737373' }}>AI ANALYSIS SUMMARY</p>
          <div className="space-y-2">
            <p className="font-mono text-[15px] text-body">Stack: Next.js 14, React 18, Supabase</p>
            <p className="font-mono text-[14px]" style={{ color: '#a3a3a3' }}>TypeScript throughout — strong typing discipline with zero implicit any.</p>
            <p className="font-mono text-[14px]" style={{ color: '#a3a3a3' }}>README covers setup, env vars, and deployment. Above average documentation.</p>
            <p className="font-mono text-[14px]" style={{ color: '#a3a3a3' }}>Active for 8 months · 234 commits · 3 contributors</p>
          </div>
        </div>
        {/* Bottom: signal bars */}
        <div className="p-6">
          <p className="mb-5 font-mono text-[12px] tracking-[0.14em]" style={{ color: '#737373' }}>SIGNAL SCORES</p>
          <div className="space-y-4">
            {SIGNALS.map(({ label, score }) => (
              <div key={label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-mono text-[13px]" style={{ color: '#a3a3a3' }}>{label}</span>
                  <span className="font-mono text-[14px] font-bold text-accent">{score}%</span>
                </div>
                <div className="h-[2px] w-full" style={{ background: '#1a1a1a' }}>
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 border-t border-[#141414] pt-4">
            <span className="font-mono text-[12px]" style={{ color: '#a3a3a3' }}>OVERALL ATS READINESS</span>
            <div className="h-px flex-1" style={{ background: '#141414' }} />
            <span className="font-display text-[23px] font-extrabold text-accent">89%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB 03 — GENERATE  (unchanged — already 2-col)
───────────────────────────────────────────────────────────── */
function TabGenerate() {
  return (
    <div className="flex flex-col md:flex-row w-full border border-border" style={{ minHeight: 320 }}>
      {/* Left: resume preview */}
      <div
        className="flex flex-col bg-surface"
        style={{ flex: '0 0 55%', padding: '28px', borderRight: '1px solid #1a1a1a' }}
      >
        <div className="mb-4">
          <div className="font-mono text-[21px] font-bold text-body">Dishant Sharma</div>
          <div className="mt-0.5 font-mono text-[13px]" style={{ color: '#a3a3a3' }}>
            fullstack engineer · dishant11max.relay.dev
          </div>
        </div>
        <div className="mb-4 border-t border-[#1a1a1a] pt-4">
          <div className="mb-1 font-mono text-[11px] tracking-[0.14em] text-accent">SUMMARY</div>
          <p className="font-mono text-[13px] leading-[1.7]" style={{ color: '#a3a3a3' }}>
            Fullstack engineer with 3+ years building production React/Next.js apps. Strong TypeScript, Supabase, and system design foundations.
          </p>
        </div>
        <div className="mb-4 border-t border-[#1a1a1a] pt-4">
          <div className="mb-1 font-mono text-[13px] font-bold text-body">Portfolio Generator — Relay</div>
          <div className="font-mono text-[13px] leading-[1.8]" style={{ color: '#a3a3a3' }}>
            · Connected GitHub OAuth to Supabase, syncing 500+ repos on sign-in<br />
            · Generated ATS-scored resumes using Claude claude-sonnet-4-20250514 in &lt;2s
          </div>
        </div>
        <div className="mb-4 border-t border-[#1a1a1a] pt-4">
          <div className="mb-1 font-mono text-[13px] font-bold text-body">AI Roadmap Platform — DevMap</div>
          <div className="font-mono text-[13px] leading-[1.8]" style={{ color: '#a3a3a3' }}>
            · Built adaptive learning paths for 12 programming languages<br />
            · Reached 340 active users in 3 weeks post-launch on Product Hunt
          </div>
        </div>
      </div>

      {/* Right: ATS panel */}
      <div
        className="flex flex-col border-t md:border-t-0 md:border-l border-border"
        style={{ flex: 1, padding: 'clamp(20px, 5vw, 28px)', background: '#090909' }}
      >
        <p className="mb-1 font-mono text-[12px] tracking-[0.14em]" style={{ color: '#737373' }}>ATS ANALYSIS</p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-display text-[52px] font-extrabold leading-none text-accent">89</span>
          <span className="font-display text-[22px] leading-none" style={{ color: '#a3a3a3' }}>/100</span>
        </div>
        <p className="mb-3 mt-1 font-mono text-[12px]" style={{ color: '#737373' }}>ATS Score</p>
        <div className="h-[2px] w-full" style={{ background: '#1a1a1a' }}>
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: '89%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="mt-5">
          <p className="mb-2 font-mono text-[11px] tracking-[0.14em]" style={{ color: '#737373' }}>KEYWORDS MATCHED</p>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'TypeScript', 'Supabase', 'Next.js', 'REST API'].map((kw) => (
              <span key={kw} className="font-mono text-[12px] text-accent" style={{ padding: '2px 8px', background: 'rgba(74,254,128,0.08)', border: '1px solid rgba(74,254,128,0.2)' }}>
                {kw}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-mono text-[11px] tracking-[0.14em]" style={{ color: '#a3a3a3' }}>NOT FOUND</p>
          <div className="flex flex-wrap gap-1.5">
            {['Kubernetes', 'Go'].map((kw) => (
              <span key={kw} className="font-mono text-[12px]" style={{ color: 'rgba(255,77,77,0.5)', padding: '2px 8px', background: 'rgba(255,77,77,0.06)', border: '1px solid rgba(255,77,77,0.2)' }}>
                {kw}
              </span>
            ))}
          </div>
        </div>
        <button className="mt-auto w-full bg-accent pt-0 font-mono text-[13px] font-bold tracking-[0.06em] text-black" style={{ height: 36, marginTop: 24 }}>
          EXPORT AS PDF →
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB 04 — EXPORT
   Left: format selection | Right: share / portfolio live panel
───────────────────────────────────────────────────────────── */
function TabExport() {
  return (
    <div className="flex flex-col md:flex-row w-full border border-border" style={{ minHeight: 320 }}>
      {/* Left — format selection */}
      <div
        className="flex flex-col border-r border-border bg-surface"
        style={{ flex: '0 0 42%', padding: '28px 28px' }}
      >
        <p className="mb-5 font-mono text-[12px] tracking-[0.14em] text-muted-2">EXPORT FORMAT</p>
        <div className="mb-5 grid grid-cols-2 gap-3">
          {[
            { fmt: 'PDF',  size: '~48 kb', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' },
            { fmt: 'DOCX', size: '~52 kb', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' },
          ].map(({ fmt, size, icon }) => (
            <button
              key={fmt}
              className="flex flex-col items-center gap-2 border border-border py-6 font-mono transition-colors duration-150"
              style={{ background: '#0c0c0c' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#737373')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1a1a1a')}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#5a5a5a" strokeWidth="1.5">
                <path d={icon}/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <span className="text-[17px] font-bold text-body">{fmt}</span>
              <span className="text-[12px]" style={{ color: '#737373' }}>{size}</span>
            </button>
          ))}
        </div>
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[12px]" style={{ color: '#a3a3a3' }}>ATS COMPATIBILITY</span>
            <span className="font-mono text-[14px] font-bold text-accent">89/100</span>
          </div>
          <div className="h-[2px]" style={{ background: '#1a1a1a' }}>
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: '89%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
        <a href="#" className="font-mono text-[13px] text-accent hover:underline">
          View portfolio preview →
        </a>
      </div>

      {/* Right — portfolio live panel */}
      <div className="border-t md:border-t-0 md:border-l border-border" style={{ flex: 1, background: '#090909', padding: 'clamp(20px, 5vw, 28px)' }}>
        <p className="mb-5 font-mono text-[12px] tracking-[0.14em]" style={{ color: '#737373' }}>YOUR PORTFOLIO IS LIVE</p>

        {/* Mock browser bar */}
        <div className="mb-4 border border-[#141414]" style={{ background: '#0b0b0b' }}>
          <div className="flex items-center gap-2 border-b border-[#141414] px-3 py-2">
            <div className="flex gap-1">
              {[0,1,2].map(d => <div key={d} className="h-2 w-2 rounded-full" style={{ background: '#1e1e1e' }} />)}
            </div>
            <div className="flex-1 px-2 py-0.5 font-mono text-[12px]" style={{ background: '#111', color: '#a3a3a3' }}>
              dishant11max.relay.dev
            </div>
          </div>
          <div className="p-4">
            <div className="mb-2 font-mono text-[16px] font-bold text-body">Dishant Sharma</div>
            <div className="mb-3 font-mono text-[12px]" style={{ color: '#a3a3a3' }}>Fullstack Engineer · Open to work</div>
            <div className="flex gap-2">
              {['Next.js', 'TypeScript', 'Supabase'].map(t => (
                <span key={t} className="font-mono text-[11px]" style={{ padding: '1px 6px', background: 'rgba(74,254,128,0.07)', border: '1px solid rgba(74,254,128,0.15)', color: '#4afe80' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Share options */}
        <p className="mb-3 font-mono text-[12px] tracking-[0.14em]" style={{ color: '#737373' }}>SHARE</p>
        <div className="space-y-2">
          {[
            { label: 'Copy link',      value: 'dishant11max.relay.dev' },
            { label: 'LinkedIn post',  value: '1-click template ready' },
            { label: 'Twitter thread', value: 'AI-generated · 7 tweets' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between border border-[#141414] px-3 py-2.5" style={{ background: '#0d0d0d' }}>
              <span className="font-mono text-[13px]" style={{ color: '#a3a3a3' }}>{label}</span>
              <span className="font-mono text-[12px]" style={{ color: '#737373' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Section shell ────────────────────────────────────────── */
export default function FeatureSection() {
  const [active, setActive] = useState(0)

  function renderTab() {
    switch (active) {
      case 0: return <TabConnect />
      case 1: return <TabAnalyze />
      case 2: return <TabGenerate />
      case 3: return <TabExport />
      default: return <TabConnect />
    }
  }

  return (
    <section
      className="border-t border-border"
      style={{
        paddingTop: '80px',
        paddingBottom: '72px',
        paddingLeft: 'var(--page-px)',
        paddingRight: 'var(--page-px)',
      }}
    >
      {/* Label */}
      <p className="mb-3 font-mono tracking-[0.2em] text-accent" style={{ fontSize: 14 }}>THE FULL PICTURE</p>

      <h2
        className="font-display font-extrabold text-body"
        style={{ fontSize: 'clamp(32px, 8vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.08 }}
      >
        See everything, not just a repo list.
      </h2>

      <p
        className="mb-12 mt-4 font-mono leading-[1.7]"
        style={{ fontSize: 17, maxWidth: 480, color: '#a3a3a3' }}
      >
        Relay reads your commits, README quality, stack diversity, and contribution patterns.
      </p>

      {/* Tab nav — CSS flex for scroll on mobile, grid on desktop */}
      <div
        className="mb-6 flex md:grid overflow-x-auto md:overflow-visible gap-6 md:gap-0"
        style={{ gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', paddingBottom: 12 }}
      >
        {TABS.map(({ id, num, label }, i) => (
          <Fragment key={id}>
            <button
              onClick={() => setActive(id)}
              className="flex flex-col items-center gap-2 py-1"
              aria-selected={active === id}
            >
              <div
                className="flex h-7 w-7 items-center justify-center font-mono text-[14px] font-bold"
                style={{
                  background: active === id ? '#4afe80' : '#0f0f0f',
                  color: active === id ? '#000' : '#737373',
                  border: active === id ? 'none' : '1px solid #1a1a1a',
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => {
                  if (active !== id) (e.currentTarget as HTMLDivElement).style.borderColor = '#a3a3a3'
                }}
                onMouseLeave={(e) => {
                  if (active !== id) (e.currentTarget as HTMLDivElement).style.borderColor = '#1a1a1a'
                }}
              >
                {num}
              </div>
              <span
                className="font-mono tracking-[0.08em]"
                style={{
                  fontSize: 14,
                  color: active === id ? '#e8e8e8' : '#737373',
                  transition: 'color 150ms',
                }}
              >
                {label}
              </span>
            </button>
            {i < TABS.length - 1 && (
              <div className="hidden md:block h-px w-full self-start" style={{ background: '#141414', marginTop: 14 }} />
            )}
          </Fragment>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{ minHeight: 280 }}
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
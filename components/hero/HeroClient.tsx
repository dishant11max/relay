'use client'

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TerminalLog } from './TerminalLog'
import { ResultCard } from './ResultCard'

type Phase = 'idle' | 'scanning' | 'result' | 'error'

/* ─── Heatmap helpers ─────────────────────────────────────── */
const HEAT_COLORS = ['#111111', '#0d2e1c', '#1a5c38', '#2e9e60', '#4afe80']

function weightedRandom() {
  const r = Math.random()
  if (r < 0.40) return 0
  if (r < 0.60) return 1
  if (r < 0.78) return 2
  if (r < 0.91) return 3
  return 4
}

/* ─── Floating label data ─────────────────────────────────── */
const LABELS = [
  { text: '12,847 portfolios', x: '68%', y: '8%',  rot: '-2deg',   size: 9,  accent: false },
  { text: 'ATS: 94%',          x: '82%', y: '18%', rot: '1.5deg',  size: 10, accent: true  },
  { text: '60s avg export',    x: '72%', y: '76%', rot: '-1deg',   size: 9,  accent: false },
  { text: '+340% this week',   x: '62%', y: '88%', rot: '2deg',    size: 8,  accent: true  },
  { text: 'typescript detected',x:'76%', y: '55%', rot: '-2.5deg', size: 8,  accent: false },
] as const

/* ─── Feature bullets ─────────────────────────────────────── */
const BULLETS = [
  { text: 'Syncs every new repo automatically',  key: 'sync' },
  { text: 'ATS score on every resume export',    key: 'ats'  },
  { text: 'Twitter thread generator built-in',   key: 'thread' },
]

/* ─── Stagger variants ────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.05 } },
}

const lineVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.06 },
  }),
}

/* ─── Magnetic button hook (taste-skill §4) ──────────────── */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      x.set(dx * strength)
      y.set(dy * strength)
    }
    const onLeave = () => { x.set(0); y.set(0) }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y, strength])

  return { ref, sx, sy }
}

/* ─── Component ──────────────────────────────────────────── */
export function HeroClient() {
  const [input,    setInput]    = useState('')
  const [phase,    setPhase]    = useState<Phase>('idle')
  const [errMsg,   setErrMsg]   = useState('')
  const [focused,  setFocused]  = useState(false)
  const [mouse,    setMouse]    = useState({ x: 0.5, y: 0.5 })
  const [hovered,  setHovered]  = useState(false)
  const inputRef  = useRef<HTMLInputElement>(null)
  const heroRef   = useRef<HTMLDivElement>(null)
  const magnetic  = useMagnetic(0.28)

  /* Spotlight — motion values outside render cycle (taste-skill §4) */
  const spotX = useMotionValue(-9999)
  const spotY = useMotionValue(-9999)
  // Derive background string via useTransform with explicit types
  const spotBg = useTransform<number, string>(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(500px circle at ${x}px ${y}px, rgba(74,254,128,0.038) 0%, transparent 68%)`
  )

  /* Mouse parallax — passive, outside render cycle */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* Heatmap data — stable across renders */
  const heatData = useMemo(() => {
    return Array.from({ length: 52 * 7 }, () => weightedRandom())
  }, [])

  const analyze = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) {
      setErrMsg('Please enter a GitHub username.')
      setPhase('error')
      return
    }
    setPhase('scanning')
    setErrMsg('')
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') analyze()
  }

  const reset = () => {
    setPhase('idle')
    setInput('')
    setErrMsg('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  /* ─── Left column ─────────────────────────────── */
  const leftCol = (
    <div
      className="flex flex-col justify-center"
      style={{
        flex: '0 0 56%',
        borderRight: '1px solid #141414',
        padding: '80px 64px 80px var(--page-px)',
      }}
    >
      {/* ── Live badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex items-center gap-2.5"
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
            style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[13px] tracking-[0.18em] text-muted-2">
          AI-POWERED PORTFOLIO GENERATOR
        </span>
        {/* Separator */}
        <span className="h-3 w-px bg-border" />
        <span className="font-mono text-[13px] tracking-[0.12em] text-accent">LIVE</span>
      </motion.div>

      {/* ── Mega heading ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: 0 }}
      >
        {/* YOUR GITHUB. — full opacity, primary weight */}
        <motion.div variants={lineVariants} style={{ overflow: 'hidden' }}>
          <div
            className="font-display font-extrabold"
            style={{
              fontSize: 'clamp(48px, 7vw, 84px)',
              color: '#e8e8e8',
              lineHeight: 0.94,
              letterSpacing: '-0.045em',
            }}
          >
            YOUR GITHUB.
          </div>
        </motion.div>

        {/* YOUR STORY. — dimmed, creates depth */}
        <motion.div variants={lineVariants} style={{ overflow: 'hidden' }}>
          <div
            className="font-display font-extrabold"
            style={{
              fontSize: 'clamp(48px, 7vw, 84px)',
              color: '#252525',
              lineHeight: 0.94,
              letterSpacing: '-0.045em',
              marginLeft: 52,
              marginTop: 4,
            }}
          >
            YOUR STORY.
          </div>
        </motion.div>

        {/* YOUR JOB. — accent, largest, char-by-char */}
        <motion.div
          variants={lineVariants}
          className="font-display font-extrabold"
          style={{
            fontSize: 'clamp(44px, 6.8vw, 90px)',
            whiteSpace: 'nowrap',
            color: '#4afe80',
            lineHeight: 0.92,
            letterSpacing: '-0.05em',
            marginTop: 8,
            marginLeft: -2,
          }}
        >
          {'YOUR JOB.'.split('').map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.55 + ci * 0.038,
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00a0' : char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Rule ── */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 mt-8 h-px w-10 bg-border-hi"
      />

      {/* ── Subtext ── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 font-mono leading-[1.75]"
        style={{ fontSize: 18, maxWidth: 420, color: '#a3a3a3' }}
      >
        Connect GitHub once.{' '}
        <span style={{ color: '#666' }}>
          Get your portfolio and ATS-optimized resume in
        </span>{' '}
        <span style={{ color: '#4afe80' }}>under 60 seconds.</span>
      </motion.p>

      {/* ── Terminal CTA input ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 440 }}
      >
        {/* Input wrapper — focus ring via inline state, no glow */}
        <div
          className="flex transition-colors duration-150"
          style={{
            border: `1px solid ${focused ? '#4afe80' : phase === 'error' ? 'rgba(255,77,77,0.5)' : '#a3a3a3'}`,
            background: '#050505',
            outline: focused ? '3px solid rgba(74,254,128,0.07)' : '3px solid transparent',
          }}
          data-input-wrapper=""
        >
          {/* Prefix */}
          <span
            className="flex items-center border-r border-border font-mono text-accent"
            style={{
              fontSize: 14,
              height: 48,
              padding: '0 12px 0 16px',
              userSelect: 'none',
              pointerEvents: 'none',
              borderColor: focused ? '#1e2e1e' : '#1a1a1a',
              transition: 'border-color 150ms',
            }}
          >
            github.com/
          </span>

          {/* Username input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="username"
            maxLength={39}
            className="flex-1 bg-transparent font-mono text-body"
            style={{
              fontSize: 15,
              height: 48,
              padding: '0 12px',
              outline: 'none',
              border: 'none',
              caretColor: '#4afe80',
            }}
            aria-label="GitHub username"
          />

          {/* Analyze — magnetic button (taste-skill §4) */}
          <motion.button
            ref={magnetic.ref}
            onClick={analyze}
            disabled={phase === 'scanning'}
            whileTap={{ scale: 0.97 }}
            className="bg-accent font-mono font-bold tracking-[0.08em] text-black disabled:opacity-50"
            style={{
              x: magnetic.sx,
              y: magnetic.sy,
              fontSize: 13,
              height: 48,
              padding: '0 20px',
              cursor: 'pointer',
              border: 'none',
              flexShrink: 0,
            }}
          >
            ANALYZE
          </motion.button>
        </div>

        {/* Phase states — AnimatePresence */}
        <AnimatePresence mode="wait">
          {phase === 'scanning' && (
            <TerminalLog key="scanning" onDone={() => setPhase('result')} />
          )}
          {phase === 'result' && (
            <ResultCard key="result" username={input} />
          )}
          {phase === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-2.5 flex items-center gap-2 font-mono"
              style={{ fontSize: 14, color: 'rgba(255,77,77,0.8)' }}
            >
              <span>✗</span>
              <span>{errMsg}</span>
              <button
                onClick={reset}
                className="ml-1 font-mono underline underline-offset-2 transition-colors duration-150"
                style={{ fontSize: 14, color: '#a3a3a3' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e8e8e8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#a3a3a3')}
              >
                try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Feature bullets — staggered ── */}
      <motion.div
        className="mt-8 flex flex-col gap-[9px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        custom={0}
      >
        {BULLETS.map(({ text, key }, i) => (
          <motion.div
            key={key}
            custom={i}
            variants={fadeUp}
            className="flex items-center gap-3"
          >
            <span
              className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center border border-[#1e1e1e] font-mono text-[12px] text-accent"
            >
              —
            </span>
            <span
              className="font-mono tracking-[0.02em]"
              style={{ fontSize: 15, color: '#383838' }}
            >
              {text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )

  /* ─── Right column ─────────────────────────────── */
  const rightCol = (
    <div
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden"
      style={{ padding: '60px 52px' }}
    >
      {/* Floating labels — parallax */}
      {LABELS.map(({ text, x, y, rot, size, accent }, i) => {
        const mx = (mouse.x - 0.5) * (0.012 + i * 0.003) * 80
        const my = (mouse.y - 0.5) * (0.012 + i * 0.003) * 80
        return (
          <div
            key={i}
            className="pointer-events-none absolute font-mono"
            style={{
              left: x,
              top: y,
              transform: `rotate(${rot}) translate(${mx}px, ${my}px)`,
              transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              fontSize: size,
              color: accent ? 'rgba(74,254,128,0.5)' : '#a3a3a3',
              animation: `drift ${3.5 + i * 0.6}s ease-in-out infinite`,
              zIndex: 1,
              letterSpacing: '0.04em',
            }}
          >
            {text}
          </div>
        )
      })}

      {/* ── Heatmap card — hover border lift (no glow) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[2] w-full"
        style={{
          background: '#0b0b0b',
          border: `1px solid ${hovered ? '#737373' : '#1a1a1a'}`,
          maxWidth: 500,
          transition: 'border-color 200ms ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 border-b"
          style={{ background: '#090909', borderColor: '#141414', padding: '9px 14px' }}
        >
          {/* Traffic dots */}
          <div className="flex gap-[5px]">
            {['#3a1c1c', '#2a2a18', '#1a2a1a'].map((bg, d) => (
              <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: hovered ? bg : '#1a1a1a', transition: 'background 300ms' }} />
            ))}
          </div>
          {/* URL bar */}
          <div
            className="flex-1 px-2.5 py-1 font-mono"
            style={{
              fontSize: 12,
              background: '#111',
              color: hovered ? '#a3a3a3' : '#252525',
              transition: 'color 200ms',
            }}
          >
            {input || 'dishant11max'}.relay.dev
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '16px 18px 20px' }}>
          <p
            className="mb-[10px] font-mono tracking-[0.16em]"
            style={{ fontSize: 11, color: '#252525' }}
          >
            CONTRIBUTION GRAPH / LAST 52 WEEKS
          </p>

          {/* Heatmap grid — responsive 1fr so it never overflows */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(52, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(7, 1fr)',
              gap: 2,
              aspectRatio: '52 / 7',
              width: '100%',
            }}
          >
            {heatData.map((level, i) => (
              <div
                key={i}
                style={{
                  background: HEAT_COLORS[level],
                  transition: 'background 500ms',
                }}
              />
            ))}
          </div>

          {/* Month labels */}
          <div className="mt-[6px] flex justify-between">
            {['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'].map((m) => (
              <span key={m} className="font-mono" style={{ fontSize: 11, color: '#a3a3a3' }}>
                {m}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t" style={{ borderColor: '#141414' }} />

          {/* Metrics row — stronger typographic hierarchy */}
          <div className="flex gap-8">
            {([['847','COMMITS'], ['34','REPOS'], ['12','PRS']] as const).map(([num, label]) => (
              <div key={label}>
                <div
                  className="font-display font-extrabold leading-none text-body"
                  style={{ fontSize: 22 }}
                >
                  {num}
                </div>
                <div
                  className="mt-[4px] font-mono tracking-[0.1em]"
                  style={{ fontSize: 11, color: '#737373' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATS badge — sharp corner stamp, no outer glow */}
        <div
          className="absolute bottom-0 right-0 bg-accent font-mono font-bold tracking-[0.06em] text-black"
          style={{ fontSize: 13, padding: '5px 12px' }}
        >
          94% ATS
        </div>
      </motion.div>

      {/* ── Social proof row ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[2] mt-5 flex items-center gap-3"
      >
        {/* Avatar stack */}
        <div className="flex items-center">
          {[
            { letter: 'D', bg: '#4afe80',               tc: 'black'   },
            { letter: 'A', bg: 'rgba(74,254,128,0.28)',  tc: '#4afe80', ml: -8 },
            { letter: 'R', bg: 'rgba(74,254,128,0.14)',  tc: '#4afe80', ml: -8 },
          ].map(({ letter, bg, tc, ml }, i) => (
            <div
              key={i}
              className="flex items-center justify-center font-mono font-bold"
              style={{
                width: 24,
                height: 24,
                background: bg,
                color: tc,
                fontSize: 12,
                border: '2px solid #080808',
                marginLeft: ml ?? 0,
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="h-3 w-px bg-border" />

        <span className="font-mono" style={{ fontSize: 12, color: '#737373' }}>
          generated for{' '}
          <span style={{ color: '#4afe80' }}>@dishant11max</span>
        </span>
      </motion.div>

      {/* Watermark — very subtle */}
      <div
        className="pointer-events-none absolute bottom-5 right-6 select-none font-display font-extrabold"
        style={{
          fontSize: 88,
          color: 'rgba(74,254,128,0.025)',
          letterSpacing: '-0.06em',
          userSelect: 'none',
        }}
      >
        94%
      </div>

      {/* Bottom rule — 1px, no gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'rgba(74,254,128,0.06)' }}
      />
    </div>
  )

  return (
    <div
      ref={heroRef}
      className="relative flex"
      style={{ minHeight: 'calc(100vh - 52px)' }}
      onMouseMove={(e) => {
        const rect = heroRef.current?.getBoundingClientRect()
        if (!rect) return
        spotX.set(e.clientX - rect.left)
        spotY.set(e.clientY - rect.top)
      }}
      onMouseLeave={() => {
        spotX.set(-9999)
        spotY.set(-9999)
      }}
    >
      {/* Mouse spotlight — ambient, no glow (taste-skill §7) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotBg }}
      />
      {leftCol}
      {rightCol}
    </div>
  )
}
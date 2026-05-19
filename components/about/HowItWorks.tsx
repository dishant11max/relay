'use client'

import { motion } from 'framer-motion'

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'CONNECT',
    desc: 'GitHub OAuth. One click. Read-only access.',
  },
  {
    num: '02',
    title: 'ANALYZE',
    desc: 'We scan your repos, READMEs, and commit history.',
  },
  {
    num: '03',
    title: 'GENERATE',
    desc: 'AI writes your resume and portfolio copy.',
  },
  {
    num: '04',
    title: 'SHIP',
    desc: 'Live portfolio URL. LaTeX resume ready to export.',
  },
]

export default function HowItWorks() {
  return (
    <section
      className="w-full border-t border-border"
      style={{ padding: '80px var(--page-px)' }}
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-4 font-mono tracking-[0.2em] text-accent"
        style={{ fontSize: 10 }}
      >
        THE PROCESS
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="mb-16 font-display font-extrabold text-body"
        style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.08, maxWidth: 480 }}
      >
        Four steps. One connection.
      </motion.h2>

      {/* Steps — vertical on mobile, horizontal on desktop */}
      <div className="relative flex flex-col sm:flex-row sm:items-start gap-0">
        {/* Connecting line — horizontal desktop */}
        <div
          className="pointer-events-none absolute hidden sm:block top-[14px] left-0 right-0 h-px"
          style={{ background: 'rgba(74,254,128,0.12)' }}
        />

        {PROCESS_STEPS.map(({ num, title, desc }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="relative flex flex-row sm:flex-col flex-1 gap-4 sm:gap-0"
            style={{
              paddingBottom: i < PROCESS_STEPS.length - 1 ? '32px' : '0',
            }}
          >
            {/* Vertical connecting line on mobile */}
            {i < PROCESS_STEPS.length - 1 && (
              <div
                className="absolute sm:hidden left-[13px] top-[28px] bottom-0 w-px"
                style={{ background: 'rgba(74,254,128,0.12)' }}
              />
            )}

            {/* Dot / number circle */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className="flex h-7 w-7 items-center justify-center font-mono text-[11px] font-bold"
                style={{
                  background: '#0b0b0b',
                  border: '1px solid rgba(74,254,128,0.3)',
                  color: '#4afe80',
                }}
              >
                {i + 1}
              </div>
            </div>

            {/* Text */}
            <div className="sm:mt-6 sm:pr-6">
              <p
                className="mb-1.5 font-mono tracking-[0.1em] text-accent"
                style={{ fontSize: 10 }}
              >
                {num} · {title}
              </p>
              <p
                className="font-display font-bold text-body"
                style={{ fontSize: 18, letterSpacing: '-0.02em', lineHeight: 1.3 }}
              >
                {title}
              </p>
              <p
                className="mt-2 font-mono leading-[1.7]"
                style={{ fontSize: 12, color: '#737373' }}
              >
                {desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

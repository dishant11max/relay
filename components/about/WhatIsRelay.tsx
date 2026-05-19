'use client'

import { motion, type Variants } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'You write code on GitHub',
    body: 'GitHub is where millions of developers store their projects. Every commit, every repository, every contribution is recorded there but most recruiters never see it.',
  },
  {
    num: '02',
    title: 'Relay reads your entire history',
    body: 'Our AI analyzes your commit patterns, project quality, tech stack, and documentation. It extracts the professional signal buried inside your code.',
  },
  {
    num: '03',
    title: 'You get a portfolio and a resume instantly',
    body: 'In under 60 seconds, Relay generates a shareable portfolio page and an ATS-optimized resume tailored to the roles you are targeting.',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export default function WhatIsRelay() {
  return (
    <section
      className="w-full border-t border-border"
      style={{ paddingTop: '64px', paddingBottom: '64px', paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-4 font-mono tracking-[0.2em] text-accent"
        style={{ fontSize: 13 }}
      >
        WHAT IS RELAY
      </motion.p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display font-extrabold text-body mb-16"
        style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.08, maxWidth: 640 }}
      >
        Turn your GitHub activity into a professional portfolio automatically.
      </motion.h2>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch">
        {STEPS.map(({ num, title, body }, i) => (
          <motion.div
            key={num}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`relative flex flex-col h-full border-t border-[#1a1a1a] ${
              i < STEPS.length - 1 ? 'md:border-r md:border-b-0' : ''
            }`}
            style={{
              padding: 'clamp(28px, 5vw, 40px) clamp(20px, 4vw, 36px)',
            }}
          >
            {/* Step number — large background watermark */}
            <div
              className="pointer-events-none absolute select-none font-display font-extrabold"
              style={{
                fontSize: 80,
                color: 'rgba(74,254,128,0.04)',
                top: 12,
                right: 20,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              {num}
            </div>

            {/* Step number badge */}
            <div
              className="mb-6 flex h-8 w-8 items-center justify-center font-mono text-[13px] font-bold"
              style={{
                background: 'rgba(74,254,128,0.08)',
                border: '1px solid rgba(74,254,128,0.2)',
                color: '#4afe80',
              }}
            >
              {num}
            </div>

            <h3
              className="mb-3 font-display font-bold text-body"
              style={{ fontSize: 18, letterSpacing: '-0.02em', lineHeight: 1.3 }}
            >
              {title}
            </h3>
            <p className="font-mono flex-1 leading-[1.75]" style={{ fontSize: 14, color: '#737373' }}>
              {body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

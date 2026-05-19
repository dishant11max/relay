'use client'

import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section
      className="w-full border-t border-border text-center"
      style={{ padding: '80px var(--page-px) 48px' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 font-mono tracking-[0.18em] text-accent"
        style={{ fontSize: 10 }}
      >
        ABOUT RELAY
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className="font-display font-extrabold text-body mx-auto"
        style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          letterSpacing: '-0.035em',
          lineHeight: 1.06,
          maxWidth: 720,
        }}
      >
        Built for developers who ship.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className="mx-auto mt-6 font-mono text-muted-2"
        style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 500 }}
      >
        Relay started as a frustration. GitHub profiles don&apos;t get you hired.
        Resumes take hours. Portfolios take days. We fixed all three in one connection.
      </motion.p>
    </section>
  )
}

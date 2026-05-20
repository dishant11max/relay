'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLAnchorElement>(null)
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

export default function FinalCTA() {
  const magnetic = useMagnetic(0.25)

  return (
    <section
      className="w-full border-t border-border"
      style={{ padding: '100px var(--page-px)' }}
    >
      {/* Asymmetric 2-col: 2fr headline / 1fr CTA stack */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 md:gap-0 items-end">

        {/* LEFT — giant left-aligned headline */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-mono tracking-[0.18em] text-accent mb-5"
            style={{ fontSize: 11 }}
          >
            GET STARTED
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <h2
              className="font-display font-extrabold text-body"
              style={{
                fontSize: 'clamp(38px, 5.5vw, 72px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
              }}
            >
              Your GitHub is already
            </h2>
            <h2
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(38px, 5.5vw, 72px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#1e1e1e',
                marginTop: 6,
              }}
            >
              a resume.
            </h2>
          </motion.div>
        </div>

        {/* RIGHT — badge + button + disclaimer stacked */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col gap-5 md:pl-12 md:items-start"
        >
          {/* Context line */}
          <p
            className="font-mono leading-[1.7]"
            style={{ fontSize: 14, color: '#5a5a5a', maxWidth: 260 }}
          >
            Connect once. Portfolio and resume in under 60 seconds.
          </p>

          {/* CTA */}
          <motion.a
            ref={magnetic.ref}
            href="/sign-in"
            className="cta-btn bg-accent font-mono font-bold tracking-[0.06em] text-black inline-block"
            style={{
              fontSize: 13,
              padding: '14px 28px',
              x: magnetic.sx,
              y: magnetic.sy,
            }}
          >
            CONNECT GITHUB FREE →
          </motion.a>

          {/* Disclaimer */}
          <p
            className="font-mono"
            style={{ fontSize: 12, color: '#333' }}
          >
            No credit card. Read-only access. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
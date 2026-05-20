'use client'

import { motion } from 'framer-motion'

export default function TheProblem() {
  return (
    <section
      className="w-full border-t border-border"
      style={{ padding: '100px var(--page-px)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* Left Side: The Statement */}
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 font-mono tracking-[0.2em] text-[#ff3333]"
            style={{ fontSize: 10 }}
          >
            THE PROBLEM
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="font-display font-extrabold text-body"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
          >
            Your best work is buried in commits. Recruiters don&apos;t read code.
          </motion.h2>
        </div>

        {/* Right Side: The Breakdown */}
        <div className="flex flex-col gap-8 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="border border-[#1a1a1a] p-6 bg-[#050505]"
          >
            <h3 className="font-mono text-accent mb-3 text-[13px] tracking-wider uppercase font-bold">
              The Reality
            </h3>
            <p className="font-mono text-[#737373] text-[14px] leading-relaxed">
              Traditional resumes force you to compress years of complex engineering into static bullet points. Meanwhile, your actual proof of work—your GitHub history—is completely ignored by ATS systems and non-technical recruiters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="border border-[#1a1a1a] p-6 bg-[#050505]"
          >
            <h3 className="font-mono text-accent mb-3 text-[13px] tracking-wider uppercase font-bold">
              The Fix
            </h3>
            <p className="font-mono text-[#737373] text-[14px] leading-relaxed">
              Relay translates raw engineering data (commits, PRs, languages, repos) into professional signal. We map your actual code contributions to industry-standard resume formats and portfolio layouts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

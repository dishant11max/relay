'use client'

import { motion } from 'framer-motion'

interface ResultCardProps {
  username: string
}

export function ResultCard({ username }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-2 border p-[14px_16px]"
      style={{
        borderColor: 'rgba(74,254,128,0.3)',
        background: '#0a0a0a',
      }}
    >
      {/* Row 1: username + score */}
      <div className="mb-2.5 flex items-center justify-between">
        <span className="font-mono text-[15px] font-bold text-body">
          @{username || 'dishant11max'}
        </span>
        <span className="font-mono text-[15px] font-bold text-accent">94/100</span>
      </div>

      {/* ATS bar */}
      <div className="mb-3 h-[3px] bg-border">
        <div
          className="h-full bg-accent"
          style={{
            width: '94%',
            transition: 'width 800ms ease',
          }}
        />
      </div>

      {/* Stack pills */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {['Next.js', 'TypeScript', 'React', 'Supabase'].map((s) => (
          <span
            key={s}
            className="border px-2 py-0.5 font-mono text-[13px] text-accent"
            style={{
              background: 'rgba(74,254,128,0.09)',
              borderColor: 'rgba(74,254,128,0.2)',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Repo line */}
      <p className="mb-3 font-mono text-[13px]" style={{ color: '#555' }}>
        12 public repos ·{' '}
        <span className="text-accent">3 portfolio-worthy</span>
      </p>

      {/* CTA button */}
      <button className="w-full bg-accent py-0 font-mono text-[13px] font-black text-black"
        style={{ height: '34px' }}>
        VIEW GENERATED PORTFOLIO →
      </button>

      {/* Disclaimer */}
      <p className="mt-[7px] text-center font-mono text-[12px]" style={{ color: '#a3a3a3' }}>
        demo preview — sign in to generate the real thing
      </p>
    </motion.div>
  )
}
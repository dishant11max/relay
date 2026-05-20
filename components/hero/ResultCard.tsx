'use client'

import { motion } from 'framer-motion'
import type { AnalysisResult } from './TerminalLog'

interface ResultCardProps {
  result: AnalysisResult
}

const SCORE_COLOR = (s: number) =>
  s >= 80 ? '#4afe80' : s >= 60 ? '#f5c518' : 'rgba(255,77,77,0.85)'

const SCORE_LABEL = (s: number) =>
  s >= 80 ? 'STRONG' : s >= 60 ? 'GOOD' : 'NEEDS WORK'

export function ResultCard({ result }: ResultCardProps) {
  const { username, score } = result
  const color = SCORE_COLOR(score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mt-3 border"
      style={{
        borderColor: '#1a1a1a',
        background: '#0a0a0a',
        padding: '12px 16px',
      }}
    >
      {/* Score row */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[14px] text-muted-2">
          @{username}
        </span>
        <div className="flex items-baseline gap-2">
          <span
            className="font-display font-extrabold"
            style={{ fontSize: 22, color, lineHeight: 1 }}
          >
            {score}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color }}>
            / 100 · {SCORE_LABEL(score)}
          </span>
        </div>
      </div>

      {/* Thin score bar */}
      <div className="mb-3 h-[2px] bg-border">
        <motion.div
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ background: color }}
        />
      </div>

      {/* CTA */}
      <a
        href="/sign-in"
        className="block w-full bg-accent text-center font-mono text-[13px] font-black text-black"
        style={{ height: '34px', lineHeight: '34px' }}
      >
        GENERATE PORTFOLIO + RESUME →
      </a>
    </motion.div>
  )
}
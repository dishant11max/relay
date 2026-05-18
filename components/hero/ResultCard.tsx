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
  const { username, score, topLanguages, publicRepos, portfolioWorthy, breakdown } = result
  const color = SCORE_COLOR(score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-2 border p-[14px_16px]"
      style={{
        borderColor: `${color}44`,
        background: '#0a0a0a',
      }}
    >
      {/* Row 1: username + score */}
      <div className="mb-2.5 flex items-center justify-between">
        <span className="font-mono text-[15px] font-bold text-body">
          @{username}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[15px] font-bold" style={{ color }}>
            {score}/100
          </span>
          <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color }}>
            {SCORE_LABEL(score)}
          </span>
        </div>
      </div>

      {/* ATS bar */}
      <div className="mb-3 h-[3px] bg-border">
        <motion.div
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ background: color }}
        />
      </div>

      {/* Score breakdown */}
      <div className="mb-3 flex flex-col gap-1">
        {breakdown.map((b) => (
          <div key={b.label} className="flex items-center justify-between">
            <span className="font-mono text-[12px]" style={{ color: '#555' }}>
              {b.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px]" style={{ color: '#333' }}>
                {b.note}
              </span>
              <span className="font-mono text-[12px]" style={{ color: b.pts >= b.max * 0.6 ? color : '#444' }}>
                {b.pts}/{b.max}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stack pills */}
      {topLanguages.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {topLanguages.map((s) => (
            <span
              key={s}
              className="border px-2 py-0.5 font-mono text-[13px]"
              style={{
                background: 'rgba(74,254,128,0.09)',
                borderColor: 'rgba(74,254,128,0.2)',
                color,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Repo line */}
      <p className="mb-3 font-mono text-[13px]" style={{ color: '#555' }}>
        {publicRepos} public repos ·{' '}
        <span style={{ color }}>{portfolioWorthy} portfolio-worthy</span>
      </p>

      {/* CTA button */}
      <a
        href="/sign-in"
        className="block w-full bg-accent text-center font-mono text-[13px] font-black text-black"
        style={{ height: '34px', lineHeight: '34px' }}
      >
        GENERATE RESUME + PORTFOLIO →
      </a>

      {/* Disclaimer */}
      <p className="mt-[7px] text-center font-mono text-[12px]" style={{ color: '#a3a3a3' }}>
        sign in to get your full resume in 60s
      </p>
    </motion.div>
  )
}
'use client'

import { useEffect, useRef, useState } from 'react'

export interface AnalysisResult {
  username: string
  name: string | null
  avatarUrl: string | null
  score: number
  breakdown: { label: string; pts: number; max: number; note: string }[]
  topLanguages: string[]
  publicRepos: number
  portfolioWorthy: number
  followers: number
}

interface TerminalLogProps {
  username: string
  onDone: (result: AnalysisResult | null, error?: string) => void
}

export function TerminalLog({ username, onDone }: TerminalLogProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const doneRef = useRef(false)

  useEffect(() => {
    // Log lines to animate while we fetch
    const LOG_LINES = [
      `> fetching @${username}...`,
      '> reading README quality...',
      '> detecting tech stack...',
      '> calculating ATS score...',
    ]

    let index = 0
    let result: AnalysisResult | null = null
    let fetchError: string | undefined
    let fetchDone = false
    let animDone = false

    const tryFinish = () => {
      if (fetchDone && animDone && !doneRef.current) {
        doneRef.current = true
        setTimeout(() => onDone(result, fetchError), 300)
      }
    }

    // Start fetching immediately
    fetch(`/api/analyze-hero?username=${encodeURIComponent(username)}`)
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok || json.error) {
          fetchError = json.error || 'Analysis failed.'
        } else {
          result = json as AnalysisResult
        }
      })
      .catch(() => { fetchError = 'Network error. Please try again.' })
      .finally(() => {
        fetchDone = true
        tryFinish()
      })

    // Animate log lines
    const interval = setInterval(() => {
      if (index < LOG_LINES.length) {
        setVisibleLines((prev) => [...prev, LOG_LINES[index]])
        index++
      } else {
        clearInterval(interval)
        animDone = true
        tryFinish()
      }
    }, 260)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  return (
    <div className="mt-2 space-y-0.5 pb-1">
      {visibleLines.map((line, i) => (
        <div
          key={i}
          className="font-mono text-[14px] leading-[1.9]"
          style={{
            color: 'rgba(74,254,128,0.7)',
            animation: 'fadeIn 150ms ease forwards',
          }}
        >
          {line}
        </div>
      ))}
      {visibleLines.length > 0 && (
        <span
          className="font-mono text-[14px]"
          style={{
            color: 'rgba(74,254,128,0.7)',
            animation: 'blink 0.9s step-end infinite',
          }}
        >
          ▋
        </span>
      )}
    </div>
  )
}
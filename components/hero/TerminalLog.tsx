'use client'

import { useEffect, useRef, useState } from 'react'

const LOG_LINES = [
  '> fetching repos...',
  '> reading README quality...',
  '> detecting tech stack...',
  '> calculating ATS score...',
]

interface TerminalLogProps {
  onDone: () => void
}

export function TerminalLog({ onDone }: TerminalLogProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const doneRef = useRef(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < LOG_LINES.length) {
        setVisibleLines((prev) => [...prev, LOG_LINES[index]])
        index++
      } else {
        clearInterval(interval)
        if (!doneRef.current) {
          doneRef.current = true
          setTimeout(onDone, 400)
        }
      }
    }, 230)
    return () => clearInterval(interval)
  }, [onDone])

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
      {visibleLines.length === LOG_LINES.length && (
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
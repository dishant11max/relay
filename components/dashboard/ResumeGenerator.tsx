'use client'

import { useState } from 'react'
import { DashboardData } from './DashboardClient'

interface Props {
  username: string
  githubToken: string | null
  data: DashboardData
}

type State = 'idle' | 'loading' | 'done' | 'error'

export default function ResumeGenerator({ username, githubToken, data }: Props) {
  const [state, setState] = useState<State>('idle')
  const [latex, setLatex] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!githubToken) {
      setError('GitHub token missing. Please sign out and reconnect.')
      setState('error')
      return
    }

    setState('loading')
    setError('')

    try {
      // Fetch full GitHub user info with the token
      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${githubToken}` },
      })
      const githubUser = await userRes.json()

      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUser,
          repos: data.repos,
          topLanguages: data.topLanguages,
        }),
      })

      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? 'Generation failed')

      setLatex(json.latex)
      setState('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  const copyLatex = async () => {
    await navigator.clipboard.writeText(latex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ marginTop: 32 }}>
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <div>
          <p
            className="font-mono tracking-[0.16em] text-accent"
            style={{ fontSize: 10, marginBottom: 4 }}
          >
            RESUME GENERATOR
          </p>
          <p className="font-mono font-bold text-body" style={{ fontSize: 15 }}>
            Jake's LaTeX Resume
          </p>
        </div>

        <div className="flex items-center gap-3">
          {state === 'done' && (
            <>
              <a
                href="https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-muted-2 transition-colors hover:text-body"
                style={{ fontSize: 11, textDecoration: 'none' }}
              >
                VIEW TEMPLATE ↗
              </a>
              <a
                href="https://www.overleaf.com/project/new"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-black bg-accent transition-opacity hover:opacity-90"
                style={{ fontSize: 11, padding: '6px 14px', textDecoration: 'none' }}
              >
                OPEN OVERLEAF ↗
              </a>
            </>
          )}

          {state !== 'done' && (
            <button
              onClick={generate}
              disabled={state === 'loading'}
              className="font-mono font-bold text-black bg-accent disabled:opacity-60 transition-opacity hover:opacity-90"
              style={{ fontSize: 11, padding: '8px 18px', border: 'none', cursor: state === 'loading' ? 'not-allowed' : 'pointer' }}
            >
              {state === 'loading' ? 'GENERATING...' : 'GENERATE RESUME →'}
            </button>
          )}

          {state === 'done' && (
            <button
              onClick={generate}
              className="font-mono text-muted-2 transition-colors hover:text-body"
              style={{ fontSize: 11, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              REGENERATE
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {state === 'loading' && (
        <div
          style={{
            background: '#0a0a0a',
            border: '1px solid #1a1a1a',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              border: '2px solid #1a1a1a',
              borderTopColor: '#4afe80',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <p className="font-mono font-bold text-body" style={{ fontSize: 13, marginBottom: 6 }}>
              Generating your resume...
            </p>
            <p className="font-mono text-muted-2" style={{ fontSize: 11 }}>
              Gemini is analyzing your {data.repos.length} repositories and writing bullet points.
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {state === 'error' && (
        <div
          className="border border-danger font-mono text-danger"
          style={{ padding: '16px 20px', fontSize: 13 }}
        >
          {error}
        </div>
      )}

      {/* Idle prompt */}
      {state === 'idle' && (
        <div
          style={{
            background: '#0a0a0a',
            border: '1px solid #1a1a1a',
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Document icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4afe80" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <p className="font-mono font-bold text-body" style={{ fontSize: 14 }}>
            Ready to generate
          </p>
          <p className="font-mono text-muted-2" style={{ fontSize: 12, textAlign: 'center', maxWidth: 360 }}>
            We'll use your {data.repos.length} GitHub repositories and {data.topLanguages.map(l => l.lang).join(', ')} stack to generate a fully filled Jake's LaTeX resume. Takes ~10 seconds.
          </p>
        </div>
      )}

      {/* Done — LaTeX Output */}
      {state === 'done' && latex && (
        <div style={{ position: 'relative' }}>
          {/* Copy button overlaying the code block */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 10,
              display: 'flex',
              gap: 8,
            }}
          >
            <button
              onClick={copyLatex}
              className="font-mono font-bold transition-all"
              style={{
                fontSize: 10,
                padding: '6px 14px',
                background: copied ? '#4afe80' : '#1a1a1a',
                color: copied ? '#000' : '#e8e8e8',
                border: '1px solid #2a2a2a',
                cursor: 'pointer',
                letterSpacing: '0.08em',
              }}
            >
              {copied ? '✓ COPIED!' : 'COPY LATEX'}
            </button>
          </div>

          {/* Instruction banner */}
          <div
            style={{
              background: 'rgba(74,254,128,0.06)',
              border: '1px solid rgba(74,254,128,0.2)',
              borderBottom: 'none',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span className="font-mono text-accent" style={{ fontSize: 11 }}>✦</span>
            <span className="font-mono text-accent" style={{ fontSize: 11 }}>
              Open Overleaf → Jake's Template → replace everything between \begin&#123;document&#125; and \end&#123;document&#125; with this code → Compile.
            </span>
          </div>

          {/* Code block */}
          <pre
            style={{
              background: '#070707',
              border: '1px solid #1a1a1a',
              padding: '24px 20px',
              overflowX: 'auto',
              overflowY: 'auto',
              maxHeight: 500,
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              lineHeight: 1.7,
              color: '#a3a3a3',
              whiteSpace: 'pre',
            }}
          >
            <code>{latex}</code>
          </pre>
        </div>
      )}

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

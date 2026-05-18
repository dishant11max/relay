'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function SignInClient() {
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleGitHubLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
          scopes: 'repo:status public_repo read:user',
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Error logging in:', error)
      setLoading(false)
      alert('Failed to connect to GitHub. Please ensure your environment variables are configured.')
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div 
        className="w-full max-w-md border border-border bg-surface"
        style={{ padding: '48px 40px' }}
      >
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="#e8e8e8">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </div>
        
        <h1 className="font-display font-extrabold text-body text-center text-3xl mb-3">
          Welcome to Relay
        </h1>
        <p className="font-mono text-muted-2 text-center text-[13px] leading-relaxed mb-8">
          Connect your GitHub account to instantly generate your portfolio and ATS resume.
        </p>

        <div className="mb-8 border border-border p-4 bg-[#0a0a0a] space-y-3">
          <p className="font-mono text-[10px] tracking-[0.1em] text-muted-2 mb-2">PERMISSIONS REQUESTED</p>
          {[
            'Public repository data (read-only)',
            'Profile information & avatar',
            'Commit activity & language stats'
          ].map((perm, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="font-mono text-accent text-[12px] mt-0.5">✓</span>
              <span className="font-mono text-body text-[12px]">{perm}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={handleGitHubLogin}
          disabled={loading}
          className="w-full bg-accent text-black font-mono font-bold text-[13px] tracking-[0.06em] h-12 transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="font-mono animate-pulse">CONNECTING...</span>
          ) : (
            <>
              CONNECT GITHUB 
              <span className="font-mono text-[14px]">→</span>
            </>
          )}
        </button>
        
        <p className="mt-5 text-center font-mono text-[11px] text-muted-2">
          By connecting, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

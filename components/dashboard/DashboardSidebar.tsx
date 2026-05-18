'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

type Section = 'overview' | 'repos' | 'activity' | 'resume'

const NAV_ITEMS: { label: string; section: Section; icon: string }[] = [
  { label: 'OVERVIEW',  section: 'overview',  icon: '◈' },
  { label: 'REPOS',     section: 'repos',     icon: '⬡' },
  { label: 'ACTIVITY',  section: 'activity',  icon: '⌁' },
  { label: 'RESUME',    section: 'resume',    icon: '◻' },
]

interface Props {
  username: string
  avatarUrl: string | null
  activeSection: Section
  setActiveSection: (s: string) => void
}

export default function DashboardSidebar({
  username,
  avatarUrl,
  activeSection,
  setActiveSection,
}: Props) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 200,
        height: '100dvh',
        background: '#0a0a0a',
        borderRight: '1px solid #161616',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '0 20px', marginBottom: 32 }}>
        <a href="/" className="flex items-center gap-2">
          <div
            className="bg-accent flex items-center justify-center font-mono font-black text-black"
            style={{ width: 20, height: 20, fontSize: 13 }}
          >
            R
          </div>
          <span className="font-mono text-body" style={{ fontSize: 13, letterSpacing: '0.08em' }}>
            RELAY
          </span>
        </a>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.section
          return (
            <button
              key={item.section}
              onClick={() => setActiveSection(item.section)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 20px',
                background: isActive ? 'rgba(74,254,128,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid #4afe80' : '2px solid transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: 12, color: isActive ? '#4afe80' : '#3a3a3a' }}
              >
                {item.icon}
              </span>
              <span
                className="font-mono font-bold"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  color: isActive ? '#4afe80' : '#737373',
                }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* User info */}
      <div style={{ borderTop: '1px solid #141414', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username}
              style={{ width: 28, height: 28, background: '#1a1a1a' }}
            />
          ) : (
            <div
              className="bg-accent font-mono font-bold text-black flex items-center justify-center"
              style={{ width: 28, height: 28, fontSize: 11 }}
            >
              {username.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-mono font-bold text-body" style={{ fontSize: 11 }}>
              @{username}
            </div>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#4afe80',
                display: 'inline-block',
                marginRight: 4,
              }}
            />
            <span className="font-mono text-muted-2" style={{ fontSize: 9 }}>
              connected
            </span>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="font-mono"
          style={{
            width: '100%',
            padding: '7px 0',
            fontSize: 10,
            background: 'transparent',
            border: '1px solid #1a1a1a',
            color: '#737373',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            transition: 'border-color 150ms, color 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ff4d4d'
            e.currentTarget.style.color = '#ff4d4d'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1a1a1a'
            e.currentTarget.style.color = '#737373'
          }}
        >
          SIGN OUT
        </button>
      </div>
    </aside>
  )
}

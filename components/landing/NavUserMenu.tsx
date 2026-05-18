'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  username: string
  avatarUrl: string | null
}

export default function NavUserMenu({ username, avatarUrl }: Props) {
  const [open, setOpen] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const initials = username.slice(0, 2).toUpperCase()

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Avatar Button */}
      <button className="flex items-center gap-2 cursor-pointer border-none bg-transparent">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            style={{ width: 32, height: 32, borderRadius: 0, background: '#1a1a1a' }}
          />
        ) : (
          <div
            className="bg-accent font-mono font-bold text-black flex items-center justify-center"
            style={{ width: 32, height: 32, fontSize: 13 }}
          >
            {initials}
          </div>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              width: 160,
              background: '#0c0c0c',
              border: '1px solid #1a1a1a',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 50,
            }}
          >
            <div style={{ padding: '12px 14px', borderBottom: '1px solid #141414' }}>
              <span className="font-mono font-bold text-body" style={{ fontSize: 11 }}>
                @{username}
              </span>
            </div>
            
            <a
              href="/dashboard"
              className="font-mono text-muted-2 hover:bg-[#111] hover:text-accent transition-colors"
              style={{ padding: '10px 14px', fontSize: 11, textDecoration: 'none' }}
            >
              Dashboard
            </a>
            
            <button
              onClick={handleSignOut}
              className="font-mono text-muted-2 text-left hover:bg-[#111] hover:text-danger transition-colors border-none bg-transparent cursor-pointer"
              style={{ padding: '10px 14px', fontSize: 11 }}
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface Props {
  isSignedIn: boolean
}

export default function MobileNavMenu({ isSignedIn }: Props) {
  const [open, setOpen] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <div className="sm:hidden flex items-center ml-2">
      <button
        onClick={() => setOpen(true)}
        className="p-1 text-muted-2 hover:text-body transition-colors"
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-[100dvh] bg-[#080808] z-50 flex flex-col px-6 py-6"
            style={{ borderBottom: '1px solid #1a1a1a' }}
          >
            <div className="flex justify-between items-center mb-12">
              <a href="/" className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 items-center justify-center bg-accent">
                  <span className="font-mono text-[14px] font-black text-black">R</span>
                </div>
                <span className="font-mono text-[15px] tracking-[0.06em] text-body">RELAY</span>
              </a>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-muted-2 hover:text-body transition-colors"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-6 font-mono text-[24px]">
              <Link href="/browse" onClick={() => setOpen(false)} className="text-body hover:text-accent transition-colors">
                BROWSE
              </Link>
              <Link href="/pricing" onClick={() => setOpen(false)} className="text-body hover:text-accent transition-colors">
                PRICING
              </Link>
              {isSignedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="text-body hover:text-accent transition-colors">
                    DASHBOARD
                  </Link>
                  <button onClick={handleSignOut} className="text-left text-danger hover:text-accent transition-colors font-mono border-none bg-transparent" style={{ fontSize: 24, padding: 0 }}>
                    SIGN OUT
                  </button>
                </>
              ) : (
                <Link href="/sign-in" onClick={() => setOpen(false)} className="text-body hover:text-accent transition-colors">
                  SIGN IN
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

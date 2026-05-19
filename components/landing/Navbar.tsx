import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavUserMenu from './NavUserMenu'
import MobileNavMenu from './MobileNavMenu'

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const username = user?.user_metadata?.user_name ?? user?.email ?? null
  const avatarUrl = user?.user_metadata?.avatar_url ?? null

  return (
    <>
      <div style={{ height: '52px' }} />
      <nav
        className="fixed top-0 left-0 w-full z-50 border-b border-[#161616]"
        style={{
          height: '52px',
          background: 'rgba(8,8,8,0.92)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          padding: '0 var(--page-px)',
        }}
      >
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-5 w-5 items-center justify-center bg-accent">
              <span className="font-mono text-[14px] font-black text-black">R</span>
            </div>
            <span className="font-mono text-[15px] tracking-[0.06em] text-body">RELAY</span>
          </a>

          {/* Right nav */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/browse"
              className="hidden sm:block font-mono text-[13px] md:text-[14px] tracking-wide text-muted-2 transition-colors hover:text-body"
            >
              BROWSE
            </a>
            <a
              href="/pricing"
              className="hidden sm:block font-mono text-[13px] md:text-[14px] tracking-wide text-muted-2 transition-colors hover:text-body"
            >
              PRICING
            </a>
            <a
              href="/about"
              className="hidden sm:block font-mono text-[13px] md:text-[14px] tracking-wide text-muted-2 transition-colors hover:text-body"
            >
              ABOUT
            </a>
            
            {user && username ? (
              <NavUserMenu username={username} avatarUrl={avatarUrl} />
            ) : (
              <>
                <a
                  href="/sign-in"
                  className="hidden sm:block font-mono text-[13px] md:text-[14px] tracking-wide text-muted-2 transition-colors hover:text-body"
                >
                  SIGN IN
                </a>
                <a
                  href="/sign-in"
                  className="bg-accent px-[12px] md:px-[14px] py-[6px] md:py-[7px] font-mono text-[11px] md:text-[13px] font-bold tracking-[0.08em] text-black transition-opacity hover:opacity-90 whitespace-nowrap"
                >
                  CONNECT →
                </a>
              </>
            )}
            <MobileNavMenu isSignedIn={!!(user && username)} />
          </div>
        </div>
      </nav>
    </>
  )
}
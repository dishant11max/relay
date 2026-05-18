function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const NAV_LINKS = ['About', 'Privacy', 'Terms', 'Contact']

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-border"
      style={{ padding: '36px var(--page-px) 24px' }}
    >
      {/* Watermark */}
      <div
        className="pointer-events-none absolute select-none font-display font-extrabold"
        style={{
          fontSize: 160,
          color: 'rgba(255,255,255,0.018)',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        RELAY
      </div>

      {/* Main row */}
      <div className="relative flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 items-center justify-center bg-accent">
            <span className="font-mono text-[14px] font-black text-black">R</span>
          </div>
          <span className="font-mono text-[15px] tracking-[0.06em] text-body">RELAY</span>
        </a>

        {/* Center links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-5" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-muted transition-colors hover:text-body"
              style={{ fontSize: 13 }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {[
            { icon: <GitHubIcon />,   label: 'GitHub'   },
            { icon: <XIcon />,        label: 'X'        },
            { icon: <LinkedInIcon />, label: 'LinkedIn' },
          ].map(({ icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-muted transition-colors hover:text-accent"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="relative mt-5 text-center font-mono text-muted" style={{ fontSize: 13 }}>
        © 2026 Relay. All rights reserved.
      </p>
    </footer>
  )
}
export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#161616]"
      style={{
        height: '52px',
        background: 'rgba(8,8,8,0.88)',
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
          <span className="font-mono text-[15px] tracking-[0.06em] text-body">
            RELAY
          </span>
        </a>

        {/* Right nav */}
        <div className="flex items-center gap-6">
          <a
            href="/browse"
            className="font-mono text-[14px] tracking-wide text-muted-2 transition-colors hover:text-body"
          >
            BROWSE
          </a>
          <a
            href="/pricing"
            className="font-mono text-[14px] tracking-wide text-muted-2 transition-colors hover:text-body"
          >
            PRICING
          </a>
          <a
            href="/sign-in"
            className="font-mono text-[14px] tracking-wide text-muted-2 transition-colors hover:text-body"
          >
            SIGN IN
          </a>
          <a
            href="/sign-in"
            className="bg-accent px-[14px] py-[7px] font-mono text-[13px] font-bold tracking-[0.08em] text-black transition-opacity hover:opacity-90"
          >
            CONNECT GITHUB →
          </a>
        </div>
      </div>
    </nav>
  )
}
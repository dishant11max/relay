export default function BackgroundSystem() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Layer 1 — Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,254,128,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,254,128,0.022) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          minHeight: '100%',
        }}
      />

      {/* Layer 2 — Diagonal accent slashes (hero area only) */}
      <div
        className="absolute top-0 h-[140%] w-px"
        style={{
          right: '28%',
          background: 'rgba(74,254,128,0.055)',
          transform: 'rotate(12deg)',
          transformOrigin: 'top center',
        }}
      />
      <div
        className="absolute top-0 h-[140%] w-px"
        style={{
          right: '34%',
          background: 'rgba(74,254,128,0.025)',
          transform: 'rotate(12deg)',
          transformOrigin: 'top center',
        }}
      />

      {/* Layer 3 — Corner brackets */}
      {/* Top-left L-bracket */}
      <div className="absolute left-0 top-0 opacity-[0.16]">
        <div className="absolute left-0 top-0 h-0.5 w-[18px] bg-accent" />
        <div className="absolute left-0 top-0 h-[18px] w-0.5 bg-accent" />
      </div>
      {/* Bottom-right reverse L-bracket */}
      <div className="absolute bottom-0 right-0 opacity-[0.16]">
        <div className="absolute bottom-0 right-0 h-0.5 w-[18px] bg-accent" />
        <div className="absolute bottom-0 right-0 h-[18px] w-0.5 bg-accent" />
      </div>

      {/* Layer 4 — Scanline */}
      <div
        className="absolute left-0 right-0 h-[100px]"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(74,254,128,0.011), transparent)',
          animation: 'scanline 9s linear infinite',
        }}
      />
    </div>
  )
}
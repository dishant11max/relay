export default function BackgroundSystem() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer 1 — Grid overlay — slightly stronger */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,254,128,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,254,128,0.032) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Layer 2 — Radial bloom: deep green halo from top-left (hero area) */}
      <div
        className="absolute"
        style={{
          top: '-10%',
          left: '-5%',
          width: '70vw',
          height: '70vw',
          maxWidth: 900,
          maxHeight: 900,
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(74,254,128,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Layer 3 — Diagonal accent slashes (hero area) */}
      <div
        className="absolute top-0 h-[140%] w-px"
        style={{
          right: '28%',
          background: 'rgba(74,254,128,0.07)',
          transform: 'rotate(12deg)',
          transformOrigin: 'top center',
        }}
      />
      <div
        className="absolute top-0 h-[140%] w-px"
        style={{
          right: '34%',
          background: 'rgba(74,254,128,0.032)',
          transform: 'rotate(12deg)',
          transformOrigin: 'top center',
        }}
      />

      {/* Layer 4 — Pulsing accent orb (bottom right) */}
      <div
        className="absolute"
        style={{
          bottom: '5%',
          right: '-8%',
          width: '50vw',
          height: '50vw',
          maxWidth: 640,
          maxHeight: 640,
          background:
            'radial-gradient(ellipse at 70% 70%, rgba(74,254,128,0.028) 0%, transparent 60%)',
          animation: 'orbPulse 8s ease-in-out infinite',
        }}
      />

      {/* Layer 5 — Corner brackets — more visible */}
      {/* Top-left */}
      <div className="absolute left-[var(--page-px)] top-[60px] opacity-30">
        <div className="absolute left-0 top-0 h-[1px] w-[28px] bg-accent" />
        <div className="absolute left-0 top-0 h-[28px] w-[1px] bg-accent" />
      </div>
      {/* Top-right */}
      <div className="absolute right-[var(--page-px)] top-[60px] opacity-30">
        <div className="absolute right-0 top-0 h-[1px] w-[28px] bg-accent" />
        <div className="absolute right-0 top-0 h-[28px] w-[1px] bg-accent" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-4 left-[var(--page-px)] opacity-20">
        <div className="absolute bottom-0 left-0 h-[1px] w-[28px] bg-accent" />
        <div className="absolute bottom-0 left-0 h-[28px] w-[1px] bg-accent" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-4 right-[var(--page-px)] opacity-20">
        <div className="absolute bottom-0 right-0 h-[1px] w-[28px] bg-accent" />
        <div className="absolute bottom-0 right-0 h-[28px] w-[1px] bg-accent" />
      </div>

      {/* Layer 6 — Scanline sweep */}
      <div
        className="absolute left-0 right-0 h-[120px]"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(74,254,128,0.014), transparent)',
          animation: 'scanline 11s linear infinite',
        }}
      />
    </div>
  )
}
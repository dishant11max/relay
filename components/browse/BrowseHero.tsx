import Navbar from '@/components/landing/Navbar'

export default function BrowseHero() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '64px var(--page-px) 0' }}>
        {/* Section label */}
        <p
          className="font-mono tracking-[0.18em] text-accent"
          style={{ fontSize: 13, marginBottom: 16 }}
        >
          COMMUNITY
        </p>

        {/* Heading */}
        <h1
          className="font-display font-extrabold text-body"
          style={{
            fontSize: 'clamp(40px, 10vw, 48px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 16,
          }}
        >
          Real devs. Real portfolios.
        </h1>

        {/* Subtext */}
        <p
          className="font-mono"
          style={{
            fontSize: 17,
            color: '#a3a3a3',
            maxWidth: 440,
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          Every portfolio here was generated from a GitHub profile in under 60 seconds.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 16, rowGap: 8, alignItems: 'center', marginTop: 0 }}>
          <span className="font-mono" style={{ fontSize: 14, color: '#a3a3a3' }}>
            847 portfolios live
          </span>
          <span
            className="hidden sm:inline font-mono"
            style={{ fontSize: 14, color: '#737373' }}
          >
            ·
          </span>
          <span className="font-mono" style={{ fontSize: 14, color: '#a3a3a3' }}>
            23 companies hiring
          </span>
          <span
            className="hidden sm:inline font-mono"
            style={{ fontSize: 14, color: '#737373' }}
          >
            ·
          </span>
          <span className="font-mono" style={{ fontSize: 14, color: '#a3a3a3' }}>
            avg 91% ATS score
          </span>
        </div>
      </div>
    </>
  )
}

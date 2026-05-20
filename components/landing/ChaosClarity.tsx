export default function ChaosClarity() {
  return (
    <section className="w-full border-t border-border">
      {/* Section label */}
      <div className="pb-8 pt-12" style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
        <p className="mb-3 font-mono tracking-[0.2em] text-accent" style={{ fontSize: 14 }}>
          CHAOS VS CLARITY
        </p>
        <h2
          className="font-display font-extrabold text-body"
          style={{ fontSize: 'clamp(24px, 5vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          Stop copy-pasting into 14 different templates.
        </h2>
      </div>

      {/* Two columns */}
      <div className="flex flex-col md:flex-row" style={{ borderTop: '1px solid #1a1a1a' }}>
        {/* LEFT — The Old Way */}
        <div
          className="relative flex-1 overflow-hidden border-b border-[#1a1a1a] md:border-b-0 md:border-r"
          style={{
            background: 'rgba(255,77,77,0.025)',
            padding: '48px clamp(24px, 5vw, 48px) 64px',
          }}
        >
          <p className="mb-4 font-mono text-[12px] tracking-[0.12em]" style={{ color: 'rgba(255,77,77,0.4)' }}>
            WITHOUT RELAY
          </p>

          {/* Scattered cards */}
          <div className="relative h-[180px] w-full mt-6">
            {[
              { label: 'LinkedIn',         rot: '-2deg',   top: '5%',   left: '5%' },
              { label: 'Notion template',  rot: '1.5deg',  top: '25%',  right: '5%' },
              { label: 'PDF formatter',    rot: '-1deg',   top: '55%',  left: '10%' },
              { label: 'Email signature',  rot: '2deg',    top: '75%',  right: '10%' },
            ].map(({ label, rot, top, left, right }) => (
              <div
                key={label}
                className="absolute border font-mono text-[14px] z-10"
                style={{
                  background: '#0f0f0f',
                  borderColor: 'rgba(255,77,77,0.4)',
                  color: 'rgba(255,77,77,0.7)',
                  padding: '6px 10px',
                  transform: `rotate(${rot})`,
                  top,
                  left,
                  right,
                }}
              >
                {label}{' '}
                <span style={{ color: 'rgba(255,77,77,0.5)' }}>↗</span>
              </div>
            ))}
          </div>

          {/* Big stat */}
          <div className="mt-8 text-center relative z-20">
            <div
              className="font-display font-extrabold leading-none text-[56px] sm:text-[clamp(56px,15vw,80px)]"
              style={{ color: 'rgba(255,77,77,0.25)' }}
            >
              4+
            </div>
            <div className="font-mono text-[14px] tracking-[0.08em]" style={{ color: 'rgba(255,77,77,0.3)' }}>
              hours per application
            </div>
            <p className="mt-3 font-mono text-[14px]" style={{ color: '#a3a3a3' }}>
              Repeated for every role you apply to.
            </p>
          </div>
        </div>

        {/* RIGHT — The Relay Way */}
        <div
          className="relative flex-1"
          style={{
            background: 'rgba(74,254,128,0.018)',
            padding: '48px clamp(24px, 5vw, 48px) 64px',
          }}
        >
          <p className="mb-4 font-mono text-[12px] tracking-[0.12em]" style={{ color: 'rgba(74,254,128,0.4)' }}>
            WITH RELAY
          </p>

          {/* Mock search result card */}
          <div
            className="mx-auto mt-10 border"
            style={{
              background: '#0c0c0c',
              borderColor: '#737373',
              padding: '14px 16px',
              maxWidth: 280,
            }}
          >
            {/* Input row */}
            <div className="mb-3 border-b border-border pb-2">
              <span className="font-mono text-[13px]" style={{ color: '#737373' }}>
                github.com/username
              </span>
            </div>

            {/* Results */}
            {[
              'Portfolio generated · dishant11max.relay.dev',
              'ATS score: 91% · Resume exported as PDF',
              'Twitter thread drafted · 7 posts ready',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2" style={{ marginBottom: 6 }}>
                <span className="font-mono text-muted-2" style={{ fontSize: 13 }}>{item}</span>
              </div>
            ))}

            <p className="mt-2 font-mono" style={{ fontSize: 13, color: '#a3a3a3' }}>
              Completed in 47 seconds
            </p>
          </div>

          {/* Big stat */}
          <div className="mt-10 text-center">
            <div
              className="font-display font-extrabold leading-none text-accent text-[56px] sm:text-[clamp(56px,15vw,80px)]"
            >
              60s
            </div>
            <div className="font-mono text-muted-2" style={{ fontSize: 14 }}>
              from GitHub to portfolio
            </div>
            <p className="mt-3 font-mono text-muted-2" style={{ fontSize: 14 }}>
              Auto-updated with every new commit.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
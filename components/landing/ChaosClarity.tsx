export default function ChaosClarity() {
  return (
    <section className="w-full border-t border-border">
      {/* Section label */}
      <div className="pb-8 pt-12 text-center" style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
        <p className="font-mono tracking-[0.2em] text-accent" style={{ fontSize: 14 }}>
          CHAOS VS CLARITY
        </p>
      </div>

      {/* Two columns */}
      <div className="flex" style={{ borderTop: '1px solid #1a1a1a' }}>
        {/* LEFT — The Old Way */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            background: 'rgba(255,77,77,0.025)',
            borderRight: '1px solid #1a1a1a',
            padding: '48px 48px 64px',
          }}
        >
          <p className="mb-4 font-mono text-[12px] tracking-[0.12em]" style={{ color: 'rgba(255,77,77,0.4)' }}>
            THE OLD WAY
          </p>

          {/* Scattered cards */}
          {[
            { label: 'LinkedIn',         rot: '-2deg',   top: '20%', left: '10%' },
            { label: 'Notion template',  rot: '1.5deg',  top: '35%', right: '15%' },
            { label: 'PDF formatter',    rot: '-1deg',   top: '55%', left: '20%' },
            { label: 'Email signature',  rot: '2deg',    top: '70%', right: '10%' },
          ].map(({ label, rot, top, left, right }) => (
            <div
              key={label}
              className="absolute border font-mono text-[14px]"
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

          {/* Big stat */}
          <div className="mt-20 text-center">
            <div
              className="font-display font-extrabold leading-none"
              style={{ fontSize: 80, color: 'rgba(255,77,77,0.25)' }}
            >
              4+
            </div>
            <div className="font-mono text-[14px] tracking-[0.08em]" style={{ color: 'rgba(255,77,77,0.3)' }}>
              hours
            </div>
            <p className="mt-3 font-mono text-[14px]" style={{ color: '#a3a3a3' }}>
              Every. Single. Application.
            </p>
          </div>
        </div>

        {/* RIGHT — The Relay Way */}
        <div
          className="relative flex-1"
          style={{
            background: 'rgba(74,254,128,0.018)',
            padding: '48px 48px 64px',
          }}
        >
          <p className="mb-4 font-mono text-[12px] tracking-[0.12em]" style={{ color: 'rgba(74,254,128,0.4)' }}>
            THE RELAY WAY
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
                Amazon SDE-1
              </span>
            </div>

            {/* Results */}
            {[
              'System Design Round · 3 questions',
              'LRU Cache implementation · Coding 1',
              'Tell me about a failure · Leadership',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2" style={{ marginBottom: 6 }}>
                <span className="font-mono text-accent" style={{ fontSize: 13 }}>—</span>
                <span className="font-mono text-muted-2" style={{ fontSize: 16 }}>{item}</span>
              </div>
            ))}

            <p className="mt-2 font-mono" style={{ fontSize: 14, color: '#a3a3a3' }}>
              3 results in 0.2s
            </p>
          </div>

          {/* Big stat */}
          <div className="mt-10 text-center">
            <div
              className="font-display font-extrabold leading-none text-accent"
              style={{
                fontSize: 80,
                textShadow: '0 0 60px rgba(74,254,128,0.15)',
              }}
            >
              60s
            </div>
            <div className="font-mono text-muted-2" style={{ fontSize: 16 }}>
              per application
            </div>
            <p className="mt-3 font-mono text-muted-2" style={{ fontSize: 16 }}>
              Every time. Auto-updated.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
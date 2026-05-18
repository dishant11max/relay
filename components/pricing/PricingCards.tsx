'use client'

interface PricingCardsProps {
  billing: 'monthly' | 'annual'
}

function Check() {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        background: '#4afe80',
        flexShrink: 0,
        marginTop: 1,
      }}
    />
  )
}

function Cross() {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        background: '#1a1a1a',
        flexShrink: 0,
        marginTop: 1,
      }}
    />
  )
}

const FREE_FEATURES = {
  included: [
    'GitHub connect & repo analysis',
    'ATS score (once per month)',
    'Resume export — LaTeX code for Overleaf (1/month)',
    'Public portfolio page — basic template',
  ],
  excluded: [
    'JD-targeted resume rewriting',
    'Unlimited ATS scoring',
    'Auto-sync on every GitHub push',
    'Custom portfolio domain',
    'Resume version history',
    'Priority support',
  ],
}

const PRO_FEATURES = [
  'Everything in Free, plus:',
  'Unlimited ATS scoring & JD targeting',
  'Unlimited resume exports (LaTeX + PDF)',
  'Minimalist portfolio at {username}.resumegit.dev',
  'Auto-sync on every GitHub push',
  'Custom domain support',
  'Resume version history (last 10)',
  'Twitter/LinkedIn thread generator',
  'Priority support',
]

export default function PricingCards({ billing }: PricingCardsProps) {
  const monthlyPrice = billing === 'annual' ? '₹167' : '₹299'
  const periodLabel = '/month'

  return (
    <div
      style={{
        padding: '48px var(--page-px) 80px',
        maxWidth: 860,
        margin: '0 auto',
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
      }}
    >
      {/* ── FREE CARD ── */}
      <div
        style={{
          flex: '1 1 360px',
          background: '#0c0c0c',
          border: '1px solid #1e1e1e',
          padding: 32,
        }}
      >
        {/* Header */}
        <p
          className="font-mono tracking-[0.14em] text-muted-2"
          style={{ fontSize: 13, marginBottom: 12 }}
        >
          FREE
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <span
            className="font-display font-extrabold text-body"
            style={{ fontSize: 52, lineHeight: 1 }}
          >
            ₹0
          </span>
          <span
            className="font-mono text-muted"
            style={{ fontSize: 15, marginBottom: 12 }}
          >
            /forever
          </span>
        </div>
        <p className="font-mono text-muted-2" style={{ fontSize: 15, marginTop: 6 }}>
          Get started. No card needed.
        </p>

        {/* CTA */}
        <button
          className="font-mono font-bold tracking-[0.06em]"
          style={{
            width: '100%',
            height: 44,
            marginTop: 20,
            marginBottom: 28,
            background: 'transparent',
            border: '1px solid #737373',
            color: '#a3a3a3',
            fontSize: 13,
            cursor: 'pointer',
            transition: 'border-color 200ms, color 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#4afe80'
            e.currentTarget.style.color = '#4afe80'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#737373'
            e.currentTarget.style.color = '#a3a3a3'
          }}
        >
          CONNECT GITHUB — FREE →
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: '#1a1a1a' }} />

        {/* Features */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FREE_FEATURES.included.map((f) => (
            <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="font-mono text-accent" style={{ fontSize: 13, flexShrink: 0, lineHeight: '18px' }}>
                +
              </span>
              <span className="font-mono text-muted-2" style={{ fontSize: 15, lineHeight: 1.6 }}>
                {f}
              </span>
            </div>
          ))}
          {FREE_FEATURES.excluded.map((f) => (
            <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="font-mono" style={{ fontSize: 13, flexShrink: 0, color: '#a3a3a3', lineHeight: '18px' }}>
                —
              </span>
              <span className="font-mono" style={{ fontSize: 15, color: '#a3a3a3', lineHeight: 1.6 }}>
                {f}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRO CARD ── */}
      <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column' }}>
        {/* MOST POPULAR badge */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span
            className="font-mono font-bold bg-accent text-black"
            style={{
              fontSize: 12,
              letterSpacing: '0.1em',
              padding: '4px 16px',
              display: 'inline-block',
              marginBottom: -1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            MOST POPULAR
          </span>
        </div>

        <div
          style={{
            background: '#0a0a0a',
            border: '2px solid rgba(74,254,128,0.35)',
            boxShadow: '0 0 48px rgba(74,254,128,0.06)',
            padding: 32,
            flex: 1,
          }}
        >
          {/* Header */}
          <p
            className="font-mono tracking-[0.14em] text-accent"
            style={{ fontSize: 13, marginBottom: 12 }}
          >
            PRO
          </p>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            <span
              className="font-display font-extrabold text-body"
              style={{ fontSize: 52, lineHeight: 1 }}
            >
              {monthlyPrice}
            </span>
            <span
              className="font-mono text-muted"
              style={{ fontSize: 15, marginBottom: 12 }}
            >
              {periodLabel}
            </span>
          </div>

          {/* Annual billing note */}
          {billing === 'annual' && (
            <p className="font-mono text-accent" style={{ fontSize: 13, marginTop: 4 }}>
              billed ₹1999/year · save ₹1589
            </p>
          )}

          <p className="font-mono text-muted-2" style={{ fontSize: 15, marginTop: 6 }}>
            For serious job hunters.
          </p>

          {/* CTA */}
          <button
            className="font-mono font-bold tracking-[0.06em] bg-accent text-black"
            style={{
              width: '100%',
              height: 44,
              marginTop: 20,
              marginBottom: 28,
              fontSize: 13,
              cursor: 'pointer',
              border: 'none',
              transition: 'opacity 150ms, box-shadow 150ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(74,254,128,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            UPGRADE TO PRO →
          </button>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(74,254,128,0.12)' }} />

          {/* Features */}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PRO_FEATURES.map((f, i) => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span
                  className="font-mono text-accent"
                  style={{ fontSize: 13, flexShrink: 0, lineHeight: '18px' }}
                >
                  {i === 0 ? '' : '✦'}
                </span>
                <span
                  className="font-mono text-body"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    fontWeight: i === 0 ? 700 : 400,
                    color: i === 0 ? '#4afe80' : '#e8e8e8',
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

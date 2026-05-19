'use client'

export default function FinalCTA() {
  return (
    <section
      className="w-full border-t border-border text-center"
      style={{ padding: '120px var(--page-px)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1000 }}>
        {/* Heading */}
        <h2
          className="font-display font-extrabold text-body"
          style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', letterSpacing: '-0.03em', lineHeight: 1.1, textAlign: 'center' }}
        >
          Your GitHub is already a resume.
        </h2>
        <h2
          className="mt-1 font-display font-extrabold"
          style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#1e1e1e', textAlign: 'center' }}
        >
          You just haven&apos;t formatted it yet.
        </h2>

        {/* CTA button */}
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="cta-btn bg-accent font-mono text-[15px] font-bold tracking-[0.06em] text-black"
            style={{ padding: '16px 36px', display: 'inline-block', transition: 'box-shadow 200ms, transform 200ms' }}
          >
            CONNECT GITHUB FREE TO START &rarr;
          </a>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 font-mono text-[13px]" style={{ color: '#737373' }}>
          No credit card required. Read-only GitHub access. Cancel at any time.
        </p>
      </div>
    </section>
  )
}
'use client'

export default function FinalCTA() {
  return (
    <section
      className="w-full border-t border-border text-center"
      style={{ padding: '120px var(--page-px)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        {/* Heading */}
        <h2
          className="font-display font-extrabold text-body"
          style={{ fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.1 }}
        >
          Your GitHub is already a resume.
        </h2>
        <h2
          className="mt-1 font-display font-extrabold"
          style={{ fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#737373' }}
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
            CONNECT GITHUB — IT&apos;S FREE →
          </a>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 font-mono text-[13px]" style={{ color: '#737373' }}>
          No credit card. No setup. Just GitHub OAuth.
        </p>
      </div>
    </section>
  )
}
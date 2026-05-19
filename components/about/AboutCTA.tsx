'use client'

export default function AboutCTA() {
  return (
    <section
      className="w-full border-t border-border text-center"
      style={{ padding: '100px var(--page-px)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 800 }}>
        <h2
          className="font-display font-extrabold text-body"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
        >
          Ready to stop writing resumes from scratch?
        </h2>

        <div className="mt-10 flex justify-center">
          <a
            href="/sign-in"
            className="cta-btn bg-accent font-mono text-[15px] font-bold tracking-[0.06em] text-black"
            style={{ padding: '16px 36px', display: 'inline-block' }}
          >
            CONNECT GITHUB &rarr;
          </a>
        </div>

        <p className="mt-4 font-mono text-[13px]" style={{ color: '#737373' }}>
          No credit card required. Read-only GitHub access. Cancel at any time.
        </p>
      </div>
    </section>
  )
}

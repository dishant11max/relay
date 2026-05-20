'use client'

import { motion, type Variants } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'You write code on GitHub',
    body: 'Every commit, every repository, every contribution is recorded there — but most recruiters never see it.',
  },
  {
    num: '02',
    title: 'Relay reads your entire history',
    body: 'Commit patterns, project quality, tech stack, documentation. The professional signal buried inside your code gets extracted.',
  },
  {
    num: '03',
    title: 'Portfolio and resume. Instantly.',
    body: 'Under 60 seconds. A shareable portfolio page and an ATS-optimized resume, tailored to roles you are targeting.',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any, delay: i * 0.12 },
  }),
}

export default function ExplainerSection() {
  return (
    <section
      className="w-full border-t border-border"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: 'var(--page-px)',
        paddingRight: 'var(--page-px)',
      }}
    >
      {/* Asymmetric 2-col: label+giant-num left / steps right */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-0 items-start">

        {/* LEFT — section label + giant watermark number */}
        <div className="md:sticky md:top-[80px] mb-12 md:mb-0 md:pr-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-5 font-mono tracking-[0.2em] text-accent"
            style={{ fontSize: 13 }}
          >
            WHAT IS RELAY
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="font-display font-extrabold text-body"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              maxWidth: 380,
            }}
          >
            Turn your GitHub activity into a professional portfolio automatically.
          </motion.h2>

          {/* Large step-count watermark */}
          <div
            className="pointer-events-none select-none font-display font-extrabold mt-10 hidden md:block"
            style={{
              fontSize: 'clamp(80px, 12vw, 160px)',
              color: 'rgba(74,254,128,0.035)',
              letterSpacing: '-0.06em',
              lineHeight: 1,
              userSelect: 'none',
            }}
            aria-hidden="true"
          >
            3
          </div>
        </div>

        {/* RIGHT — stacked steps, each separated by a 1px rule */}
        <div className="flex flex-col divide-y divide-[#1a1a1a]">
          {STEPS.map(({ num, title, body }, i) => (
            <motion.div
              key={num}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ padding: 'clamp(28px, 4vw, 40px) 0' }}
            >
              {/* Step number badge */}
              <div className="flex items-start gap-5">
                <span
                  className="flex-shrink-0 flex items-center justify-center font-mono text-[13px] font-bold"
                  style={{
                    width: 30,
                    height: 30,
                    background: 'rgba(74,254,128,0.08)',
                    border: '1px solid rgba(74,254,128,0.2)',
                    color: '#4afe80',
                    marginTop: 2,
                  }}
                >
                  {num}
                </span>
                <div>
                  <h3
                    className="font-display font-bold text-body mb-2"
                    style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', letterSpacing: '-0.02em', lineHeight: 1.25 }}
                  >
                    {title}
                  </h3>
                  <p
                    className="font-mono leading-[1.75]"
                    style={{ fontSize: 14, color: '#5a5a5a', maxWidth: 440 }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

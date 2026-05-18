'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is the free tier actually free forever?',
    a: 'Yes. No credit card, no trial period. You get one ATS score and one LaTeX resume export per month, forever. We don\'t bait-and-switch.',
  },
  {
    q: 'What does the LaTeX export actually give me?',
    a: 'A complete .tex file using the AltaCV template — ready to paste into a new Overleaf project. Your repos, stack, and AI-generated bullets are pre-filled. You just edit and compile.',
  },
  {
    q: 'What does the portfolio look like?',
    a: 'One clean page: your name, title, stack, top projects, and a contact row. Minimal by design — employers skim, not read. Hosted at {username}.resumegit.dev, updated automatically when you push to GitHub.',
  },
  {
    q: 'Can I cancel Pro anytime?',
    a: 'Yes. Cancel from your dashboard — no forms, no emails. Your Pro access stays until the end of the billing period.',
  },
  {
    q: 'Does it work with private repos?',
    a: 'Pro users can optionally authorize private repo access. We only read metadata and README files — never your actual source code.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{ borderBottom: '1px solid #1a1a1a', padding: '16px 0', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      {/* Question row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          className="font-mono font-bold text-body"
          style={{ fontSize: 16 }}
        >
          {q}
        </span>
        <span
          className="font-mono text-accent"
          style={{ fontSize: 19, flexShrink: 0, marginLeft: 16 }}
        >
          {open ? '—' : '+'}
        </span>
      </div>

      {/* Answer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="font-mono text-muted-2"
              style={{ fontSize: 15, lineHeight: 1.8, paddingTop: 10 }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PricingFAQ() {
  return (
    <div
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '0 var(--page-px) 100px',
      }}
    >
      <h2
        className="font-display font-extrabold text-body"
        style={{
          fontSize: 32,
          letterSpacing: '-0.025em',
          marginBottom: 32,
        }}
      >
        Common questions.
      </h2>

      {FAQS.map((faq) => (
        <FAQItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>
  )
}

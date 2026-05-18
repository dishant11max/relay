'use client'

import { useState } from 'react'

interface PricingHeroProps {
  billing: 'monthly' | 'annual'
  setBilling: (v: 'monthly' | 'annual') => void
}

export default function PricingHero({ billing, setBilling }: PricingHeroProps) {
  return (
    <div
      style={{
        padding: '80px var(--page-px) 0',
        textAlign: 'center',
      }}
    >
      {/* Section label */}
      <p
        className="font-mono tracking-[0.18em] text-accent"
        style={{ fontSize: 13, marginBottom: 20 }}
      >
        SIMPLE PRICING
      </p>

      {/* Heading */}
      <h1
        className="font-display font-extrabold"
        style={{
          fontSize: 'clamp(40px, 10vw, 56px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: 20,
        }}
      >
        <span className="text-body">One plan.</span>
        <br />
        <span className="text-accent">No bullshit.</span>
      </h1>

      {/* Subtext */}
      <p
        className="font-mono mx-auto"
        style={{
          fontSize: 17,
          color: '#a3a3a3',
          lineHeight: 1.7,
          maxWidth: 480,
          marginBottom: 32,
        }}
      >
        Connect once. Get your resume free. Upgrade when you need the full picture.
      </p>

      {/* Billing toggle */}
      <div
        style={{
          display: 'inline-flex',
          marginTop: 0,
        }}
      >
        <button
          onClick={() => setBilling('monthly')}
          className="font-mono font-bold"
          style={{
            fontSize: 13,
            height: 36,
            padding: '0 16px',
            cursor: 'pointer',
            border: 'none',
            background: billing === 'monthly' ? '#4afe80' : '#111111',
            color: billing === 'monthly' ? '#000' : '#a3a3a3',
            outline: billing === 'monthly' ? 'none' : '1px solid #1a1a1a',
            letterSpacing: '0.04em',
            transition: 'all 150ms',
          }}
        >
          MONTHLY
        </button>
        <button
          onClick={() => setBilling('annual')}
          className="font-mono font-bold"
          style={{
            fontSize: 13,
            height: 36,
            padding: '0 16px',
            cursor: 'pointer',
            border: 'none',
            background: billing === 'annual' ? '#4afe80' : '#111111',
            color: billing === 'annual' ? '#000' : '#a3a3a3',
            outline: billing === 'annual' ? 'none' : '1px solid #1a1a1a',
            letterSpacing: '0.04em',
            transition: 'all 150ms',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          ANNUAL
          {billing === 'annual' && (
            <span
              className="font-mono font-bold"
              style={{
                fontSize: 11,
                background: 'rgba(0,0,0,0.25)',
                padding: '2px 6px',
                color: '#000',
                letterSpacing: '0.06em',
              }}
            >
              SAVE 40%
            </span>
          )}
          {billing !== 'annual' && (
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                background: 'rgba(74,254,128,0.12)',
                border: '1px solid rgba(74,254,128,0.25)',
                padding: '2px 6px',
                color: '#4afe80',
                letterSpacing: '0.06em',
              }}
            >
              SAVE 40%
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import PricingHero from '@/components/pricing/PricingHero'
import PricingCards from '@/components/pricing/PricingCards'

export default function PricingClient() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <>
      <PricingHero billing={billing} setBilling={setBilling} />
      <PricingCards billing={billing} />
    </>
  )
}

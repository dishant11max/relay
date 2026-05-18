'use client'

import { useState } from 'react'
import Navbar from '@/components/landing/Navbar'
import PricingHero from '@/components/pricing/PricingHero'
import PricingCards from '@/components/pricing/PricingCards'
import FeatureTable from '@/components/pricing/FeatureTable'
import PricingFAQ from '@/components/pricing/PricingFAQ'
import Footer from '@/components/landing/Footer'

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <PricingHero billing={billing} setBilling={setBilling} />
      <PricingCards billing={billing} />
      <FeatureTable />
      <PricingFAQ />
      <Footer />
    </main>
  )
}

import BackgroundSystem from '@/components/landing/BackgroundSystem'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import AboutHero from '@/components/about/AboutHero'
import TheProblem from '@/components/about/TheProblem'
import HowItWorks from '@/components/about/HowItWorks'
import AboutCTA from '@/components/about/AboutCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Relay',
  description: 'Relay turns your GitHub activity into an ATS-optimized resume and shareable portfolio in under 60 seconds. Built for developers who ship.',
}

export default function AboutPage() {
  return (
    <>
      <BackgroundSystem />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />
        <AboutHero />
        <TheProblem />
        <HowItWorks />
        <AboutCTA />
        <Footer />
      </main>
    </>
  )
}

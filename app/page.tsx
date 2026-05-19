import BackgroundSystem from '@/components/landing/BackgroundSystem'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import SocialProofTicker from '@/components/landing/SocialProofTicker'
import FeatureSection from '@/components/landing/FeatureSection'
import ChaosClarity from '@/components/landing/ChaosClarity'
import StatsBar from '@/components/landing/StatsBar'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <BackgroundSystem />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <SocialProofTicker />
        <FeatureSection />
        <ChaosClarity />
        <StatsBar />
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
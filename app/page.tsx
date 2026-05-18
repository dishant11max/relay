import BackgroundSystem from '@/components/landing/BackgroundSystem'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import SocialProofTicker from '@/components/landing/SocialProofTicker'
import FeatureSection from '@/components/landing/FeatureSection'
import ChaosClarity from '@/components/landing/ChaosClarity'
import StatsBar from '@/components/landing/StatsBar'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg">
      <BackgroundSystem />
      <Navbar />
      <HeroSection />
      <SocialProofTicker />
      <FeatureSection />
      <ChaosClarity />
      <StatsBar />
      <FinalCTA />
      <Footer />
    </main>
  )
}
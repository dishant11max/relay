import Navbar from '@/components/landing/Navbar'
import PricingClient from './PricingClient'
import FeatureTable from '@/components/pricing/FeatureTable'
import PricingFAQ from '@/components/pricing/PricingFAQ'
import Footer from '@/components/landing/Footer'

export default function PricingPage() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <PricingClient />
      <FeatureTable />
      <PricingFAQ />
      <Footer />
    </main>
  )
}

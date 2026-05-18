import type { Metadata } from 'next'
import BrowseHero from '@/components/browse/BrowseHero'
import BrowseClientShell from '@/components/browse/BrowseClientShell'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Browse Portfolios — Relay',
  description: 'Discover developer portfolios generated from GitHub profiles. Search by stack and role.',
}

export default function BrowsePage() {
  return (
    <main className="bg-bg min-h-screen">
      <BrowseHero />
      <BrowseClientShell />
      <Footer />
    </main>
  )
}

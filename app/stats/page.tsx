import Navbar from '@/components/landing/Navbar'
import StatsGrid from '@/components/stats/StatsGrid'
import StackChart from '@/components/stats/StackChart'
import SampleResult from '@/components/stats/SampleResult'

export const metadata = {
  title: 'Platform Stats — Relay',
  description: 'Live platform analytics for Relay. Portfolio counts, ATS scores, export numbers, and stack frequency data.',
}

function getFormattedDate() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

export default function StatsPage() {
  const date = getFormattedDate()

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: 64,
          paddingBottom: 64,
          paddingLeft: 'var(--page-px)',
          paddingRight: 'var(--page-px)',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div>
          <p
            className="font-mono text-accent uppercase"
            style={{ fontSize: 10, letterSpacing: '0.18em', marginBottom: 16 }}
          >
            PLATFORM ANALYTICS
          </p>
          <h1
            className="font-display font-extrabold text-body"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', lineHeight: 1.05, marginBottom: 16 }}
          >
            Relay by the numbers.
          </h1>
          <p className="font-mono text-muted-2" style={{ fontSize: 13, marginBottom: 16 }}>
            Live data. Updated on every portfolio generation.
          </p>
          <span
            className="font-mono text-muted"
            style={{
              fontSize: 9,
              background: '#0c0c0c',
              border: '1px solid #1a1a1a',
              padding: '3px 10px',
              display: 'inline-block',
            }}
          >
            LAST_UPDATED: {date}
          </span>
        </div>

        {/* Stats grid */}
        <StatsGrid />

        {/* Sample result breakdown */}
        <SampleResult />

        {/* Stack frequency bar chart */}
        <StackChart />
      </main>
    </>
  )
}

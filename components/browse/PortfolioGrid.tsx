import { MOCK_PORTFOLIOS } from './mockData'
import PortfolioCard from './PortfolioCard'

interface PortfolioGridProps {
  portfolios: typeof MOCK_PORTFOLIOS
}

export default function PortfolioGrid({ portfolios }: PortfolioGridProps) {
  return (
    <div
      style={{
        padding: '32px 36px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      {portfolios.map((p) => (
        <PortfolioCard key={p.username} {...p} />
      ))}
    </div>
  )
}

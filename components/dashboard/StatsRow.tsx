import type { DashboardData } from './DashboardClient'

const METRICS = (data: DashboardData) => [
  {
    label: 'PUBLIC REPOS',
    value: data.public_repos.toString(),
    sub: `${data.repos.filter(r => !r.private).length} owned`,
  },
  {
    label: 'TOTAL STARS',
    value: data.totalStars.toString(),
    sub: 'across all repos',
  },
  {
    label: 'FOLLOWERS',
    value: data.followers.toString(),
    sub: `following ${data.following}`,
  },
  {
    label: 'TOP LANGUAGE',
    value: data.topLanguages[0]?.lang ?? '—',
    sub: data.topLanguages.slice(1, 3).map(l => l.lang).join(' · ') || 'only language',
  },
]

interface Props {
  data: DashboardData
}

export default function StatsRow({ data }: Props) {
  const metrics = METRICS(data)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid #1a1a1a',
        borderLeft: '1px solid #1a1a1a',
        marginBottom: 32,
      }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          style={{
            borderRight: '1px solid #1a1a1a',
            borderBottom: '1px solid #1a1a1a',
            padding: '20px 22px',
          }}
        >
          <p
            className="font-mono"
            style={{ fontSize: 9, letterSpacing: '0.12em', color: '#737373', marginBottom: 8 }}
          >
            {m.label}
          </p>
          <p
            className="font-mono font-bold text-body"
            style={{ fontSize: 28, lineHeight: 1, marginBottom: 4 }}
          >
            {m.value}
          </p>
          <p className="font-mono" style={{ fontSize: 10, color: '#737373' }}>
            {m.sub}
          </p>
        </div>
      ))}
    </div>
  )
}

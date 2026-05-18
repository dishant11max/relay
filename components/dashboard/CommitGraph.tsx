'use client'

import { useMemo } from 'react'

interface GitHubEvent {
  id: string
  type: string
  created_at: string
}

interface ContributionCalendar {
  totalContributions: number
  weeks: { contributionDays: { contributionCount: number; date: string }[] }[]
}

interface Props {
  events: GitHubEvent[]
  username: string
  calendar?: ContributionCalendar | null
}

function buildDayMapFallback(events: GitHubEvent[]): Record<string, number> {
  const map: Record<string, number> = {}
  events.forEach((e) => {
    if (e.type === 'PushEvent') {
      const day = e.created_at.slice(0, 10)
      map[day] = (map[day] ?? 0) + 1
    }
  })
  return map
}

function buildGridFallback(): string[] {
  const today = new Date()
  const dates: string[] = []
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

function getColor(count: number): string {
  if (count === 0) return '#111111'
  if (count === 1) return 'rgba(74,254,128,0.25)'
  if (count === 2) return 'rgba(74,254,128,0.45)'
  if (count <= 4) return 'rgba(74,254,128,0.7)'
  return '#4afe80'
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function CommitGraph({ events, username, calendar }: Props) {
  // If we have accurate GraphQL data, use it directly!
  const hasCalendar = !!calendar
  
  const dayMap = useMemo(() => {
    if (hasCalendar) return {} // not used in calendar mode
    return buildDayMapFallback(events)
  }, [events, hasCalendar])

  const dates = useMemo(() => {
    if (hasCalendar) return []
    return buildGridFallback()
  }, [hasCalendar])

  // Build weeks array
  let weeks: { date: string; count: number }[][] = []
  
  if (hasCalendar) {
    weeks = calendar!.weeks.map(w => 
      w.contributionDays.map(d => ({ date: d.date.slice(0, 10), count: d.contributionCount }))
    )
  } else {
    // Fallback to events parsing
    let flatDates: { date: string; count: number }[] = []
    dates.forEach(d => {
      flatDates.push({ date: d, count: dayMap[d] ?? 0 })
    })
    for (let i = 0; i < flatDates.length; i += 7) {
      weeks.push(flatDates.slice(i, i + 7))
    }
  }

  const totalCommits = hasCalendar 
    ? calendar!.totalContributions 
    : Object.values(dayMap).reduce((a, b) => a + b, 0)

  // Month labels based on the first day of each week column
  const monthLabels: { label: string; colIndex: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    if (!week[0]) return
    const month = new Date(week[0].date).getMonth()
    if (month !== lastMonth) {
      monthLabels.push({ label: MONTHS[month], colIndex: wi })
      lastMonth = month
    }
  })

  return (
    <div>
      {/* Header */}
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}
      >
        <p className="font-mono font-bold text-body" style={{ fontSize: 13 }}>
          Commit history
        </p>
        <span className="font-mono text-muted-2" style={{ fontSize: 11 }}>
          {totalCommits} contributions in the last year
        </span>
      </div>

      {/* Month labels */}
      <div style={{ position: 'relative', height: 16, marginBottom: 4, width: '100%', overflow: 'hidden' }}>
        {monthLabels.map(({ label, colIndex }) => (
          <span
            key={`${label}-${colIndex}`}
            className="font-mono absolute"
            style={{
              fontSize: 9,
              color: '#737373',
              left: colIndex * 12,
              top: 0,
              letterSpacing: '0.06em',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {week.map((day) => {
              const { date, count } = day
              return (
                <div
                  key={date}
                  title={`${date}: ${count} contribution${count !== 1 ? 's' : ''}`}
                  style={{
                    width: 9,
                    height: 9,
                    background: getColor(count),
                    flexShrink: 0,
                    cursor: 'default',
                    transition: 'transform 100ms',
                    borderRadius: 1, // slight rounding for exact github feel
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.4)'
                    e.currentTarget.style.zIndex = '10'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.zIndex = '1'
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, justifyContent: 'flex-end' }}>
        <span className="font-mono text-muted-2" style={{ fontSize: 9 }}>less</span>
        {[0, 1, 2, 3, 5].map((n) => (
          <div
            key={n}
            style={{ width: 9, height: 9, background: getColor(n), borderRadius: 1 }}
          />
        ))}
        <span className="font-mono text-muted-2" style={{ fontSize: 9 }}>more</span>
      </div>
    </div>
  )
}

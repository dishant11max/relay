interface GitHubEvent {
  id: string
  type: string
  repo: { name: string }
  payload: {
    commits?: { message: string; sha: string }[]
    ref?: string
    action?: string
  }
  created_at: string
}

interface Props {
  events: GitHubEvent[]
  fullWidth?: boolean
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function describeEvent(event: GitHubEvent): { label: string; detail: string; color: string } {
  const repoName = event.repo.name.split('/')[1] ?? event.repo.name

  switch (event.type) {
    case 'PushEvent': {
      const commits = event.payload.commits ?? []
      const msg = commits[0]?.message?.split('\n')[0] ?? 'pushed commits'
      const branch = event.payload.ref?.replace('refs/heads/', '') ?? 'main'
      return {
        label: `PUSH — ${repoName}/${branch}`,
        detail: msg.length > 72 ? msg.slice(0, 72) + '...' : msg,
        color: '#4afe80',
      }
    }
    case 'CreateEvent':
      return {
        label: `CREATE — ${repoName}`,
        detail: `created ${event.payload.ref ?? 'repository'}`,
        color: '#a3a3a3',
      }
    case 'WatchEvent':
      return {
        label: `STAR — ${repoName}`,
        detail: 'starred this repository',
        color: '#f0db4f',
      }
    case 'ForkEvent':
      return {
        label: `FORK — ${repoName}`,
        detail: 'forked repository',
        color: '#a3a3a3',
      }
    case 'IssuesEvent':
      return {
        label: `ISSUE — ${repoName}`,
        detail: event.payload.action ?? 'opened issue',
        color: '#ff6b6b',
      }
    case 'PullRequestEvent':
      return {
        label: `PR — ${repoName}`,
        detail: event.payload.action ?? 'pull request',
        color: '#6bcfff',
      }
    default:
      return {
        label: event.type.replace('Event', '').toUpperCase(),
        detail: repoName,
        color: '#737373',
      }
  }
}

export default function ActivityFeed({ events, fullWidth = false }: Props) {
  const pushEvents = events.filter((e) => e.type === 'PushEvent')
  const displayEvents = fullWidth ? events.slice(0, 40) : events.slice(0, 10)

  if (events.length === 0) {
    return (
      <div
        className="border border-border font-mono text-muted-2 text-center"
        style={{ padding: '40px 20px', fontSize: 13 }}
      >
        No recent activity.
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
        <p className="font-mono font-bold text-body" style={{ fontSize: 13 }}>
          Recent activity
        </p>
        <span className="font-mono text-muted-2" style={{ fontSize: 10 }}>
          {pushEvents.length} pushes
        </span>
      </div>

      <div style={{ border: '1px solid #1a1a1a' }}>
        {displayEvents.map((event, i) => {
          const { label, detail, color } = describeEvent(event)
          return (
            <div
              key={event.id}
              style={{
                padding: '11px 14px',
                borderBottom: i < displayEvents.length - 1 ? '1px solid #0f0f0f' : 'none',
                transition: 'background 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.01)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Label row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: 10, color, letterSpacing: '0.06em' }}
                >
                  {label}
                </span>
                <span className="font-mono text-muted-2" style={{ fontSize: 9, flexShrink: 0, marginLeft: 8 }}>
                  {timeAgo(event.created_at)}
                </span>
              </div>

              {/* Detail */}
              <p className="font-mono text-muted-2" style={{ fontSize: 11, lineHeight: 1.4 }}>
                {detail}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

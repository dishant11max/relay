interface Repo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  html_url: string
  private: boolean
}

interface Props {
  repos: Repo[]
  fullWidth?: boolean
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f0db4f',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Vue: '#41b883',
  Ruby: '#701516',
  Java: '#b07219',
  'C++': '#f34b7d',
  Swift: '#F05138',
}

export default function RepoList({ repos, fullWidth = false }: Props) {
  if (repos.length === 0) {
    return (
      <div
        className="border border-border font-mono text-muted-2 text-center"
        style={{ padding: '40px 20px', fontSize: 13 }}
      >
        No repositories found.
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
        <p className="font-mono font-bold text-body" style={{ fontSize: 13 }}>
          Repositories
        </p>
        <span className="font-mono text-muted-2" style={{ fontSize: 10 }}>
          {repos.length} repos
        </span>
      </div>

      <div
        style={{
          border: '1px solid #1a1a1a',
          display: 'grid',
          gridTemplateColumns: fullWidth ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
        }}
      >
        {repos.map((repo, i) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '14px 16px',
              borderBottom: i < repos.length - 1 ? '1px solid #111' : 'none',
              textDecoration: 'none',
              transition: 'background 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(74,254,128,0.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <span className="font-mono font-bold text-body" style={{ fontSize: 12 }}>
                {repo.name}
              </span>
              <span className="font-mono text-muted-2" style={{ fontSize: 10, flexShrink: 0, marginLeft: 12 }}>
                {timeAgo(repo.updated_at)}
              </span>
            </div>

            {repo.description && (
              <p className="font-mono text-muted-2" style={{ fontSize: 11, marginBottom: 8, lineHeight: 1.5 }}>
                {repo.description.length > 80
                  ? repo.description.slice(0, 80) + '...'
                  : repo.description}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {repo.language && (
                <span className="font-mono" style={{ fontSize: 10, color: '#737373', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: LANG_COLORS[repo.language] ?? '#737373',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="font-mono" style={{ fontSize: 10, color: '#737373' }}>
                  * {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="font-mono" style={{ fontSize: 10, color: '#737373' }}>
                  f {repo.forks_count}
                </span>
              )}
              {repo.private && (
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    padding: '1px 6px',
                    border: '1px solid #2a2a2a',
                    color: '#737373',
                    letterSpacing: '0.08em',
                  }}
                >
                  PRIVATE
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
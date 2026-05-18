'use client'

import { useEffect, useState, useCallback } from 'react'
import DashboardSidebar from './DashboardSidebar'
import StatsRow from './StatsRow'
import CommitGraph from './CommitGraph'
import RepoList from './RepoList'
import ActivityFeed from './ActivityFeed'
import ResumeGenerator from './ResumeGenerator'

interface GitHubRepo {
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

export interface DashboardData {
  repos: GitHubRepo[]
  events: GitHubEvent[]
  followers: number
  following: number
  public_repos: number
  totalStars: number
  topLanguages: { lang: string; count: number }[]
  contributionCalendar: {
    totalContributions: number
    weeks: { contributionDays: { contributionCount: number; date: string }[] }[]
  } | null
}

interface Props {
  userId: string
  username: string
  avatarUrl: string | null
  githubToken: string | null
}

export default function DashboardClient({ userId, username, avatarUrl, githubToken }: Props) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<'overview' | 'repos' | 'activity' | 'resume'>('overview')

  const fetchGitHubData = useCallback(async () => {
    if (!githubToken) {
      setError('No GitHub token found. Please sign out and reconnect GitHub.')
      setLoading(false)
      return
    }

    try {
      const headers = {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      }

      const graphqlQuery = {
        query: `
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: username },
      }

      const [userRes, reposRes, eventsRes, graphqlRes] = await Promise.all([
        fetch('https://api.github.com/user', { headers }),
        fetch('https://api.github.com/user/repos?sort=updated&per_page=20&type=owner', { headers }),
        fetch(`https://api.github.com/users/${username}/events?per_page=30`, { headers }),
        fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers,
          body: JSON.stringify(graphqlQuery),
        }),
      ])

      if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.status}`)

      const [userJson, reposJson, eventsJson, graphqlJson] = await Promise.all([
        userRes.json(),
        reposRes.json(),
        eventsRes.json(),
        graphqlRes.json(),
      ])

      const repos: GitHubRepo[] = Array.isArray(reposJson) ? reposJson : []
      const events: GitHubEvent[] = Array.isArray(eventsJson) ? eventsJson : []
      const contributionCalendar = graphqlJson.data?.user?.contributionsCollection?.contributionCalendar ?? null

      // Calculate top languages
      const langMap: Record<string, number> = {}
      repos.forEach((r) => {
        if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1
      })
      const topLanguages = Object.entries(langMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang, count]) => ({ lang, count }))

      const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)

      setData({
        repos,
        events,
        followers: userJson.followers ?? 0,
        following: userJson.following ?? 0,
        public_repos: userJson.public_repos ?? 0,
        totalStars,
        topLanguages,
        contributionCalendar,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load GitHub data.')
    } finally {
      setLoading(false)
    }
  }, [githubToken, username])

  useEffect(() => {
    fetchGitHubData()
  }, [fetchGitHubData])

  return (
    <div
      className="bg-bg min-h-[100dvh] flex"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Sidebar */}
      <DashboardSidebar
        username={username}
        avatarUrl={avatarUrl}
        activeSection={activeSection}
        setActiveSection={setActiveSection as (s: string) => void}
      />

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto w-full md:ml-[200px]"
        style={{ paddingBottom: 72 }}
      >
        <div
          style={{
            padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 36px)',
            maxWidth: '100%',
          }}
        >
        {/* Page header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p
              className="font-mono tracking-[0.16em] text-accent"
              style={{ fontSize: 10, marginBottom: 6 }}
            >
              {activeSection.toUpperCase()}
            </p>
            <h1
              className="font-display font-extrabold text-body"
              style={{ fontSize: 'clamp(20px, 4vw, 30px)', letterSpacing: '-0.025em', lineHeight: 1 }}
            >
              {activeSection === 'overview' && `Good work, @${username}.`}
              {activeSection === 'repos' && 'Your repositories.'}
              {activeSection === 'activity' && 'Commit activity.'}
              {activeSection === 'resume' && 'Resume Generator.'}
            </h1>
          </div>

          {!loading && !error && data && (
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#4afe80',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              <span className="font-mono text-muted-2" style={{ fontSize: 11 }}>
                GitHub connected
              </span>
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div
            className="border border-danger font-mono text-danger"
            style={{ padding: '16px 20px', fontSize: 13 }}
          >
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !error && <DashboardSkeleton />}

        {/* Content */}
        {!loading && !error && data && (
          <>
            {activeSection === 'overview' && (
              <>
                <StatsRow data={data} />
                <CommitGraph events={data.events} username={username} calendar={data.contributionCalendar} />
                <div
                  className="mt-8 grid gap-6"
                  style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
                >
                  <RepoList repos={data.repos.slice(0, 6)} />
                  <ActivityFeed events={data.events} />
                </div>
              </>
            )}
            {activeSection === 'repos' && (
              <RepoList repos={data.repos} fullWidth />
            )}
            {activeSection === 'activity' && (
              <>
                <CommitGraph events={data.events} username={username} />
                <ActivityFeed events={data.events} fullWidth />
              </>
            )}
            {activeSection === 'resume' && (
              <ResumeGenerator
                username={username}
                githubToken={githubToken}
                data={data}
              />
            )}
          </>
        )}
        </div>
      </main>
    </div>
  )
}

// ── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonBlock({ w = '100%', h = 20 }: { w?: string | number; h?: number }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: '#111',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          animation: 'shimmer 1.6s ease-in-out infinite',
        }}
      />
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBlock key={i} h={72} />
        ))}
      </div>
      {/* Graph */}
      <SkeletonBlock h={120} />
      {/* Two cols */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <SkeletonBlock h={280} />
        <SkeletonBlock h={280} />
      </div>
    </div>
  )
}

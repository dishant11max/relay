import { NextRequest, NextResponse } from 'next/server'

// ── ATS Scoring Engine v2 ─────────────────────────────────────────────────────
//
// 5 signals, 100pts total. Stack diversity is intentionally NOT a signal —
// specialists who commit daily with quality projects should score high.
//
//  1. Commit Activity    (30pts) — push frequency from recent events
//  2. Project Impact     (30pts) — stars + forks + repo descriptions
//  3. Profile README     (15pts) — exists, length, quality
//  4. Profile Complete   (15pts) — bio, location, website, name
//  5. Repo Quality       (10pts) — ratio of repos with star or description

function scoreProfile(
  user: any,
  repos: any[],
  events: any[],
  hasProfileReadme: boolean,
  profileReadmeLength: number
): {
  score: number
  breakdown: { label: string; pts: number; max: number; note: string }[]
} {
  const breakdown: { label: string; pts: number; max: number; note: string }[] = []

  // ── 1. Commit Activity (30pts) ──────────────────────────────────────────────
  // Count PushEvents in the 30 most recent public events
  const pushEvents = events.filter((e: any) => e.type === 'PushEvent')
  const recentCommits = pushEvents.reduce(
    (sum: number, e: any) => sum + (e.payload?.commits?.length ?? 1),
    0
  )

  // Also check recency of any push
  const lastPush = pushEvents.length > 0
    ? new Date(pushEvents[0].created_at).getTime()
    : 0
  const daysSincePush = lastPush > 0
    ? (Date.now() - lastPush) / (1000 * 60 * 60 * 24)
    : 999

  let activityPts = 0
  let activityNote = 'No recent pushes'
  if (recentCommits >= 30) { activityPts = 30; activityNote = `${recentCommits} commits in last 30 events` }
  else if (recentCommits >= 15) { activityPts = 24; activityNote = `${recentCommits} recent commits` }
  else if (recentCommits >= 7)  { activityPts = 18; activityNote = `${recentCommits} recent commits` }
  else if (recentCommits >= 3)  { activityPts = 12; activityNote = `${recentCommits} recent commits` }
  else if (recentCommits >= 1)  { activityPts = 7;  activityNote = `${recentCommits} recent commit(s)` }
  // Bonus: pushed in the last 7 days → small boost
  if (daysSincePush < 7 && activityPts < 30) {
    activityPts = Math.min(activityPts + 4, 30)
    activityNote += ' · active this week'
  }
  breakdown.push({ label: 'Commit Activity', pts: activityPts, max: 30, note: activityNote })

  // ── 2. Project Impact (30pts) ───────────────────────────────────────────────
  const totalStars = repos.reduce((s: number, r: any) => s + (r.stargazers_count ?? 0), 0)
  const totalForks = repos.reduce((s: number, r: any) => s + (r.forks_count ?? 0), 0)
  const withDesc = repos.filter((r: any) => r.description?.trim()).length

  // Stars: 0→15pts scaled to 50 stars
  const starPts = Math.round(Math.min(totalStars / 50, 1) * 15)
  // Forks: 0→8pts scaled to 25 forks
  const forkPts = Math.round(Math.min(totalForks / 25, 1) * 8)
  // Descriptions: 0→7pts
  const descPts = repos.length > 0
    ? Math.round((withDesc / repos.length) * 7)
    : 0
  const impactPts = Math.min(starPts + forkPts + descPts, 30)
  breakdown.push({
    label: 'Project Impact',
    pts: impactPts,
    max: 30,
    note: `${totalStars} ⭐ · ${totalForks} forks · ${withDesc}/${repos.length} described`,
  })

  // ── 3. Profile README (15pts) ───────────────────────────────────────────────
  let readmePts = 0
  let readmeNote = 'No profile README'
  if (hasProfileReadme) {
    if (profileReadmeLength > 1200) { readmePts = 15; readmeNote = 'Detailed README (>1200 chars)' }
    else if (profileReadmeLength > 600) { readmePts = 12; readmeNote = 'Good README length' }
    else if (profileReadmeLength > 200) { readmePts = 8;  readmeNote = 'Short README' }
    else { readmePts = 4; readmeNote = 'Minimal README' }
  }
  breakdown.push({ label: 'Profile README', pts: readmePts, max: 15, note: readmeNote })

  // ── 4. Profile Completeness (15pts) ────────────────────────────────────────
  let completePts = 0
  const completeDetails: string[] = []
  if (user.bio?.trim())      { completePts += 5; completeDetails.push('bio') }
  if (user.location?.trim()) { completePts += 3; completeDetails.push('location') }
  if (user.blog?.trim())     { completePts += 4; completeDetails.push('website') }
  if (user.name?.trim())     { completePts += 3; completeDetails.push('name') }
  const completeNote = completeDetails.length > 0
    ? completeDetails.join(', ') + ' set'
    : 'bio, location, website missing'
  breakdown.push({ label: 'Profile Complete', pts: completePts, max: 15, note: completeNote })

  // ── 5. Repo Quality (10pts) ─────────────────────────────────────────────────
  // Non-fork repos with at least 1 star OR a description = "polished"
  const ownRepos = repos.filter((r: any) => !r.fork)
  const polished = ownRepos.filter(
    (r: any) => (r.stargazers_count ?? 0) > 0 || r.description?.trim()
  ).length
  const qualityRatio = ownRepos.length > 0 ? polished / ownRepos.length : 0
  const qualityPts = Math.round(qualityRatio * 10)
  breakdown.push({
    label: 'Repo Quality',
    pts: qualityPts,
    max: 10,
    note: `${polished}/${ownRepos.length} original repos polished`,
  })

  const score = breakdown.reduce((s, b) => s + b.pts, 0)
  return { score, breakdown }
}

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  if (!username) {
    return NextResponse.json({ error: 'GitHub username is required.' }, { status: 400 })
  }

  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username)) {
    return NextResponse.json({ error: 'Invalid GitHub username format.' }, { status: 400 })
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Relay-App',
  }
  if (process.env.GITHUB_TOKEN) {
    ;(headers as any)['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    // Fetch user, repos, and events in parallel
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=owner`, { headers }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers }),
    ])

    if (userRes.status === 404) {
      return NextResponse.json({ error: `GitHub user "@${username}" not found.` }, { status: 404 })
    }
    if (userRes.status === 403 || userRes.status === 429) {
      return NextResponse.json({ error: 'GitHub rate limit hit. Please try again in a minute.' }, { status: 429 })
    }
    if (!userRes.ok) {
      return NextResponse.json({ error: `GitHub API error (${userRes.status}).` }, { status: 502 })
    }

    const [user, repos, events] = await Promise.all([
      userRes.json(),
      reposRes.json(),
      eventsRes.json(),
    ])

    const repoArr = Array.isArray(repos) ? repos : []
    const eventArr = Array.isArray(events) ? events : []

    // Check for profile README
    let hasProfileReadme = false
    let profileReadmeLength = 0
    const profileRepo = repoArr.find(
      (r: any) => r.name.toLowerCase() === username.toLowerCase()
    )
    if (profileRepo) {
      try {
        const readmeRes = await fetch(
          `https://api.github.com/repos/${username}/${profileRepo.name}/readme`,
          { headers }
        )
        if (readmeRes.ok) {
          const readmeJson = await readmeRes.json()
          const content = readmeJson.content
            ? Buffer.from(readmeJson.content, 'base64').toString('utf-8')
            : ''
          hasProfileReadme = content.length > 0
          profileReadmeLength = content.length
        }
      } catch { /* ignore */ }
    }

    const { score, breakdown } = scoreProfile(user, repoArr, eventArr, hasProfileReadme, profileReadmeLength)

    // Top languages across repos (by repo count in that language)
    const langMap: Record<string, number> = {}
    repoArr.forEach((r: any) => {
      if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1
    })
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang]) => lang)

    // Portfolio-worthy: has description + (star or language)
    const portfolioWorthy = repoArr.filter(
      (r: any) => !r.fork && r.description && (r.stargazers_count > 0 || r.language)
    ).length

    return NextResponse.json({
      username: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      score,
      breakdown,
      topLanguages,
      publicRepos: user.public_repos,
      portfolioWorthy,
      followers: user.followers,
    })
  } catch (err: any) {
    console.error('analyze-hero error:', err)
    return NextResponse.json({ error: 'Failed to analyze profile. Please try again.' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY ?? '' })

export async function POST(req: NextRequest) {
  // Validate request
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { githubUser, repos, topLanguages } = body

  if (!githubUser || !repos || !Array.isArray(repos)) {
    return NextResponse.json({ error: 'Missing GitHub data' }, { status: 400 })
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'GROQ_API_KEY is not configured. Get a free key at console.groq.com and add it to your .env file.' },
      { status: 500 }
    )
  }

  // Build top repos list (max 4, public with descriptions)
  const topRepos = repos
    .filter((r: any) => !r.private && r.description)
    .slice(0, 4)

  const repoSummaries = topRepos
    .map(
      (r: any) =>
        `- ${r.name}: ${r.description ?? 'No description'} [${r.language ?? 'Unknown'}] (${r.stargazers_count} stars) — ${r.html_url}`
    )
    .join('\n')

  const langList = Array.isArray(topLanguages)
    ? topLanguages.map((l: any) => l.lang).join(', ')
    : 'JavaScript, TypeScript'

  const prompt = `You are an expert technical resume writer. Generate the BODY CONTENT ONLY of a Jake Gutierrez LaTeX resume.

The user will paste this into Overleaf using Jake's template which already has the preamble. Output ONLY what goes between \\begin{document} and \\end{document}.

DEVELOPER DATA:
Name: ${githubUser.name ?? githubUser.login}
GitHub: ${githubUser.html_url}
Bio: ${githubUser.bio ?? 'Software developer'}
Location: ${githubUser.location ?? 'India'}
Email: ${githubUser.email ?? ''}
Languages: ${langList}

TOP PROJECTS:
${repoSummaries}

RULES:
- Start with \\begin{document}
- Header: \\begin{center}...\\end{center} with name in \\textbf{\\Huge \\scshape}, then email | github | location on next line
- Education section: use \\resumeSubheading with placeholder "B.Tech Computer Science | Your University | 2020 -- 2024"
- Experience section: use \\resumeSubheading — if no company, write "Open Source & Freelance Development | 2022 -- Present" + 2 strong bullets
- Projects section: use \\resumeProjectHeading for each repo with 2 bullet points each. Use \\textbf{} for repo name, \\emph{} for stack
- Skills section: Languages, Frameworks, Developer Tools — derived from their actual repos
- End with \\end{document}
- Action verbs: Built, Developed, Engineered, Designed, Optimized, Implemented, Architected
- Return ONLY raw LaTeX — NO markdown fences, NO explanation`

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 3000,
    })

    const latex = completion.choices[0]?.message?.content ?? ''

    // Strip any accidental markdown fences
    const cleaned = latex
      .replace(/^```latex\n?/i, '')
      .replace(/^```\n?/, '')
      .replace(/\n?```$/, '')
      .trim()

    return NextResponse.json({ latex: cleaned })
  } catch (err: any) {
    console.error('Groq error:', err)
    const message = err?.message ?? 'Failed to generate resume. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

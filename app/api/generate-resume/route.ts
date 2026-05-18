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

  const prompt = `You are an expert technical resume writer. Generate a COMPLETE, self-contained LaTeX resume using Jake Gutierrez's resume template.

The output must include the FULL PREAMBLE + BODY so the user can paste it directly into a blank Overleaf project and compile it with NO errors.

DEVELOPER DATA:
Name: ${githubUser.name ?? githubUser.login}
GitHub: ${githubUser.html_url}
Bio: ${githubUser.bio ?? 'Software developer'}
Location: ${githubUser.location ?? 'India'}
Email: ${githubUser.email ?? ''}
Languages: ${langList}

TOP PROJECTS:
${repoSummaries}

OUTPUT THE COMPLETE DOCUMENT starting with this exact preamble (copy it verbatim), then fill in the body:

%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% License : MIT
%------------------------
\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}
\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}
\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
\\pdfgentounicode=1
\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-2pt}}}}
\\newcommand{\\resumeSubheading}[4]{\\vspace{-2pt}\\item\\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\\textbf{#1} & #2 \\\\\\textit{\\small#3} & \\textit{\\small #4} \\\\\\end{tabular*}\\vspace{-7pt}}
\\newcommand{\\resumeProjectHeading}[2]{\\item\\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}\\small#1 & #2 \\\\\\end{tabular*}\\vspace{-7pt}}
\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

% --- HEADING ---
\\begin{center}
    \\textbf{\\Huge \\scshape ${githubUser.name ?? githubUser.login}} \\\\ \\vspace{1pt}
    \\small ${githubUser.email ? githubUser.email + ' $|$ ' : ''}\\href{${githubUser.html_url}}{\\underline{${githubUser.html_url}}} $|$ ${githubUser.location ?? 'India'}
\\end{center}

Now generate the following sections using the Jake macros above:
1. %-----------EDUCATION-----------  section with \\resumeSubheading — placeholder: "B.Tech Computer Science | Your University | 2020 -- 2024"
2. %-----------EXPERIENCE-----------  section with \\resumeSubheading — if no company known, write "Open Source & Freelance Development | 2022 -- Present" with 2-3 strong action-verb bullets
3. %-----------PROJECTS-----------  section using \\resumeProjectHeading for each repo, 2 strong bullet points each
4. %-----------TECHNICAL SKILLS-----------  section as a simple \\begin{itemize} list: Languages, Frameworks, Tools
5. \\end{document}

STRICT RULES:
- Action verbs: Built, Developed, Engineered, Designed, Optimized, Implemented, Architected
- Return ONLY raw LaTeX — no markdown fences, no explanation whatsoever
- The output must compile without errors in Overleaf on the first try`

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

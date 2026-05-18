export type Plan = 'free' | 'pro'
export type AnalysisStatus = 'pending' | 'running' | 'complete' | 'failed'
export type Phase = 'idle' | 'scanning' | 'result' | 'error'

export interface DemoResult {
  username: string
  atsScore: number
  stack: string[]
  publicRepos: number
  portfolioWorthyCount: number
  isMock?: boolean
}

export interface RepoAnalysis {
  id: string
  githubId: number
  name: string
  description: string | null
  url: string
  primaryLanguage: string | null
  topics: string[]
  stars: number
  forks: number
  isFork: boolean
  readmeScore: number
  portfolioScore: number
  pushedAt: string
  stack: string[]
}
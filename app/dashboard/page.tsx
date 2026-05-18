import type { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/dashboard/DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard — Relay',
  description: 'Your GitHub portfolio dashboard.',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  // 1. Securely fetch the user (validates against Supabase servers)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/sign-in')
  }

  // 2. Fetch the session ONLY to get the GitHub provider token
  // (We know it's safe now because getUser() passed)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const githubToken = session?.provider_token ?? null

  return (
    <DashboardClient
      userId={user.id}
      username={user.user_metadata?.user_name ?? user.email ?? 'user'}
      avatarUrl={user.user_metadata?.avatar_url ?? null}
      githubToken={githubToken}
    />
  )
}

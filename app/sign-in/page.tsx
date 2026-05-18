import Navbar from '@/components/landing/Navbar'
import SignInClient from './SignInClient'

export default function SignInPage() {
  return (
    <main className="bg-bg min-h-screen flex flex-col">
      <Navbar />
      <SignInClient />
    </main>
  )
}

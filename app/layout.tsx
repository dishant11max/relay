import type { Metadata } from 'next'
import { Space_Mono, Syne } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const syne = Syne({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Relay — Your GitHub is already a resume',
  description: 'Connect GitHub once. Get a living portfolio + ATS resume in under 60 seconds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${syne.variable}`}>
      <body className="bg-bg text-body antialiased">
        <NextTopLoader
          color="#4afe80"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #4afe80,0 0 5px #4afe80"
        />
        {children}
      </body>
    </html>
  )
}
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'accent' | 'muted'
  className?: string
}

export function Badge({ children, variant = 'accent', className = '' }: BadgeProps) {
  const base =
    'inline-flex items-center font-mono text-[13px] tracking-[0.06em] px-2 py-0.5 leading-none'
  const variants = {
    accent: 'bg-accent-dim text-accent border border-[rgba(74,254,128,0.2)]',
    muted: 'bg-surface-2 text-muted-2 border border-border',
  }
  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
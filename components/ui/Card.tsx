import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const base = 'bg-surface border border-border'
  const hoverClass = hover
    ? 'transition-all duration-300 hover:border-[rgba(74,254,128,0.15)] hover:shadow-glow-xs'
    : ''
  return (
    <div className={`${base} ${hoverClass} ${className}`}>
      {children}
    </div>
  )
}
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base = 'font-mono font-bold tracking-[0.06em] cursor-pointer transition-opacity disabled:opacity-40'
  const variants = {
    primary: 'bg-accent text-black hover:opacity-90',
    ghost: 'bg-transparent text-muted-2 hover:text-body border border-border',
  }
  const sizes = {
    sm: 'text-[13px] px-3 py-1.5',
    md: 'text-[14px] px-4 py-2',
    lg: 'text-[15px] px-9 py-4',
  }
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
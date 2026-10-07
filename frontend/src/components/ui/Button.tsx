import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none'

  const variants = {
    primary:
      'bg-[#006EB6] text-white hover:bg-[#005d9b] active:scale-[0.98]',
    secondary:
      'bg-[#F9BFCB] text-[#111111] hover:bg-[#f5adb9] active:scale-[0.98]',
    outline:
      'border border-[#D1D5DB] bg-white text-[#111111] hover:border-[#006EB6] hover:text-[#006EB6]',
    ghost:
      'bg-transparent text-[#006EB6] hover:bg-[#006EB6]/10',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
  }

  const sizes = {
    sm: 'min-h-9 px-3 text-sm',
    md: 'min-h-11 px-5 text-sm',
    lg: 'min-h-13 px-6 text-base',
  }

  return (
    <button
      className={[
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50' : '',
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
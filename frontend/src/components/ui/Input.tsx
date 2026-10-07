import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-xs font-semibold text-[#374151]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
          'h-12 w-full rounded-2xl border bg-white px-4',
          'text-sm text-[#111827]',
          'placeholder:text-[#9CA3AF]',
          'transition-all duration-200',
          'focus:border-[#006EB6]',
          'focus:outline-none',
          'focus:ring-4 focus:ring-[#006EB6]/10',
          error
            ? 'border-red-500'
            : 'border-[#E5E7EB]',
          className,
        ].join(' ')}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
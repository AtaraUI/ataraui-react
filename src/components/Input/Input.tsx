import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const inputVariants = cva(
  'w-full px-3 py-2 text-sm bg-white border rounded-(--radius-md) transition-colors placeholder:text-(--color-neutral-400) focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--color-neutral-50)',
  {
    variants: {
      state: {
        default: 'border-(--color-neutral-300) text-(--color-neutral-900) focus:border-(--color-primary-500) focus:ring-(--color-primary-500)/20',
        error:   'border-(--color-danger-500) text-(--color-neutral-900) focus:border-(--color-danger-500) focus:ring-(--color-danger-500)/20',
      },
      inputSize: {
        sm: 'h-8  text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  hint?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, inputSize, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-(--color-neutral-700)">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(inputVariants({ state: error ? 'error' : 'default', inputSize }), className)}
          {...props}
        />
        {hint && !error && <p className="text-xs text-(--color-neutral-500)">{hint}</p>}
        {error && <p className="text-xs text-(--color-danger-500)">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:     'bg-(--color-primary-500) text-white hover:bg-(--color-primary-600) focus-visible:ring-(--color-primary-500)',
        secondary:   'bg-(--color-neutral-100) text-(--color-neutral-900) hover:bg-(--color-neutral-200)',
        outline:     'border border-(--color-primary-500) text-(--color-primary-500) bg-transparent hover:bg-(--color-primary-50)',
        ghost:       'text-(--color-neutral-700) hover:bg-(--color-neutral-100)',
        destructive: 'bg-(--color-danger-500) text-white hover:bg-(--color-danger-600)',
      },
      size: {
        sm:   'h-8 px-3 text-sm rounded-(--radius-md) gap-1.5',
        md:   'h-10 px-4 text-sm rounded-(--radius-md) gap-2',
        lg:   'h-12 px-6 text-base rounded-(--radius-lg) gap-2',
        icon: 'h-10 w-10 rounded-(--radius-md)',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
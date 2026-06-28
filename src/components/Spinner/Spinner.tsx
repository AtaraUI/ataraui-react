import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-(--color-neutral-200) border-t-(--color-primary-500)',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, label, ...props }, ref) => (
    <span ref={ref} role="status" className={cn('inline-flex flex-col items-center gap-2', className)} {...props}>
      <span className={cn(spinnerVariants({ size }))} />
      {label && (
        <span className="text-sm text-(--color-neutral-500)">{label}</span>
      )}
      <span className="sr-only">{label ?? 'Loading...'}</span>
    </span>
  )
)
Spinner.displayName = 'Spinner'
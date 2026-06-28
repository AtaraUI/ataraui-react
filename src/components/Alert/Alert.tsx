import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─── Variants ─────────────────────────────────────────────────────────────────

export const alertVariants = cva(
  'relative flex w-full gap-3 rounded-(--radius-lg) border p-4 text-sm',
  {
    variants: {
      variant: {
        default:     'border-(--color-neutral-200) bg-(--color-neutral-50) text-(--color-neutral-700)',
        success:     'border-green-200 bg-green-50 text-green-800',
        warning:     'border-yellow-200 bg-yellow-50 text-yellow-800',
        destructive: 'border-red-200 bg-red-50 text-red-800',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  onClose?: () => void
}

// ─── Components ───────────────────────────────────────────────────────────────

export const Alert: React.FC<AlertProps> = ({
  variant,
  icon,
  onClose,
  className,
  children,
  ...props
}) => {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon && (
        <span className="mt-0.5 shrink-0 [&>svg]:size-4">{icon}</span>
      )}
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="ml-auto shrink-0 self-start rounded opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-500)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
Alert.displayName = 'Alert'

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn('font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </p>
)
AlertTitle.displayName = 'AlertTitle'

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn('mt-1 text-[0.8rem] opacity-80', className)} {...props}>
    {children}
  </p>
)
AlertDescription.displayName = 'AlertDescription'
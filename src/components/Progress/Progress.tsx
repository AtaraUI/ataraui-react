import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─── Variants ─────────────────────────────────────────────────────────────────

export const progressVariants = cva(
  'w-full overflow-hidden rounded-full bg-(--color-neutral-200)',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Value between 0–100. Omit for indeterminate. */
  value?: number
  label?: string
  showLabel?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Progress: React.FC<ProgressProps> = ({
  value,
  size,
  label,
  showLabel = false,
  className,
  ...props
}) => {
  const isIndeterminate = value === undefined || value === null

  return (
    <div className="w-full">
      {(label || showLabel) && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-(--color-neutral-600)">
          {label && <span>{label}</span>}
          {showLabel && !isIndeterminate && (
            <span className="ml-auto font-medium">{Math.round(value!)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isIndeterminate ? undefined : value}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-full bg-(--color-primary-500) transition-all duration-300 ease-in-out',
            isIndeterminate && 'w-1/3 animate-[indeterminate_1.5s_ease-in-out_infinite]'
          )}
          style={
            isIndeterminate
              ? undefined
              : { width: `${Math.min(100, Math.max(0, value!))}%` }
          }
        />
      </div>
    </div>
  )
}
Progress.displayName = 'Progress'
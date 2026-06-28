import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const separatorVariants = cva(
  'shrink-0 bg-(--color-neutral-200)',
  {
    variants: {
      orientation: {
        horizontal: 'h-px w-full',
        vertical:   'h-full w-px',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
)

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  label?: string
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, label, ...props }, ref) => {
    if (label && orientation !== 'vertical') {
      return (
        <div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
          <div className="h-px flex-1 bg-(--color-neutral-200)" />
          <span className="text-xs text-(--color-neutral-400) font-medium select-none">
            {label}
          </span>
          <div className="h-px flex-1 bg-(--color-neutral-200)" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation ?? 'horizontal'}
        className={cn(separatorVariants({ orientation }), className)}
        {...props}
      />
    )
  }
)
Separator.displayName = 'Separator'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─── Variants ─────────────────────────────────────────────────────────────────

export const skeletonVariants = cva(
  'animate-pulse bg-(--color-neutral-200)',
  {
    variants: {
      variant: {
        text:   'h-4 w-full rounded',
        circle: 'rounded-full',
        rect:   'rounded-(--radius-md)',
      },
    },
    defaultVariants: { variant: 'rect' },
  }
)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Skeleton: React.FC<SkeletonProps> = ({
  variant,
  width,
  height,
  className,
  style,
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      style={{
        width:  typeof width  === 'number' ? `${width}px`  : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  )
}
Skeleton.displayName = 'Skeleton'
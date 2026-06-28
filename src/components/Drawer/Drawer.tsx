import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const drawerVariants = cva(
  'fixed z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out',
  {
    variants: {
      side: {
        left:   'inset-y-0 left-0 h-full',
        right:  'inset-y-0 right-0 h-full',
        top:    'inset-x-0 top-0 w-full',
        bottom: 'inset-x-0 bottom-0 w-full',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

const sizeStyle: Record<string, React.CSSProperties> = {
  sm:   { width: '20rem' },
  md:   { width: '24rem' },
  lg:   { width: '32rem' },
  full: { width: '100%' },
}

const translateMap = {
  left:   { closed: 'translateX(-100%)', open: 'translateX(0)' },
  right:  { closed: 'translateX(100%)',  open: 'translateX(0)' },
  top:    { closed: 'translateY(-100%)', open: 'translateY(0)' },
  bottom: { closed: 'translateY(100%)',  open: 'translateY(0)' },
}

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  closeOnOverlayClick?: boolean
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  side = 'right',
  size = 'md',
  className,
  closeOnOverlayClick = true,
}) => {
  React.useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open])

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const resolvedSide = side ?? 'right'
  const transform = open
    ? translateMap[resolvedSide].open
    : translateMap[resolvedSide].closed

  const isHorizontal = resolvedSide === 'left' || resolvedSide === 'right'

  return (
    <div className={cn('fixed inset-0 z-50', !open && 'pointer-events-none')}>
      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Drawer */}
      <div
        className={cn(drawerVariants({ side }), className)}
        style={{
          transform,
          ...(isHorizontal ? sizeStyle[size] : { height: 'auto', maxHeight: '80vh' }),
        }}
      >
        {children}
      </div>
    </div>
  )
}
Drawer.displayName = 'Drawer'

// ─── Sub-components ───────────────────────────────────────

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  className,
  children,
  onClose,
  ...props
}) => (
  <div
    className={cn('flex items-start justify-between p-6 pb-4 border-b border-(--color-neutral-200)', className)}
    {...props}
  >
    <div className="flex flex-col gap-1">{children}</div>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="ml-4 shrink-0 rounded-(--radius-md) p-1 text-(--color-neutral-400) hover:bg-(--color-neutral-100) hover:text-(--color-neutral-700) transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
)
DrawerHeader.displayName = 'DrawerHeader'

export const DrawerTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2
    className={cn('text-lg font-semibold text-(--color-neutral-900)', className)}
    {...props}
  />
)
DrawerTitle.displayName = 'DrawerTitle'

export const DrawerDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn('text-sm text-(--color-neutral-500)', className)}
    {...props}
  />
)
DrawerDescription.displayName = 'DrawerDescription'

export const DrawerBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex-1 overflow-y-auto p-6 text-sm text-(--color-neutral-700)', className)}
    {...props}
  />
)
DrawerBody.displayName = 'DrawerBody'

export const DrawerFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex items-center justify-end gap-2 p-6 pt-4 border-t border-(--color-neutral-200)', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'
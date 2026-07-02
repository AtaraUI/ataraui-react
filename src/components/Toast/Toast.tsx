import React from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive'
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface ToastItem {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export type ToastInput = Omit<ToastItem, 'id'>

// ─── Context ──────────────────────────────────────────────────────────────────

interface ToastContextValue {
  toasts: ToastItem[]
  toast: (input: ToastInput) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

let counter = 0
const genId = () => `toast-${++counter}`

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((input: ToastInput): string => {
    const id = genId()
    setToasts((prev) => [...prev, { ...input, id }])
    return id
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = React.useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextValue => {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

// ─── Variants ─────────────────────────────────────────────────────────────────

export const toastVariants = cva(
  'pointer-events-auto relative flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 overflow-hidden rounded-(--radius-lg) border p-4 pr-8 shadow-lg',
  {
    variants: {
      variant: {
        default:     'border-(--color-neutral-200) bg-(--bg,white) text-(--color-neutral-800)',
        success:     'border-green-200 bg-green-50 text-green-900',
        warning:     'border-yellow-200 bg-yellow-50 text-yellow-900',
        destructive: 'border-red-200 bg-red-50 text-red-900',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

// ─── Position map ─────────────────────────────────────────────────────────────

const positionClasses: Record<ToastPosition, string> = {
  'top-left':      'top-4 left-4 items-start',
  'top-center':    'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-right':     'top-4 right-4 items-end',
  'bottom-left':   'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right':  'bottom-4 right-4 items-end',
}

// ─── Single Toast ─────────────────────────────────────────────────────────────

interface SingleToastProps {
  toast: ToastItem
  onDismiss: (id: string) => void
  defaultDuration: number
}

const SingleToast: React.FC<SingleToastProps> = ({ toast, onDismiss, defaultDuration }) => {
  const duration = toast.duration ?? defaultDuration

  React.useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(() => onDismiss(toast.id), duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss, toast.id])

  return (
    <div
      role="status"
      aria-live="polite"
      className={toastVariants({ variant: toast.variant ?? 'default' })}
    >
      {toast.icon && (
        <span className="mt-0.5 shrink-0 [&>svg]:size-4">{toast.icon}</span>
      )}
      <div className="flex-1 space-y-1">
        {toast.title && (
          <p className="text-sm font-semibold leading-none">{toast.title}</p>
        )}
        {toast.description && (
          <p className="text-xs opacity-80">{toast.description}</p>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action!.onClick()
              onDismiss(toast.id)
            }}
            className="mt-1.5 text-xs font-medium underline underline-offset-2 hover:no-underline focus:outline-none"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => onDismiss(toast.id)}
        className="absolute right-2 top-2 rounded opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-500)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  )
}

// ─── Toaster ──────────────────────────────────────────────────────────────────

export interface ToasterProps {
  position?: ToastPosition
  defaultDuration?: number
  className?: string
}

export const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  defaultDuration = 4000,
  className,
}) => {
  const { toasts, dismiss } = useToast()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return createPortal(
    <div
      aria-label="Notifications"
      className={cn(
        'fixed z-[100] flex flex-col gap-2 pointer-events-none',
        positionClasses[position],
        className
      )}
    >
      {toasts.map((t) => (
        <SingleToast
          key={t.id}
          toast={t}
          onDismiss={dismiss}
          defaultDuration={defaultDuration}
        />
      ))}
    </div>,
    document.body
  )
}

Toaster.displayName = 'Toaster'
ToastProvider.displayName = 'ToastProvider'
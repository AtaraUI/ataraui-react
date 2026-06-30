import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─── Variants ─────────────────────────────────────────────────────────────────

export const accordionVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default:  'divide-y divide-(--color-neutral-200) rounded-(--radius-lg) border border-(--color-neutral-200)',
        ghost:    'divide-y divide-(--color-neutral-200)',
        outlined: 'flex flex-col gap-2',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

// ─── Context ──────────────────────────────────────────────────────────────────

type AccordionType = 'single' | 'multiple'
type AccordionVariant = 'default' | 'ghost' | 'outlined'

interface AccordionContextValue {
  openItems: string[]
  toggle: (value: string) => void
  variant: AccordionVariant
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

const useAccordionContext = () => {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion components must be used within <Accordion>')
  return ctx
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof accordionVariants> {
  type?: AccordionType
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─── Components ───────────────────────────────────────────────────────────────

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  value,
  defaultValue,
  onChange,
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const initOpen = defaultValue
    ? Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    : []

  const [uncontrolled, setUncontrolled] = React.useState<string[]>(initOpen)
  const isControlled = value !== undefined
  const openItems = isControlled
    ? Array.isArray(value) ? value : [value]
    : uncontrolled

  const toggle = React.useCallback((val: string) => {
    let next: string[]

    if (type === 'single') {
      next = openItems.includes(val) ? [] : [val]
    } else {
      next = openItems.includes(val)
        ? openItems.filter((v) => v !== val)
        : [...openItems, val]
    }

    if (!isControlled) setUncontrolled(next)
    onChange?.(type === 'single' ? (next[0] ?? '') : next)
  }, [isControlled, onChange, openItems, type])

  return (
    <AccordionContext.Provider value={{ openItems, toggle, variant: variant as AccordionVariant }}>
      <div className={cn(accordionVariants({ variant }), className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}
Accordion.displayName = 'Accordion'

// ─── Item Context ─────────────────────────────────────────────────────────────

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
  disabled: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

const useAccordionItemContext = () => {
  const ctx = React.useContext(AccordionItemContext)
  if (!ctx) throw new Error('AccordionTrigger/Content must be used within <AccordionItem>')
  return ctx
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const { openItems, variant } = useAccordionContext()
  const isOpen = openItems.includes(value)

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          variant === 'outlined' && 'rounded-(--radius-lg) border border-(--color-neutral-200)',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const { toggle } = useAccordionContext()
  const { value, isOpen } = useAccordionItemContext()

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggle(value)}
      className={cn(
        'flex w-full items-center justify-between px-4 py-4 text-sm font-medium text-(--color-neutral-900) transition-all hover:bg-(--color-neutral-50) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-500)',
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('shrink-0 text-(--color-neutral-500) transition-transform duration-200', isOpen && 'rotate-180')}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
  ...props
}) => {
  const { isOpen } = useAccordionItemContext()

  if (!isOpen) return null

  return (
    <div
      className={cn('px-4 pb-4 text-sm text-(--color-neutral-600)', className)}
      {...props}
    >
      {children}
    </div>
  )
}
AccordionContent.displayName = 'AccordionContent'
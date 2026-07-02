import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const selectVariants = cva(
  'w-full appearance-none bg-(--bg,white) border rounded-(--radius-md) px-3 py-2 text-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--color-neutral-50)',
  {
    variants: {
      state: {
        default: 'border-(--color-neutral-300) text-(--color-neutral-900) focus:border-(--color-primary-500) focus:ring-(--color-primary-500)/20',
        error:   'border-(--color-danger-500) text-(--color-neutral-900) focus:border-(--color-danger-500) focus:ring-(--color-danger-500)/20',
      },
      selectSize: {
        sm: 'h-8  text-xs pr-8',
        md: 'h-10 text-sm pr-8',
        lg: 'h-12 text-base pr-10',
      },
    },
    defaultVariants: {
      state: 'default',
      selectSize: 'md',
    },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string
  error?: string
  hint?: string
  placeholder?: string
  options?: SelectOption[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, placeholder, options, selectSize, id, children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-(--color-neutral-700)">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(selectVariants({ state: error ? 'error' : 'default', selectSize }), className)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--color-neutral-400)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {hint && !error && <p className="text-xs text-(--color-neutral-500)">{hint}</p>}
        {error && <p className="text-xs text-(--color-danger-500)">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
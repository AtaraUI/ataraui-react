import React from 'react'
import { cn } from '../../utils/cn'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  description?: string
  error?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, error, id, disabled, checked, defaultChecked, onChange, ...props }, ref) => {
    const switchId = id ?? `switch-${Math.random().toString(36).slice(2, 9)}`

    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked ?? false
    )

    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked)
      onChange?.(e)
    }

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <div className="relative inline-flex shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              id={switchId}
              disabled={disabled}
              checked={isChecked}
              onChange={handleChange}
              className="sr-only peer"
              {...props}
            />
            <label
              htmlFor={switchId}
              className={cn(
                'relative flex h-5 w-9 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
                'bg-(--color-neutral-200) peer-checked:bg-(--color-primary-500)',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-(--color-primary-500)/20',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                error && 'ring-2 ring-(--color-danger-500)/20',
                className
              )}
            >
              <span
                className="pointer-events-none block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform"
                style={{
                  transform: isChecked ? 'translateX(18px)' : 'translateX(2px)',
                }}
              />
            </label>
          </div>

          {(label || description) && (
            <div className="flex flex-col gap-0.5">
              {label && (
                <span
                  className={cn(
                    'text-sm font-medium text-(--color-neutral-900)',
                    disabled && 'opacity-50',
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <p className="text-xs text-(--color-neutral-500)">{description}</p>
              )}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-(--color-danger-500) ml-12">{error}</p>
        )}
      </div>
    )
  }
)
Switch.displayName = 'Switch'
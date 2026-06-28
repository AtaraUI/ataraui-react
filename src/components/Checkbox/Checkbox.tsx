import React from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, disabled, ...props }, ref) => {
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={cn(
              "h-4 w-4 shrink-0 mt-0.5 rounded-(--radius-sm) border cursor-pointer transition-colors appearance-none",
              "border-(--color-neutral-300) bg-white",
              "checked:bg-(--color-primary-500) checked:border-(--color-primary-500)",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-500)/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-(--color-danger-500)",
              className,
            )}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            {...props}
          />
          {(label || description) && (
            <div className="flex flex-col gap-0.5">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    "text-sm font-medium cursor-pointer text-(--color-neutral-900)",
                    disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-xs text-(--color-neutral-500)">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-(--color-danger-500) ml-6">{error}</p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

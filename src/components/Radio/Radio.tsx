import React from "react";
import { cn } from "../../utils/cn";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  error?: string;
  hint?: string;
  orientation?: "vertical" | "horizontal";
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  error,
  hint,
  orientation = "vertical",
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-(--color-neutral-700)">
          {label}
        </span>
      )}
      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        )}
      >
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          return (
            <div key={option.value} className="flex items-start gap-2.5">
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={option.disabled}
                onChange={() => onChange?.(option.value)}
                className={cn(
                  "h-4 w-4 shrink-0 mt-0.5 cursor-pointer appearance-none rounded-full border-2 transition-colors",
                  "border-(--color-neutral-300) bg-white",
                  "checked:border-(--color-primary-500) checked:bg-(--color-primary-500)",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-500)/20",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  error && "border-(--color-danger-500)",
                )}
                style={{
                  backgroundImage:
                    value === option.value
                      ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`
                      : "none",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor={optionId}
                  className={cn(
                    "text-sm font-medium cursor-pointer text-(--color-neutral-900)",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-xs text-(--color-neutral-500)">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {hint && !error && (
        <p className="text-xs text-(--color-neutral-500)">{hint}</p>
      )}
      {error && <p className="text-xs text-(--color-danger-500)">{error}</p>}
    </div>
  );
};
RadioGroup.displayName = "RadioGroup";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// ─── Variants ─────────────────────────────────────────────────────────────────

export const tabsListVariants = cva(
  "flex items-center gap-1 rounded-(--radius-lg) p-1",
  {
    variants: {
      variant: {
        default: "bg-(--color-neutral-100)",
        outline: "bg-transparent border border-(--color-neutral-200)",
        pills:   "bg-transparent gap-2",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-(--radius-md) px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-500) disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-(--color-neutral-500)",
        outline: "text-(--color-neutral-500)",
        pills:   "text-(--color-neutral-500) rounded-full",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

// ─── Context ──────────────────────────────────────────────────────────────────

type TabsVariant = "default" | "outline" | "pills"

interface TabsContextValue {
  active: string
  setActive: (value: string) => void
  variant: TabsVariant
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>")
  return ctx
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tabsListVariants> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

// ─── Components ───────────────────────────────────────────────────────────────

export const Tabs: React.FC<TabsProps> = ({
  value,
  defaultValue = "",
  onChange,
  variant = "default",
  className,
  children,
  ...props
}) => {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const active = isControlled ? value : uncontrolled

  const setActive = React.useCallback(
    (val: string) => {
      if (!isControlled) setUncontrolled(val)
      onChange?.(val)
    },
    [isControlled, onChange]
  )

  return (
    <TabsContext.Provider value={{ active, setActive, variant: variant as TabsVariant }}>
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}
Tabs.displayName = "Tabs"

export const TabsList: React.FC<TabsListProps> = ({ className, children, ...props }) => {
  const { variant } = useTabsContext()
  return (
    <div
      role="tablist"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
TabsList.displayName = "TabsList"

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const { active, setActive, variant } = useTabsContext()
  const isActive = active === value

  const activeStyle = React.useMemo(() => {
    if (!isActive) return {}
    if (variant === "pills") return {}
    return { background: "var(--bg, white)" }
  }, [isActive, variant])

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => setActive(value)}
      style={activeStyle}
      className={cn(
        tabsTriggerVariants({ variant }),
        isActive && variant === "default" && "text-(--color-neutral-900) shadow-sm",
        isActive && variant === "outline" && "border border-(--color-neutral-200) text-(--color-neutral-900)",
        isActive && variant === "pills" && "bg-(--color-primary-500) text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const { active } = useTabsContext()
  const isActive = active === value

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      className={cn("mt-2", !isActive && "hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
}
TabsContent.displayName = "TabsContent"
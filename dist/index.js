'use strict';

var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

// src/utils/cn.ts
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

// src/tokens/index.ts
var colors = {
  primary: {
    50: "#FFF4EE",
    100: "#FFE0CC",
    200: "#FFBF99",
    300: "#F08050",
    400: "#D4602A",
    500: "#C2440A",
    600: "#A03808",
    700: "#8F2F06",
    800: "#5C1C03",
    900: "#2E0D01"
  },
  neutral: {
    50: "#f9f7f5",
    100: "#f0ece7",
    200: "#ddd6cc",
    300: "#c5bab0",
    400: "#a89b8e",
    500: "#8a7d72",
    600: "#6f6358",
    700: "#564d45",
    800: "#3c3630",
    900: "#252019"
  },
  danger: {
    500: "#ef4444",
    600: "#dc2626"
  },
  success: {
    500: "#22c55e",
    600: "#16a34a"
  },
  warning: {
    500: "#f59e0b",
    600: "#d97706"
  }
};
var radius = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px"
};
var fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.5rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }]
};
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-(--color-primary-500) text-white hover:bg-(--color-primary-600) focus-visible:ring-(--color-primary-500)",
        secondary: "bg-(--color-neutral-100) text-(--color-neutral-900) hover:bg-(--color-neutral-200)",
        outline: "border border-(--color-primary-500) text-(--color-primary-500) bg-transparent hover:bg-(--color-primary-50)",
        ghost: "text-(--color-neutral-700) hover:bg-(--color-neutral-100)",
        destructive: "bg-(--color-danger-500) text-white hover:bg-(--color-danger-600)"
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-(--radius-md) gap-1.5",
        md: "h-10 px-4 text-sm rounded-(--radius-md) gap-2",
        lg: "h-12 px-6 text-base rounded-(--radius-lg) gap-2",
        icon: "h-10 w-10 rounded-(--radius-md)"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
var Button = React__default.default.forwardRef(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      className: cn(buttonVariants({ variant, size }), className),
      disabled: disabled || isLoading,
      ...props,
      children: [
        isLoading && /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "animate-spin h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsxRuntime.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
          /* @__PURE__ */ jsxRuntime.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v8z" })
        ] }),
        children
      ]
    }
  )
);
Button.displayName = "Button";
var inputVariants = classVarianceAuthority.cva(
  "w-full px-3 py-2 text-sm bg-white border rounded-(--radius-md) transition-colors placeholder:text-(--color-neutral-400) focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--color-neutral-50)",
  {
    variants: {
      state: {
        default: "border-(--color-neutral-300) text-(--color-neutral-900) focus:border-(--color-primary-500) focus:ring-(--color-primary-500)/20",
        error: "border-(--color-danger-500) text-(--color-neutral-900) focus:border-(--color-danger-500) focus:ring-(--color-danger-500)/20"
      },
      inputSize: {
        sm: "h-8  text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base"
      }
    },
    defaultVariants: {
      state: "default",
      inputSize: "md"
    }
  }
);
var Input = React__default.default.forwardRef(
  ({ className, label, error, hint, id, inputSize, ...props }, ref) => {
    const inputId = id != null ? id : label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-");
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-1.5 w-full", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: inputId, className: "text-sm font-medium text-(--color-neutral-700)", children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref,
          id: inputId,
          className: cn(inputVariants({ state: error ? "error" : "default", inputSize }), className),
          ...props
        }
      ),
      hint && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-(--color-neutral-500)", children: hint }),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-(--color-danger-500)", children: error })
    ] });
  }
);
Input.displayName = "Input";
var badgeVariants = classVarianceAuthority.cva(
  "inline-flex items-center rounded-full font-medium",
  {
    variants: {
      variant: {
        default: "bg-(--color-primary-500) text-white",
        secondary: "bg-(--color-neutral-100) text-(--color-neutral-700)",
        outline: "border border-(--color-primary-500) text-(--color-primary-500)",
        success: "bg-(--color-success-500)/10 text-(--color-success-600)",
        warning: "bg-(--color-warning-500)/10 text-(--color-warning-600)",
        destructive: "bg-(--color-danger-500)/10 text-(--color-danger-600)"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var Badge = ({ className, variant, size, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: cn(badgeVariants({ variant, size }), className), ...props });
Badge.displayName = "Badge";

exports.Badge = Badge;
exports.Button = Button;
exports.Input = Input;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.cn = cn;
exports.colors = colors;
exports.fontSize = fontSize;
exports.inputVariants = inputVariants;
exports.radius = radius;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
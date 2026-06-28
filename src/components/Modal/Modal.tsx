import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const modalVariants = cva(
  "relative bg-white rounded-(--radius-xl) shadow-lg w-full mx-4 transition-all",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full mx-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  size,
  className,
  closeOnOverlayClick = true,
}) => {
  React.useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      {/* Content */}
      <div className={cn(modalVariants({ size }), className)}>{children}</div>
    </div>
  );
};
Modal.displayName = "Modal";

// ─── Sub-components ───────────────────────────────────────

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  children,
  onClose,
  ...props
}) => (
  <div
    className={cn("flex items-start justify-between p-6 pb-4", className)}
    {...props}
  >
    <div className="flex flex-col gap-1">{children}</div>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="ml-4 shrink-0 rounded-(--radius-md) p-1 text-(--color-neutral-400) hover:bg-(--color-neutral-100) hover:text-(--color-neutral-700) transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);
ModalHeader.displayName = "ModalHeader";

export const ModalTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2
    className={cn(
      "text-lg font-semibold text-(--color-neutral-900)",
      className,
    )}
    {...props}
  />
);
ModalTitle.displayName = "ModalTitle";

export const ModalDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-(--color-neutral-500)", className)}
    {...props}
  />
);
ModalDescription.displayName = "ModalDescription";

export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("px-6 py-2 text-sm text-(--color-neutral-700)", className)}
    {...props}
  />
);
ModalBody.displayName = "ModalBody";

export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex items-center justify-end gap-2 p-6 pt-4", className)}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

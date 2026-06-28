import { ClassValue } from 'clsx';
import * as class_variance_authority_types from 'class-variance-authority/types';
import React from 'react';
import { VariantProps } from 'class-variance-authority';

declare function cn(...inputs: ClassValue[]): string;

declare const colors: {
    readonly primary: {
        readonly 50: "#FFF4EE";
        readonly 100: "#FFE0CC";
        readonly 200: "#FFBF99";
        readonly 300: "#F08050";
        readonly 400: "#D4602A";
        readonly 500: "#C2440A";
        readonly 600: "#A03808";
        readonly 700: "#8F2F06";
        readonly 800: "#5C1C03";
        readonly 900: "#2E0D01";
    };
    readonly neutral: {
        readonly 50: "#f9f7f5";
        readonly 100: "#f0ece7";
        readonly 200: "#ddd6cc";
        readonly 300: "#c5bab0";
        readonly 400: "#a89b8e";
        readonly 500: "#8a7d72";
        readonly 600: "#6f6358";
        readonly 700: "#564d45";
        readonly 800: "#3c3630";
        readonly 900: "#252019";
    };
    readonly danger: {
        readonly 500: "#ef4444";
        readonly 600: "#dc2626";
    };
    readonly success: {
        readonly 500: "#22c55e";
        readonly 600: "#16a34a";
    };
    readonly warning: {
        readonly 500: "#f59e0b";
        readonly 600: "#d97706";
    };
};
declare const radius: {
    readonly none: "0";
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
    readonly '2xl': "1rem";
    readonly full: "9999px";
};
declare const fontSize: {
    readonly xs: readonly ["0.75rem", {
        readonly lineHeight: "1rem";
    }];
    readonly sm: readonly ["0.875rem", {
        readonly lineHeight: "1.25rem";
    }];
    readonly base: readonly ["1rem", {
        readonly lineHeight: "1.5rem";
    }];
    readonly lg: readonly ["1.125rem", {
        readonly lineHeight: "1.75rem";
    }];
    readonly xl: readonly ["1.25rem", {
        readonly lineHeight: "1.75rem";
    }];
};

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const inputVariants: (props?: ({
    state?: "default" | "error" | null | undefined;
    inputSize?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
    hint?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const badgeVariants: (props?: ({
    variant?: "secondary" | "outline" | "destructive" | "default" | "success" | "warning" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
}
declare const Badge: {
    ({ className, variant, size, ...props }: BadgeProps): React.JSX.Element;
    displayName: string;
};

export { Badge, type BadgeProps, Button, type ButtonProps, Input, type InputProps, badgeVariants, buttonVariants, cn, colors, fontSize, inputVariants, radius };

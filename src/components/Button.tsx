import React, { forwardRef } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      className = "",
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const variantClass =
      variant === "secondary" ? styles.secondary : styles.primary;

    return (
      <button
        ref={ref}
        type={type}
        className={`${styles.button} ${variantClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

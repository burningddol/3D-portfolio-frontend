import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./style/win98Button.module.scss";

type Win98ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "icon";
  size?: "small" | "default" | "large";
  pressed?: boolean;
  icon?: ReactNode;
};

export default function Win98Button({
  variant = "default",
  size = "default",
  pressed = false,
  icon,
  className = "",
  children,
  ...props
}: Win98ButtonProps) {
  const base = variant === "icon" ? styles.iconButton : styles.button;

  const sizeClass =
    size === "small" ? styles.small : size === "large" ? styles.large : "";

  const variantClass = variant === "primary" ? styles.primary : "";

  return (
    <button
      {...props}
      className={[
        base,
        sizeClass,
        variantClass,
        pressed ? styles.pressed : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {variant === "icon" ? null : children}
    </button>
  );
}

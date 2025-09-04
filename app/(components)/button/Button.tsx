"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  bg?: string;
}

export default function Button({ children, bg, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        bg === "transparent"
          ? `${styles.transparent_button} ${props.className}`
          : `${styles.button} ${props.className}`
      }
    >
      {children}
    </button>
  );
}

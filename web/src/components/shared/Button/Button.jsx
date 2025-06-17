import React from "react";
import clsx from "clsx";
import s from "./Button.module.scss";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  className,
  style,
  ...props
}) {
  return (
    <button
      className={clsx(s.button, s[variant], s[size], className)}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

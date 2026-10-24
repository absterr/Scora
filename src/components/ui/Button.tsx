import type { FC } from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";

import { cn } from "@/lib/utils";

type IconComponent = FC<SvgProps>;

type BaseProps = Omit<PressableProps, "children"> & {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger";
  size?: "md" | "sm";
  className?: string;
};

type WithLabel = BaseProps & { label: string; icon?: IconComponent };
type WithIcon = BaseProps & { icon: IconComponent; label?: string };
type ButtonProps = WithLabel | WithIcon;

const variants = {
  primary: {
    container: "bg-brand-400 border border-brand-300",
    color: "text-white",
  },
  secondary: {
    container:
      "bg-[rgba(234,235,255,0.16)] dark:bg-grey-800 border border-snow-600 dark:border-grey-500",
    color: "text-ink-500 dark:text-white",
  },
  ghost: {
    container: "",
    color: "text-ink-500 dark:text-snow-600",
  },
  accent: {
    container:
      "bg-brand-400 border border-brand-300 dark:bg-snow-500 dark:border-grey-500",
    color: "text-white dark:text-ink-500",
  },
  danger: {
    container:
      "bg-[rgba(205,207,229,0.22)] dark:bg-grey-700 border border-error-500",
    color: "text-error-500",
  },
};

export default function Button({
  variant = "primary",
  label,
  icon: Icon,
  size = "md",
  disabled,
  className,
  ...props
}: ButtonProps) {
  const v = variants[variant];

  return (
    <Pressable
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-center gap-2 rounded-xl",
        size === "sm" ? "h-9 px-6" : "h-10 px-4",
        v.container,
        disabled && "opacity-20",
        className
      )}
      {...props}
    >
      {Icon ? <Icon width={18} height={18} className={v.color} /> : null}
      {label ? (
        <Text
          className={cn(
            "font-display-medium",
            size === "sm" ? "text-sm leading-1" : "text-base leading-5",
            v.color
          )}
          style={size === "sm" ? { letterSpacing: 0.42 } : undefined}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

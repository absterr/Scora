import type { FC } from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";

import { cn } from "@/lib/utils";

type IconComponent = FC<SvgProps>;

type BaseProps = Omit<PressableProps, "children"> & {
  variant?: "primary" | "secondary" | "ghost" | "accent";
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
};

export default function Button({
  variant = "primary",
  label,
  icon: Icon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const v = variants[variant];

  return (
    <Pressable
      disabled={disabled}
      className={cn(
        "h-10 flex-row items-center justify-center gap-2 rounded-xl px-4",
        v.container,
        disabled && "opacity-20",
        className
      )}
      {...props}
    >
      {Icon ? <Icon width={18} height={18} className={v.color} /> : null}
      {label ? (
        <Text
          className={cn("font-display-medium text-base leading-5", v.color)}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

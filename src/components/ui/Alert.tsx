import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { cn } from "@/lib/utils";
import { Warning } from "../icons/solid";

type AlertProps = {
  children: ReactNode;
  size?: "md" | "sm";
  inline?: boolean;
  className?: string;
};

export default function Alert({
  children,
  size = "md",
  inline = false,
  className,
}: AlertProps) {
  return (
    <View
      className={cn(
        "p-3 flex-row items-start gap-2.5 rounded-xl border border-warning-400 bg-warning-50",
        " dark:border-card-stroke dark:bg-[rgba(161,161,161,0.4)]",
        className
      )}
    >
      <Warning width={12.8} height={12} className="text-[#F9A63A]" />
      <Text
        className={cn(
          "flex-1 font-display-regular text-warning-500 dark:text-warning-200",
          size === "md" ? "text-sm leading-5" : "text-xs leading-4"
        )}
        style={size === "md" ? { letterSpacing: -0.084 } : undefined}
      >
        {children}
      </Text>
    </View>
  );
}

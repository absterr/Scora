import { useState, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { ChevronDown } from "@/components/icons/line";
import { cn } from "@/lib/utils";

type CollapsibleProps = {
  title: string;
  description?: string;
  children: ReactNode;
  size?: "md" | "sm";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

const TIGHT = { letterSpacing: -0.084 };

export default function Collapsible({
  title,
  description,
  children,
  size = "md",
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: CollapsibleProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const isOpen = open ?? internal;

  const toggle = () => {
    if (open === undefined) setInternal(!isOpen);
    onOpenChange?.(!isOpen);
  };

  return (
    <View
      className={cn(
        "p-3 gap-2.5 rounded-xl border border-brand-100 dark:border-grey-500",
        "bg-[rgba(205,207,229,0.22)] dark:bg-grey-800",
        className
      )}
    >
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className={cn(
          "flex-row items-center gap-2.5",
          isOpen && "border-b border-brand-100 pb-3 dark:border-grey-500"
        )}
      >
        <View className="flex-1 gap-1">
          <Text
            className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
            style={TIGHT}
          >
            {title}
          </Text>
          {description ? (
            <Text
              className={cn(
                "font-display-regular text-ink-400 dark:text-grey-100",
                size === "md" ? "text-sm leading-5" : "text-xs leading-4"
              )}
              style={size === "md" ? TIGHT : undefined}
            >
              {description}
            </Text>
          ) : null}
        </View>
        <View style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}>
          <ChevronDown
            width={16}
            height={16}
            className="text-ink-400 dark:text-grey-100"
          />
        </View>
      </Pressable>
      {isOpen ? children : null}
    </View>
  );
}

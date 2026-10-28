import { Pressable, Text, View } from "react-native";

import { Check } from "@/components/icons/line";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: "filled" | "outline";
  shape?: "square" | "circle";
  className?: string;
};

const OFF =
  "border-brand-100 bg-ink-50 dark:border-card-stroke dark:bg-[rgba(161,161,161,0.4)]";
const SQUARE_ON = "border-brand-500 bg-brand-500";
const CIRCLE_ON = "border-brand-400 bg-brand-400";
const OUTLINE =
  "border-brand-100 bg-ink-50 dark:border-snow-300/[0.11] dark:bg-snow-300/[0.11]";

export default function Checkbox({
  label,
  checked,
  onChange,
  variant = "filled",
  shape = "square",
  className,
}: CheckboxProps) {
  const circle = shape === "circle";
  const outline = variant === "outline";

  const state = outline
    ? OUTLINE
    : checked
      ? circle
        ? CIRCLE_ON
        : SQUARE_ON
      : OFF;

  return (
    <Pressable
      accessibilityRole={circle ? "radio" : "checkbox"}
      accessibilityState={{ checked }}
      hitSlop={circle ? 8 : 12}
      onPress={() => onChange(!checked)}
      className={cn(
        "flex-row items-center",
        circle ? "gap-2" : "gap-2.5 pt-1",
        className
      )}
    >
      <View
        className={cn(
          "size-3.5 items-center justify-center",
          circle ? "rounded-full border" : "rounded border-[0.8px]",
          state
        )}
      >
        {checked ? (
          <Check
            width={circle ? 11 : 12}
            height={circle ? 11 : 12}
            className={
              outline ? "text-brand-300 dark:text-[#EBECFA]" : "text-white"
            }
          />
        ) : null}
      </View>
      <Text
        className={cn(
          "shrink font-display-regular text-sm leading-5",
          outline || circle
            ? "text-ink-400 dark:text-grey-100"
            : "text-snow-900"
        )}
        style={{ letterSpacing: -0.084 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

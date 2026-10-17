import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { cn } from "@/lib/utils";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export default function Checkbox({
  label,
  checked,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      hitSlop={12}
      onPress={() => onChange(!checked)}
      className={cn("flex-row items-start gap-2.5", className)}
    >
      <View className="pt-1">
        <View
          className={cn(
            "size-3.5 items-center justify-center rounded border-[0.8px]",
            checked
              ? "border-brand-500 bg-brand-500"
              : "border-brand-100 bg-ink-50 dark:border-card-stroke dark:bg-[rgba(161,161,161,0.4)]"
          )}
        >
          {checked ? (
            <Svg width={14} height={14} viewBox="0 0 14 14">
              <Path
                d="M3.5 7.2 5.8 9.4 10.5 4.6"
                stroke="#FFFFFF"
                strokeWidth={1.458}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          ) : null}
        </View>
      </View>
      <Text
        className="flex-1 font-display-regular text-sm leading-5 text-snow-900"
        style={{ letterSpacing: -0.084 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

import { useColorScheme } from "nativewind";
import { type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";
import { Check } from "../icons/line";

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  flag?: ReactNode;
  className?: string;
};

export default function RadioButton({
  label,
  selected,
  onPress,
  flag,
  className,
}: RadioButtonProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // snow-300/10 (unselected/light)
  const cardStyle = {
    backgroundColor: selected
      ? isDark
        ? "#3B49BB"
        : "#EBECFA"
      : isDark
        ? "#242424"
        : "rgba(252, 252, 252, 0.1)",
    borderColor: selected
      ? isDark
        ? "#3B49BB"
        : "#8E96D8"
      : isDark
        ? "#333333"
        : "#EBECFA",
  };

  // snow-300/4 (unselected/dark), snow-500/16 (unselected/light), snow-300/11 (unselected/dark border)
  const indicatorStyle = {
    backgroundColor: selected
      ? "#0A1BAA"
      : isDark
        ? "rgba(252, 252, 252, 0.04)"
        : "rgba(250, 250, 250, 0.16)",
    borderColor: selected
      ? "#0A1BAA"
      : isDark
        ? "rgba(252, 252, 252, 0.11)"
        : "#B3B8E5",
    ...(selected ? { boxShadow: "0px 0px 0px 2.33333px #F4EBFF" } : {}),
  };

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      className={cn(
        "h-12 w-full flex-row items-center gap-[10px] rounded-xl border px-4",
        className
      )}
      style={cardStyle}
    >
      {flag != null && (
        <View
          className="h-6 w-6 overflow-hidden rounded-full border"
          style={{
            borderColor: isDark ? "#1C1C1C" : "#E4E4E4",
          }}
        >
          {flag}
        </View>
      )}

      <View className="min-w-0 flex-1 flex-row items-center gap-2">
        <Text
          numberOfLines={1}
          className="flex-1 font-display-regular text-sm"
          style={{
            color: selected
              ? isDark
                ? "#FDFDFD"
                : "#101010"
              : isDark
                ? "#FFFFFF"
                : "#101010",
            lineHeight: 20,
            letterSpacing: -0.084,
          }}
        >
          {label}
        </Text>

        <View
          className="h-[14px] w-[14px] items-center justify-center rounded-[7px] border"
          style={indicatorStyle}
        >
          {selected && <Check className="text-white" width={10} height={10} />}
        </View>
      </View>
    </Pressable>
  );
}

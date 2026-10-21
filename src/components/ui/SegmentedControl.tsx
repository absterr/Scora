import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  label?: string;
  className?: string;
};

const TIGHT = { letterSpacing: -0.084 };

export default function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  const selectedIndex = options.findIndex((option) => option.value === value);
  const index = Math.max(0, selectedIndex);
  const width = useSharedValue(0);
  const position = useSharedValue(index);

  useEffect(() => {
    position.value = withTiming(index, {
      duration: 120,
    });
  }, [index, position]);

  const indicatorStyle = useAnimatedStyle(() => {
    const segmentWidth = Math.max(0, (width.value - 6) / options.length);

    return {
      width: segmentWidth,
      transform: [{ translateX: position.value * segmentWidth }],
    };
  });

  return (
    <View className={cn("w-full gap-1.5", className)}>
      {label ? (
        <Text
          className="font-display-medium text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={TIGHT}
        >
          {label}
        </Text>
      ) : null}

      <View
        accessibilityRole="radiogroup"
        onLayout={(event) => {
          width.value = event.nativeEvent.layout.width;
        }}
        className={`relative h-10 flex-row items-center rounded-xl border border-brand-100
          bg-[#EBECFA] px-0.5 py-px dark:border-grey-500 dark:bg-snow-300/[0.04]`}
      >
        <Animated.View
          pointerEvents="none"
          className="absolute bottom-0.5 left-[3px] top-0.5 rounded-xl border border-brand-300 bg-brand-400"
          style={indicatorStyle}
        />

        {options.map((option) => {
          const selected = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onValueChange(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              className="h-9 flex-1 items-center justify-center rounded-xl border border-transparent px-3"
            >
              <Text
                numberOfLines={1}
                className={cn(
                  "font-display-regular text-sm leading-5",
                  selected ? "text-white" : "text-ink-400 dark:text-grey-100"
                )}
                style={TIGHT}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

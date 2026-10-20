import { useEffect, useState, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
const DURATION = 200;

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

  const progress = useSharedValue(isOpen ? 1 : 0);
  const contentHeight = useSharedValue(0);

  useEffect(() => {
    progress.set(withTiming(isOpen ? 1 : 0, { duration: DURATION }));
  }, [isOpen, progress]);

  const bodyStyle = useAnimatedStyle(() => ({
    height: contentHeight.get() * progress.get(),
    opacity: progress.get(),
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.get() * 180}deg` }],
  }));

  const toggle = () => {
    if (open === undefined) setInternal(!isOpen);
    onOpenChange?.(!isOpen);
  };

  return (
    <View
      className={cn(
        "p-3 rounded-xl border border-brand-100 dark:border-grey-500",
        "bg-[rgba(205,207,229,0.22)] dark:bg-grey-800",
        className
      )}
    >
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className="flex-row items-center gap-2.5"
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
        <Animated.View style={chevronStyle}>
          <ChevronDown
            width={16}
            height={16}
            className="text-ink-400 dark:text-grey-100"
          />
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[{ overflow: "hidden" }, bodyStyle]}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <View
          className="absolute inset-x-0 top-0"
          onLayout={(e) => contentHeight.set(e.nativeEvent.layout.height)}
        >
          <View className="mt-3 border-t border-brand-100 pt-2.5 dark:border-grey-500">
            {children}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

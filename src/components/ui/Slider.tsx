import { useEffect, useRef, useState } from "react";
import { PanResponder, Text, View } from "react-native";

import { cn } from "@/lib/utils";

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  showEndValues?: boolean;
  minLabel?: string;
  maxLabel?: string;
  disabled?: boolean;
  className?: string;
};

const THUMB_WIDTH = 3;
const TIGHT = { letterSpacing: -0.084 };

export default function Slider({
  value,
  onValueChange,
  label,
  min = 0,
  max = 100,
  step = 1,
  showEndValues = true,
  minLabel,
  maxLabel,
  disabled = false,
  className,
}: SliderProps) {
  const [width, setWidth] = useState(0);
  const startX = useRef(0);

  const range = max - min;
  const ratio = range > 0 ? Math.min(Math.max((value - min) / range, 0), 1) : 0;
  const fillWidth = ratio * width;

  const setFromX = (x: number) => {
    if (!width || disabled) return;
    const raw = min + (Math.min(Math.max(x, 0), width) / width) * range;
    const stepped = min + Math.round((raw - min) / step) * step;
    const next = Math.min(max, Math.max(min, stepped));
    if (next !== value) onValueChange(next);
  };

  const latest = useRef(setFromX);
  useEffect(() => {
    latest.current = setFromX;
  });

  const [pan] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        startX.current = e.nativeEvent.locationX;
        latest.current(startX.current);
      },
      onPanResponderMove: (_, g) => latest.current(startX.current + g.dx),
    })
  );

  const nudge = (direction: 1 | -1) =>
    onValueChange(Math.min(max, Math.max(min, value + direction * step)));

  return (
    <View className={cn("w-full gap-2", disabled && "opacity-20", className)}>
      {label ? (
        <Text
          className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
          style={TIGHT}
        >
          {label}
        </Text>
      ) : null}

      <View className="gap-0.5">
        <View
          className="h-3 w-full justify-center"
          hitSlop={{ top: 16, bottom: 16 }}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          accessibilityRole="adjustable"
          accessibilityLabel={label}
          accessibilityValue={{ min, max, now: value }}
          accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
          onAccessibilityAction={(e) =>
            nudge(e.nativeEvent.actionName === "increment" ? 1 : -1)
          }
          {...pan.panHandlers}
        >
          <View
            pointerEvents="none"
            className="h-1.5 w-full rounded-full bg-[rgba(4,17,174,0.16)] dark:bg-[rgba(70,73,255,0.22)]"
          >
            <View
              className="h-full rounded-l-full bg-brand-100 dark:bg-brand-400"
              style={{ width: fillWidth }}
            />
          </View>
          <View
            pointerEvents="none"
            className="absolute h-3 rounded-sm bg-brand-100 dark:bg-brand-400"
            style={{
              width: THUMB_WIDTH,
              left: Math.min(
                Math.max(fillWidth - THUMB_WIDTH / 2, 0),
                Math.max(width - THUMB_WIDTH, 0)
              ),
            }}
          />
        </View>

        {showEndValues ? (
          <View className="flex-row justify-between gap-2">
            <Text
              className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
              style={TIGHT}
            >
              {minLabel ?? min}
            </Text>
            <Text
              className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
              style={TIGHT}
            >
              {maxLabel ?? max}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

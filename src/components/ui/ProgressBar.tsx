import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { gradients } from "@/lib/gradients";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number; // 0 to 1
  className?: string;
};

const STRIPES = Array.from({ length: 32 });
const SHADOW = { boxShadow: "0 1px 4px rgba(0,0,0,0.12)" };
const STRIPE_LAYER = { width: 357, height: 51, left: -31, top: -5 } as const;
const STRIPE = { transform: [{ rotate: "36.54deg" }] };
const FILL = { height: "100%", borderRadius: 10 } as const;

export default function ProgressBar({ value, className }: ProgressBarProps) {
  const pct = Math.min(Math.max(value, 0), 1) * 100;
  const g = gradients.linear01;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      className={cn(
        "h-2 w-full rounded-full bg-snow-500 dark:bg-[rgba(161,161,161,0.4)]",
        className
      )}
      style={SHADOW}
    >
      <View className="size-full overflow-hidden rounded-full">
        <View
          pointerEvents="none"
          className="absolute flex-row items-center justify-between opacity-40"
          style={STRIPE_LAYER}
        >
          {STRIPES.map((_, i) => (
            <View
              key={i}
              className="h-[60px] w-1 bg-[rgba(157,180,255,0.28)] dark:bg-[rgba(161,161,161,0.4)]"
              style={STRIPE}
            />
          ))}
        </View>
        <LinearGradient
          colors={g.colors}
          start={g.start}
          end={g.end}
          style={[FILL, { width: `${pct}%` }]}
        />
      </View>
    </View>
  );
}

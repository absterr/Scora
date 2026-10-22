import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function GenerateStatus({ label }: { label: string }) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      <View className="flex-row items-center gap-1">
        <AnimatedDot delay={0} />
        <AnimatedDot delay={200} />
        <AnimatedDot delay={400} />
      </View>

      <Text className="flex-1 font-display-regular text-xs text-snow-800">
        {label}
      </Text>
    </View>
  );
}

const AnimatedDot = ({ delay }: { delay: number }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, [delay, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.35, 1]),
  }));

  return (
    <Animated.View
      className="size-1.5 rounded-full bg-snow-900 dark:bg-grey-100"
      style={style}
    />
  );
};

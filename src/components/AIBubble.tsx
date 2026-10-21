import { useEffect } from "react";
import { View, type ImageSourcePropType } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function AIBubble({
  source,
  className,
  origin = "50% 30%",
}: {
  source: ImageSourcePropType;
  className?: string;
  origin?: string;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(
      withRepeat(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
  }, [progress]);

  const pulse = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.get(), [0, 1], [1, 1.06]) }],
  }));

  return (
    <View className={className}>
      <Animated.Image
        source={source}
        style={[
          { width: "100%", height: "100%", transformOrigin: origin },
          pulse,
        ]}
      />
    </View>
  );
}

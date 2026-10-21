import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function AIBubble() {
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
    <View className="h-[294px] w-[180px]">
      <Animated.Image
        source={require("@/assets/images/ai-bubble-two.png")}
        style={[
          { width: "100%", height: "100%", transformOrigin: "50% 30%" },
          pulse,
        ]}
      />
    </View>
  );
}

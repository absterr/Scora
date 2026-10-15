import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ToggleSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const TRAVEL = 16;
const ON_COLOR = "#5B66C6";
const OFF_COLOR = { light: "#B3B8E5", dark: "#5F5F5F" };
const TRACK = { width: 36, height: 20, borderRadius: 10, padding: 2 };
const THUMB = {
  width: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: "#FFFFFF",
  boxShadow: "0 1px 3px rgba(16,24,40,0.1), 0 1px 2px rgba(16,24,40,0.06)",
};

export default function ToggleSwitch({
  value,
  onValueChange,
}: ToggleSwitchProps) {
  const { colorScheme } = useColorScheme();
  const progress = useSharedValue(value ? 1 : 0);
  const offColor = colorScheme === "dark" ? OFF_COLOR.dark : OFF_COLOR.light;

  useEffect(() => {
    progress.set(withTiming(value ? 1 : 0, { duration: 150 }));
  }, [value, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.get(),
      [0, 1],
      [offColor, ON_COLOR]
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.get() * TRAVEL }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
    >
      <Animated.View style={[TRACK, trackStyle]}>
        <Animated.View style={[THUMB, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

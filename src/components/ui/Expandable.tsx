import { useEffect, type ReactNode } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ExpandableProps = { open: boolean; children: ReactNode };

const DURATION = 200;

export default function Expandable({ open, children }: ExpandableProps) {
  const progress = useSharedValue(open ? 1 : 0);
  const contentHeight = useSharedValue(0);

  useEffect(() => {
    progress.set(withTiming(open ? 1 : 0, { duration: DURATION }));
  }, [open, progress]);

  const style = useAnimatedStyle(() => ({
    height: contentHeight.get() * progress.get(),
    opacity: progress.get(),
  }));

  return (
    <Animated.View
      style={[{ overflow: "hidden" }, style]}
      pointerEvents={open ? "auto" : "none"}
    >
      <View
        className="absolute inset-x-0 top-0"
        onLayout={(e) => contentHeight.set(e.nativeEvent.layout.height)}
      >
        {children}
      </View>
    </Animated.View>
  );
}

import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Loading } from "@/components/icons/line";
import Button from "@/components/ui/Button";

export default function PendingCard({
  isHost = false,
  onClose,
}: {
  isHost?: boolean;
  onClose: () => void;
}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.set(
      withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      )
    );
  }, [rotation]);

  const spin = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.get()}deg` }],
  }));

  return (
    <View
      className={`items-center gap-4 p-3 rounded-xl border border-brand-100
        bg-[#EBECFA] dark:border-card-stroke dark:bg-grey-700`}
    >
      <Animated.View style={spin}>
        <Loading
          width={32}
          height={32}
          className="text-brand-400 dark:text-snow-600"
        />
      </Animated.View>
      <View className="w-full gap-1.5">
        <Text
          className="text-center font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
          style={{ letterSpacing: -0.084 }}
        >
          {isHost ? "Creating" : "Joining"}
        </Text>
        <Text className="text-center font-display-regular text-xs text-ink-400 dark:text-grey-100">
          Please wait, your meeting will begin shortly.
        </Text>
      </View>
      <Button
        variant="accent"
        label="Close"
        onPress={onClose}
        className="w-full"
      />
    </View>
  );
}

import { Pressable, Text, View } from "react-native";

import { ChevronLeft } from "@/components/icons/line";

export default function ModalTopbar({
  onBack,
  onSkip,
}: {
  onBack?: () => void;
  onSkip?: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between">
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={14}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ChevronLeft
            width={16}
            height={16}
            className="text-ink-400 dark:text-grey-100"
          />
        </Pressable>
      ) : (
        <View />
      )}
      {onSkip ? (
        <Pressable onPress={onSkip} hitSlop={14} accessibilityRole="button">
          <Text
            className="font-display-medium text-sm text-ink-400 dark:text-grey-100"
            style={{ letterSpacing: 0.42 }}
          >
            Skip
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

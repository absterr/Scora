import { Pressable, Text, View } from "react-native";

import { ChevronLeft } from "@/components/icons/line";

type ModalTopBarProps = {
  onBack?: () => void;
  onSkip?: () => void;
  backText?: string;
};

export default function ModalTopBar({
  onBack,
  onSkip,
  backText,
}: ModalTopBarProps) {
  return (
    <View className="flex-row items-center justify-between">
      {onBack || backText ? (
        <View>
          {onBack && (
            <Pressable
              onPress={onBack}
              hitSlop={14}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="flex-row gap-1 items-center"
            >
              <ChevronLeft
                width={16}
                height={16}
                className="text-ink-400 dark:text-grey-100"
              />
              {backText && (
                <Text
                  className="font-display-medium text-sm text-ink-500 dark:text-snow-600"
                  style={{ letterSpacing: 0.42 }}
                >
                  {backText}
                </Text>
              )}
            </Pressable>
          )}
        </View>
      ) : (
        <View />
      )}
      {onSkip && (
        <Pressable onPress={onSkip} hitSlop={14} accessibilityRole="button">
          <Text
            className="font-display-medium text-sm text-ink-400 dark:text-grey-100"
            style={{ letterSpacing: 0.42 }}
          >
            Skip
          </Text>
        </Pressable>
      )}
    </View>
  );
}

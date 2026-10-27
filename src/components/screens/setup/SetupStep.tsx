import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { ChevronLeft } from "@/components/icons/line";
import Button from "@/components/ui/Button";

export type StepActions = {
  onBack?: () => void;
  onSkip: () => void;
  onNext: () => void;
};

type SetupStepProps = StepActions & {
  nextDisabled?: boolean;
  children: ReactNode;
};

export default function SetupStep({
  onBack,
  onSkip,
  onNext,
  nextDisabled,
  children,
}: SetupStepProps) {
  return (
    <View className="flex-1 gap-6">
      <View className="flex-row items-center justify-between">
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={16}
            accessibilityRole="button"
            accessibilityLabel="Back"
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
        <Pressable onPress={onSkip} hitSlop={16} accessibilityRole="button">
          <Text
            className="font-display-medium text-sm text-ink-400 dark:text-grey-100"
            style={{ letterSpacing: 0.42 }}
          >
            Skip
          </Text>
        </Pressable>
      </View>

      <View className="flex-1 justify-center">{children}</View>

      <Button label="Next" onPress={onNext} disabled={nextDisabled} />
    </View>
  );
}

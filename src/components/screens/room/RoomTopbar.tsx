import { Pressable, Text, View } from "react-native";

import { AppLogo } from "@/components/icons/app";
import { CameraReverse, ChevronLeft } from "@/components/icons/line";

type MeetingTopBarProps = {
  onBack: () => void;
  onEnd: () => void;
};

const MUTED = "text-ink-400 dark:text-grey-100";

export default function RoomTopbar({ onBack, onEnd }: MeetingTopBarProps) {
  return (
    <View
      className={`h-[52px] flex-row items-center justify-between gap-2 px-4
        rounded-xl border border-brand-100 bg-[rgba(205,207,229,0.22)]
        dark:border-card-stroke dark:bg-grey-700`}
    >
      <Pressable
        onPress={onBack}
        hitSlop={14}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <ChevronLeft width={16} height={16} className={MUTED} />
      </Pressable>

      <View className="flex-row items-center gap-6">
        <AppLogo
          width={79}
          height={20}
          className="text-brand-400 dark:text-snow-600"
        />
        <Pressable
          onPress={onEnd}
          accessibilityRole="button"
          className="h-7 items-center justify-center px-4 rounded-lg border border-error-600 bg-error-500"
        >
          <Text
            className="font-display-medium text-xs text-snow-500"
            style={{ letterSpacing: 0.24 }}
          >
            End Meeting
          </Text>
        </Pressable>
      </View>

      <Pressable
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Switch camera"
      >
        <CameraReverse width={24} height={24} className={MUTED} />
      </Pressable>
    </View>
  );
}

import { Image, Pressable, Text, View } from "react-native";

import { DotsHorizontal } from "@/components/icons/solid";
import { AVATARS } from "@/lib/avatars";
import { SPEAKERS } from "@/lib/mock-room";

export default function SpeakerTab() {
  return (
    <View className="gap-3">
      <Text
        className="font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600"
        style={{ letterSpacing: -0.084 }}
      >
        Members List
      </Text>
      <View className="gap-2">
        {SPEAKERS.map((s) => (
          <View key={s.id} className="flex-row items-center gap-3 py-1">
            <Image source={AVATARS[s.avatar]} className="size-9 rounded-full" />
            <View className="flex-1">
              <Text
                className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
                style={{ letterSpacing: -0.084 }}
              >
                {s.name}
              </Text>
              <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
                {s.email}
              </Text>
            </View>
            <Pressable
              hitSlop={9}
              accessibilityRole="button"
              accessibilityLabel={`Actions for ${s.name}`}
              className={`size-[26px] items-center justify-center rounded-lg border
               border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-700`}
            >
              <DotsHorizontal
                width={14}
                height={14}
                className="text-ink-500 dark:text-snow-600"
              />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

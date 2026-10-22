import * as Clipboard from "expo-clipboard";
import { Pressable, Text, View } from "react-native";

import { Copy } from "@/components/icons/line";
import { MagicWandSolid } from "@/components/icons/solid";
import GenerateStatus from "@/components/screens/room/GenerateStatus";
import { KEY_POINTS } from "@/lib/mock-room";

const STRONG = "text-ink-500 dark:text-snow-600";
const MUTED = "text-ink-400 dark:text-grey-100";

export default function KeyPointsCard() {
  const copy = () =>
    Clipboard.setStringAsync(
      KEY_POINTS.map((p) => `${p.title}\n${p.detail}`).join("\n\n")
    );

  return (
    <View
      className={`rounded-xl border border-brand-100 bg-[rgba(205,207,229,0.22)]
       dark:border-card-stroke dark:bg-grey-700`}
    >
      <View className="flex-row items-center gap-4 border-b border-brand-100 p-3 dark:border-card-stroke">
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <MagicWandSolid width={16} height={16} className={STRONG} />
            <Text
              className={`font-display-regular text-sm leading-5 ${STRONG}`}
              style={{ letterSpacing: -0.084 }}
            >
              Key Points
            </Text>
          </View>
          <Text className={`font-display-regular text-xs ${MUTED}`}>
            Your meeting insights at a glance.
          </Text>
        </View>
        <Pressable
          onPress={copy}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Copy key points"
        >
          <Copy width={16} height={16} className={MUTED} />
        </Pressable>
      </View>

      <View className="gap-4 px-3 pb-3 pt-3">
        <View className="gap-1">
          <Text className={`font-display-regular text-xs ${STRONG}`}>
            Responsibility
          </Text>
          {KEY_POINTS.map((p) => (
            <View key={p.title} className="flex-row gap-1.5">
              <Text className={`font-display-regular text-xs ${STRONG}`}>
                •
              </Text>
              <Text className={`flex-1 font-display-regular text-xs ${STRONG}`}>
                {p.title}
                {"\n"}
                {p.detail}
              </Text>
            </View>
          ))}
        </View>
        <GenerateStatus label="Generate more" />
      </View>
    </View>
  );
}

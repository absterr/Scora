import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AIBubble from "@/components/AIBubble";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";

export default function Intro() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center px-6"
      style={{ paddingTop: insets.top + 40, paddingBottom: insets.bottom + 18 }}
    >
      <Logo />

      <View className="flex-1 items-center justify-center">
        <AIBubble />
      </View>

      <View className="w-full gap-8">
        <View className="gap-2.5">
          <Text className="text-center font-display-medium text-xl leading-none text-ink-500 dark:text-snow-600">
            AI Meeting
          </Text>
          <Text
            className="text-center font-display-regular text-base leading-6 text-ink-400 dark:text-grey-100"
            style={{ letterSpacing: -0.128 }}
          >
            Record conversations, get instant transcripts, and smart summaries
            to keep everyone aligned.
          </Text>
        </View>

        <Button label="Get started" />
      </View>
    </View>
  );
}

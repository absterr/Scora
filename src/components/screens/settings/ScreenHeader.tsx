import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { ChevronLeft } from "@/components/icons/line";

const TIGHT = { letterSpacing: -0.084 };

export default function ScreenHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <View className="gap-1">
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="flex-row items-center gap-1.5"
      >
        <ChevronLeft
          width={16}
          height={16}
          className="text-ink-400 dark:text-grey-100"
        />
        <Text className="flex-1 font-display-medium text-xl leading-6 text-ink-500 dark:text-snow-600">
          {title}
        </Text>
      </Pressable>
      <Text
        className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
        style={TIGHT}
      >
        {description}
      </Text>
    </View>
  );
}

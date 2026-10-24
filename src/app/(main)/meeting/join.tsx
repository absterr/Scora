import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function JoinWithLink() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const [link, setLink] = useState("");

  return (
    <ScrollView
      contentContainerClassName="gap-4 px-6 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-1">
        <Text className="font-display-medium text-xl leading-6 text-ink-500 dark:text-snow-600">
          Join with link
        </Text>
        <Text
          className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={{ letterSpacing: -0.084 }}
        >
          Just drop your link below to join.
        </Text>
      </View>

      <View
        className={`h-10 px-3 justify-center rounded-xl border border-dashed
          border-brand-100 bg-[#EBECFA] dark:border-card-stroke dark:bg-grey-700`}
      >
        <TextInput
          value={link}
          onChangeText={setLink}
          placeholder="Paste meeting link"
          placeholderTextColor={colorScheme === "dark" ? "#BCBCBC" : "#404040"}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          accessibilityLabel="Meeting link"
          onSubmitEditing={() => {
            if (link.trim())
              router.push({ pathname: "/meeting", params: { role: "guest" } });
          }}
          className="p-0 font-display-regular text-xs text-ink-500 dark:text-snow-600"
        />
      </View>
    </ScrollView>
  );
}

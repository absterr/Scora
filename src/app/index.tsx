import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 flex-col justify-center">
      <View className="w-full gap-y-4">
        <Text className="text-center text-ink-400 dark:text-grey-100">
          Edit src/app/index.tsx to edit this screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}

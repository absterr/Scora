import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/ui/Button";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 flex-col justify-center">
      <View className="w-full gap-y-4">
        <Text className="text-center">
          Edit src/app/index.tsx to edit this screen.
        </Text>
        <Button label="Say hi" />
      </View>
    </SafeAreaView>
  );
}

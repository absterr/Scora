import RadioButton from "@/components/ui/RadioButton";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [selected, setSelected] = useState(false);

  return (
    <SafeAreaView className="flex-1 flex-col justify-center">
      <View className="w-full gap-y-4">
        <Text className="text-center text-ink-400 dark:text-grey-100">
          Edit src/app/index.tsx to edit this screen.
        </Text>

        <RadioButton
          label="Spain"
          selected={selected}
          onPress={() => setSelected(!selected)}
        />
      </View>
    </SafeAreaView>
  );
}

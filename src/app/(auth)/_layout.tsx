import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "@/components/Logo";

export default function AuthLayout() {
  const insets = useSafeAreaInsets();
  const top = insets.top + 40;

  return (
    <View className="flex-1 items-center" style={{ paddingTop: top }}>
      <Logo />
      <View className="w-full flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </View>
    </View>
  );
}

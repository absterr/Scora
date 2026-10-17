import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "@/components/Logo";

const LOGO_HEIGHT = 28;

export default function AuthLayout() {
  const insets = useSafeAreaInsets();
  const top = insets.top + 40;

  return (
    <View className="flex-1 items-center" style={{ paddingTop: top }}>
      <Logo />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={top + LOGO_HEIGHT}
        className="w-full flex-1"
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

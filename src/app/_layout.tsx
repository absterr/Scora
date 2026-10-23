import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Image, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ModalProvider } from "@/components/ui/Modal";
import "../global.css";
import "../lib/svg-interop";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "InterDisplay-Medium": require("@/assets/fonts/InterDisplay-Medium.ttf"),
    "InterDisplay-Regular": require("@/assets/fonts/InterDisplay-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const background =
    colorScheme === "dark"
      ? require("@/assets/images/dark-gradient-bg.png")
      : require("@/assets/images/light-gradient-bg.png");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ModalProvider>
          <View className="flex-1 bg-snow-500 dark:bg-ink-800">
            <Image
              source={background}
              resizeMode="cover"
              style={{
                width: "100%",
                aspectRatio: 375 / 443,
                position: "absolute",
                top: 0,
              }}
            />

            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: "transparent",
                },
              }}
            />
          </View>
        </ModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import "../lib/svg-interop";

export default function RootLayout() {
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

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}

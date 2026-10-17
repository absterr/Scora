import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "@/components/Logo";
import NotchedPanel from "@/components/NotchedPanel";
import PhonePreview from "@/components/screens/auth/PhonePreview";
import NotificationRow from "@/components/screens/intro/NotificationRow";
import Button from "@/components/ui/Button";

const FADE = {
  light: { color: "#FFFFFF", end: 0.7178 },
  dark: { color: "#1F1F1F", end: 0.6707 },
};

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const { color, end } = FADE[colorScheme === "dark" ? "dark" : "light"];

  return (
    <View
      className="flex-1 items-center gap-10"
      style={{ paddingTop: insets.top + 40 }}
    >
      <Logo />

      <View className="w-full flex-1 px-1 pb-1">
        <NotchedPanel
          className="flex-1"
          bottomRadius={40}
          light={{ fill: "rgba(234,235,255,0.4)" }}
          dark={{ fill: "#161616", stroke: "#333333" }}
        >
          <View className="flex-1 gap-6 px-3 pt-10 dark:gap-8">
            <View className="h-[396px] overflow-hidden rounded-2xl border border-brand-100 bg-white dark:border-transparent dark:bg-snow-300/[0.04]">
              <View className="absolute inset-x-0 top-5 items-center">
                <PhonePreview />
              </View>

              <LinearGradient
                pointerEvents="none"
                colors={[`${color}00`, color]}
                locations={[0.2962, end]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 11,
                  height: 504,
                }}
              />

              <View className="absolute inset-x-3 bottom-[19px] items-center gap-5">
                <View className="w-full gap-2">
                  <NotificationRow
                    title="AI Meeting starting soon"
                    time="Now"
                    description="Your Scora AI meeting begins in 10 minutes."
                    className="dark:bg-grey-500"
                  />
                  <View className="w-full px-3">
                    <NotificationRow
                      title="You’re invited"
                      time="3 Mins ago"
                      description="Tap to join and collaborate live!"
                      className="dark:bg-grey-500"
                    />
                  </View>
                </View>
                <Text
                  className="w-[255px] text-center font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600"
                  style={{ letterSpacing: -0.084 }}
                >
                  Making every meeting smarter and collaboration seamless.
                </Text>
              </View>
            </View>

            <View className="gap-2">
              <Button
                label="Create Account"
                className="h-[42px]"
                onPress={() => router.push("/signup")}
              />
              <Button
                label="Sign in"
                variant="ghost"
                className="h-[42px]"
                onPress={() => router.push("/login")}
              />
            </View>
          </View>
        </NotchedPanel>
      </View>
    </View>
  );
}

import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Apple, Facebook, Google } from "@/components/icons/social";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";

const PROVIDERS = [
  { label: "Sign in with Apple", Icon: Apple, onPress: () => {} },
  { label: "Sign in with Facebook", Icon: Facebook, onPress: () => {} },
  { label: "Sign in with Google", Icon: Google, onPress: () => {} },
];

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <ScrollView
      contentContainerClassName="grow justify-between gap-[54px] px-6 pt-16"
      contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-8">
        <View className="gap-10">
          <View className="w-full items-center gap-3">
            <Text className="text-center font-display-medium text-xl leading-none text-ink-500 dark:text-snow-600">
              Welcome Back
            </Text>
            <Text
              className="text-center font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
              style={{ letterSpacing: -0.084 }}
            >
              Access your account to continue where you left off.
            </Text>
          </View>

          <View className="gap-4">
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="e.g., jack@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="Password"
              isPassword
              value={password}
              onChangeText={setPassword}
              placeholder="e.g., sij@ck2025"
              autoCapitalize="none"
              autoComplete="current-password"
            />
            <View className="flex-row items-center justify-between gap-4">
              <Checkbox
                label="Remember me"
                checked={remember}
                onChange={setRemember}
                className="flex-1"
              />
              <Pressable accessibilityRole="link" hitSlop={12}>
                <Text
                  className="font-display-regular text-sm leading-5 text-snow-900"
                  style={{ letterSpacing: -0.084 }}
                >
                  Forgot password?
                </Text>
              </Pressable>
            </View>
            <Button label="Sign in" />
          </View>
        </View>
        <SocialButtons />
      </View>

      <Pressable
        accessibilityRole="link"
        hitSlop={12}
        onPress={() => router.replace("/signup")}
      >
        <Text
          className="text-center font-display-regular text-sm text-snow-900 leading-5"
          style={{ letterSpacing: -0.084 }}
        >
          Don&apos;t have an account?{" "}
          <Text className="font-display-medium text-ink-500 dark:text-snow-600">
            Sign up
          </Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const SocialButtons = () => (
  <View className="gap-3">
    {PROVIDERS.map(({ label, Icon, onPress }) => (
      <Pressable
        key={label}
        onPress={onPress}
        className={`h-10 flex-row items-center justify-center gap-2 rounded-xl
            border border-snow-600 bg-[rgba(234,235,255,0.16)] px-4 dark:border-grey-500 dark:bg-grey-800`}
      >
        <Icon width={18} height={18} className="text-ink-500 dark:text-white" />
        <Text className="font-inter-medium text-base leading-6 text-ink-500 dark:text-white">
          {label}
        </Text>
      </Pressable>
    ))}
  </View>
);

import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Apple, Facebook, Google } from "@/components/icons/social";
import AuthHeader from "@/components/screens/auth/AuthHeader";
import AuthScreen from "@/components/screens/auth/AuthScreen";
import AuthSwitch from "@/components/screens/auth/AuthSwitch";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <AuthScreen className="justify-between gap-[54px]">
      <View className="gap-8">
        <View className="gap-10">
          <AuthHeader
            title="Welcome Back"
            subtitle="Access your account to continue where you left off."
          />

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

      <AuthSwitch
        prompt="Don't have an account?"
        action="Sign up"
        className="text-snow-900"
        onPress={() => router.replace("/signup")}
      />
    </AuthScreen>
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

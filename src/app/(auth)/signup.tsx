import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import {
  getPasswordStrength,
  isValidEmail,
  type PasswordStrength,
} from "@/lib/validation";

type Hint = { message: string; tone: "neutral" | "error" };

// \u2014 is the em dash used in the design copy
const HINTS: Partial<Record<PasswordStrength, Hint>> = {
  empty: {
    message:
      "Let's lock it down with a strong password \u2014 mix letters, numbers, and symbols.",
    tone: "neutral",
  },
  almost: {
    message:
      "Looking good \u2014 but try adding an uppercase letter to make it bulletproof.",
    tone: "neutral",
  },
  weak: {
    message: "Your password needs some muscle. Add variety to make it tougher.",
    tone: "error",
  },
};

export default function Signup() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const strength = getPasswordStrength(password);
  const hint =
    strength === "empty" && !passwordFocused ? undefined : HINTS[strength];
  const emailError =
    emailTouched && !isValidEmail(email)
      ? "Enter your email in the format: name@example.com"
      : undefined;
  const canSubmit =
    username.trim().length > 0 &&
    isValidEmail(email) &&
    (strength === "almost" || strength === "strong") &&
    agreed;

  return (
    <ScrollView
      contentContainerClassName="grow gap-10 px-6 pt-16"
      contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full items-center gap-3">
        <Text className="text-center font-display-medium text-xl leading-none text-ink-500 dark:text-snow-600">
          Get Started for Free
        </Text>
        <Text
          className="text-center font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={{ letterSpacing: -0.084 }}
        >
          Unlock AI-powered tools to capture and organize your meetings
          effortlessly.
        </Text>
      </View>

      <View className="gap-4">
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="e.g., jack"
          autoCorrect={false}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setEmailTouched(true)}
          error={emailError}
          placeholder="e.g., jack@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View className="gap-2">
          <Input
            label="Password"
            isPassword
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            invalid={hint?.tone === "error"}
            placeholder="e.g., sij@ck2025"
            autoCapitalize="none"
            autoComplete="new-password"
          />
          {hint ? (
            <PasswordHint tone={hint.tone}>{hint.message}</PasswordHint>
          ) : null}
        </View>
        <Checkbox
          label="I agree to the Terms & Conditions and Privacy Policy."
          checked={agreed}
          onChange={setAgreed}
        />
      </View>

      <View className="gap-2">
        <Button
          label="Create Account"
          className="h-[42px]"
          disabled={!canSubmit}
          onPress={() => router.push("/verify-email")}
        />
        <Pressable
          accessibilityRole="link"
          hitSlop={12}
          onPress={() => router.replace("/login")}
        >
          <Text
            className="text-center font-display-regular text-sm text-snow-900 leading-5"
            style={{ letterSpacing: -0.084 }}
          >
            Already have an account?{" "}
            <Text className="font-display-medium text-ink-500 dark:text-snow-600">
              Login
            </Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

type PasswordHintProps = { tone?: "neutral" | "error"; children: ReactNode };
// brand-200 (neutral), error-500 (error)
const TONE_COLOR = { neutral: "#8E96D8", error: "#F04438" };

const PasswordHint = ({ tone = "neutral", children }: PasswordHintProps) => {
  const color = TONE_COLOR[tone];

  return (
    <View className="flex-row items-center gap-2">
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Circle
          cx={9}
          cy={9}
          r={7.875}
          stroke={color}
          strokeOpacity={0.1}
          strokeWidth={1.5}
        />
        <Path
          d="M10.37 1.25A7.875 7.875 0 0 0 2.97 3.94"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </Svg>
      <Text
        className="flex-1 font-display-regular text-sm leading-5 text-snow-900 dark:text-snow-600"
        style={{ letterSpacing: -0.084 }}
      >
        {children}
      </Text>
    </View>
  );
};

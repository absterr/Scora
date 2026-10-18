import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

import AuthHeader from "@/components/screens/auth/AuthHeader";
import AuthScreen from "@/components/screens/auth/AuthScreen";
import AuthSwitch from "@/components/screens/auth/AuthSwitch";
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
    <AuthScreen className="gap-10">
      <AuthHeader
        title="Get Started for Free"
        subtitle="Unlock AI-powered tools to capture and organize your meetings effortlessly."
      />

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
          onPress={() =>
            router.push({
              pathname: "/verify-email",
              params: { email: email.trim() },
            })
          }
        />

        <AuthSwitch
          prompt="Already have an account?"
          action="Login"
          className="text-snow-900"
          onPress={() => router.replace("/login")}
        />
      </View>
    </AuthScreen>
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

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import AuthHeader from "@/components/screens/auth/AuthHeader";
import AuthScreen from "@/components/screens/auth/AuthScreen";
import AuthSwitch from "@/components/screens/auth/AuthSwitch";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import OTPInput from "@/components/ui/OTPInput";
import { formatCountdown, useCountdown } from "@/lib/use-countdown";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 180;
const BOX_SHADOW = { boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.08)" };

export default function VerifyEmail() {
  const router = useRouter();
  const { email = "" } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState("");
  const [resent, setResent] = useState(false);
  const { remaining, start } = useCountdown();

  const resend = () => {
    if (remaining > 0) return;
    setCode("");
    setResent(true);
    start(RESEND_COOLDOWN);
  };

  return (
    <AuthScreen className="gap-10 pt-20">
      <AuthHeader
        title={resent ? "New Code Is On the Way" : "Your Code Is On the Way"}
        subtitle={
          resent
            ? "We’ve sent a one-time code to your registered contact."
            : "Check your email and paste the 6-digit code here to keep going."
        }
      />

      <View className="gap-6">
        <View className="gap-4">
          <Alert>
            {"We sent a verification code to your email "}
            <Text className="text-ink-500 dark:text-snow-600">{email}</Text>
          </Alert>
          {remaining > 0 ? <CountdownBox seconds={remaining} /> : null}
          <OTPInput value={code} onChangeValue={setCode} length={CODE_LENGTH} />
        </View>
        <AuthSwitch
          prompt="You didn’t receive any code?"
          action="Resend Code"
          onPress={resend}
          className="text-left leading-[18px] text-snow-900"
        />
      </View>

      <View className="gap-2">
        <Button
          label="Continue"
          className="h-[42px]"
          disabled={code.length < CODE_LENGTH}
          onPress={() => {}}
        />
        <AuthSwitch
          prompt="Already have an account?"
          action="Login"
          className="text-ink-400 dark:text-grey-100"
          onPress={() => router.replace("/login")}
        />
      </View>
    </AuthScreen>
  );
}

const CountdownBox = ({ seconds }: { seconds: number }) => (
  <View
    className="rounded-xl border border-brand-100 bg-brand-50 p-3 dark:border-card-stroke dark:bg-snow-300/[0.02]"
    style={BOX_SHADOW}
  >
    <Text
      className="text-center font-display-medium text-[32px] leading-8 text-brand-400 dark:text-grey-100"
      style={{ fontVariant: ["tabular-nums"] }}
    >
      {formatCountdown(seconds)}
    </Text>
  </View>
);

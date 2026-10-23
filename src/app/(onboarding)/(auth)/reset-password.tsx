import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import AuthHeader from "@/components/screens/auth/AuthHeader";
import AuthScreen from "@/components/screens/auth/AuthScreen";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import { getPasswordStrength } from "@/lib/validation";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const strength = getPasswordStrength(password);
  const mismatch = confirm.length > 0 && confirm !== password;
  const canSubmit =
    (strength === "almost" || strength === "strong") &&
    confirm === password &&
    acknowledged;

  return (
    <AuthScreen className="gap-10">
      <AuthHeader
        title="Reset Your Password"
        subtitle="Create a new password to secure your account."
      />

      <View className="gap-10">
        <View className="gap-4">
          <Input
            label="New Password"
            isPassword
            value={password}
            onChangeText={setPassword}
            placeholder="Enter a new password"
            autoCapitalize="none"
            autoComplete="new-password"
          />
          <Input
            label="Retype Password"
            isPassword
            value={confirm}
            onChangeText={setConfirm}
            invalid={mismatch}
            placeholder="Retype your password"
            autoCapitalize="none"
            autoComplete="new-password"
          />
          <Alert size="sm" inline>
            Don’t reuse an exiting or previous password.
          </Alert>
          <Checkbox
            label="I understand that after updating my password, any login attempts from new devices may be restricted for up to 48 hours as a security precaution."
            checked={acknowledged}
            onChange={setAcknowledged}
          />
        </View>
        <Button
          label="Reset Password"
          disabled={!canSubmit}
          onPress={() => router.replace("/login")}
        />
      </View>
    </AuthScreen>
  );
}

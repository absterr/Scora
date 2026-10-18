import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { Image, Text, View } from "react-native";

import AuthHeader from "@/components/screens/auth/AuthHeader";
import AuthScreen from "@/components/screens/auth/AuthScreen";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";

const MAIL = {
  light: require("@/assets/images/mail-light.png"),
  dark: require("@/assets/images/mail-dark.png"),
};

export default function ForgotPassword() {
  const { email = "" } = useLocalSearchParams<{ email?: string }>();

  return (
    <AuthScreen className="gap-10">
      <View className="items-center gap-10">
        <MailArt />
        <View className="w-full gap-4">
          <AuthHeader
            title="Check Your Email"
            subtitle={
              <>
                {"If "}
                <Text className="text-brand-400 dark:text-brand-200">
                  {email}
                </Text>
                {
                  " is registered to a SCORA account, you will received an email containing instructions and a password reset link. Please remember to check your spam folder too."
                }
              </>
            }
          />
          <Alert size="sm">
            The verification code is valid for 10 minutes and can only be used
            once. If it expires, you’ll need to wait 24 hours before requesting
            a new code.
          </Alert>
        </View>
      </View>
      <Button label="Check Email" onPress={() => {}} />
    </AuthScreen>
  );
}

const MailArt = () => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="size-[120px] items-center justify-center">
      <Image
        source={MAIL[colorScheme === "dark" ? "dark" : "light"]}
        resizeMode="contain"
        className="size-[128px]"
      />
    </View>
  );
};

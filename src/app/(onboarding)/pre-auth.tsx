import { useRouter } from "expo-router";
import { View } from "react-native";

import NotchedPanel from "@/components/NotchedPanel";
import OnboardingSteps from "@/components/screens/pre-auth/OnboardingSteps";

const LIGHT = { fill: "#FFFFFF" };
const DARK = { fill: "#161616", stroke: "#333333" }; // grey-800, card-stroke

export default function PreAuth() {
  const router = useRouter();

  return (
    <View className="w-full flex-1 px-1 pb-1 pt-10">
      <NotchedPanel
        light={LIGHT}
        dark={DARK}
        bottomRadius={40}
        className="flex-1"
      >
        <OnboardingSteps onFinish={() => router.replace("/welcome")} />
      </NotchedPanel>
    </View>
  );
}

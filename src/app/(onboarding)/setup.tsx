import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import AvatarStep from "@/components/screens/setup/AvatarStep";
import NameStep from "@/components/screens/setup/NameStep";
import RegionStep from "@/components/screens/setup/RegionStep";
import StepFlow, { type StepDef } from "@/components/StepFlow";
import { Modal } from "@/components/ui/Modal";
import type { AvatarName } from "@/lib/avatars";

export default function Setup() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<AvatarName | null>(null);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<string>();
  const [timeZone, setTimeZone] = useState<string>();

  const steps: StepDef[] = [
    {
      key: "avatar",
      render: (nav) => (
        <AvatarStep
          selected={avatar}
          onSelect={setAvatar}
          onSkip={nav.goNext}
          onNext={nav.goNext}
        />
      ),
    },
    {
      key: "name",
      render: (nav) => (
        <NameStep
          avatar={avatar}
          name={name}
          onNameChange={setName}
          onBack={nav.goBack}
          onSkip={nav.goNext}
          onNext={nav.goNext}
        />
      ),
    },
    {
      key: "region",
      render: (nav) => (
        <RegionStep
          language={language}
          timeZone={timeZone}
          onLanguageChange={setLanguage}
          onTimeZoneChange={setTimeZone}
          onBack={nav.goBack}
          onSkip={nav.finish}
          onNext={nav.finish}
        />
      ),
    },
  ];

  return (
    <>
      <View className="flex-1" />
      <Modal visible onClose={() => {}}>
        <View className="h-[500px]">
          <StepFlow steps={steps} onFinish={() => router.replace("/meeting")} />
        </View>
      </Modal>
    </>
  );
}

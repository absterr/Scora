import { View } from "react-native";

import ProfileAvatar from "@/components/screens/profile/ProfileAvatar";
import SetupStep, {
  type StepActions,
} from "@/components/screens/setup/SetupStep";
import StepHeading from "@/components/screens/setup/StepHeading";
import Input from "@/components/ui/Input";
import { AVATARS, type AvatarName } from "@/lib/avatars";

type NameStepProps = StepActions & {
  avatar: AvatarName | null;
  name: string;
  onNameChange: (name: string) => void;
};

export default function NameStep({
  avatar,
  name,
  onNameChange,
  ...actions
}: NameStepProps) {
  return (
    <SetupStep {...actions} nextDisabled={!name.trim()}>
      <View className="items-center gap-6">
        <ProfileAvatar source={avatar ? AVATARS[avatar] : null} />
        <StepHeading
          title="What's Your Name?"
          subtitle="Set up what we should call you."
        />
        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={onNameChange}
          autoCapitalize="words"
          autoComplete="name"
        />
      </View>
    </SetupStep>
  );
}

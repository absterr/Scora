import { Text, View } from "react-native";

import AvatarGrid from "@/components/screens/profile/AvatarGrid";
import ProfileAvatar from "@/components/screens/profile/ProfileAvatar";
import SetupStep, {
  type StepActions,
} from "@/components/screens/setup/SetupStep";
import StepHeading from "@/components/screens/setup/StepHeading";
import { AVATARS, type AvatarName } from "@/lib/avatars";

type AvatarStepProps = StepActions & {
  selected: AvatarName | null;
  onSelect: (name: AvatarName | null) => void;
};

export default function AvatarStep({
  selected,
  onSelect,
  ...actions
}: AvatarStepProps) {
  return (
    <SetupStep {...actions}>
      <View className="items-center gap-6">
        <StepHeading
          title="Choose Photo Profile"
          subtitle="Choose an existing profile or create a new one"
        />
        <ProfileAvatar source={selected ? AVATARS[selected] : null} />
        <Text className="font-display-regular text-sm text-ink-500 dark:text-snow-600">
          or choose an avatar
        </Text>
        <AvatarGrid selected={selected} onSelect={onSelect} />
      </View>
    </SetupStep>
  );
}

import { Text, View } from "react-native";

import ProfileAvatar from "@/components/screens/settings/ProfileAvatar";
import Button from "@/components/ui/Button";
import { Modal, ModalTopbar } from "@/components/ui/Modal";
import { AVATARS, type AvatarName } from "@/lib/avatars";
import AvatarGrid from "./settings/AvatarGrid";

type AvatarPickerModalProps = {
  visible: boolean;
  onClose: () => void;
  selected: AvatarName | null;
  onSelect: (name: AvatarName | null) => void;
};

export default function AvatarPickerModal({
  visible,
  onClose,
  selected,
  onSelect,
}: AvatarPickerModalProps) {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      topBar={<ModalTopbar backText="Edit Photo Profile" onBack={onClose} />}
    >
      <View className="items-center gap-6">
        <ProfileAvatar source={selected ? AVATARS[selected] : null} />

        <View className="items-center gap-4">
          <View className="items-center gap-0.5">
            <Text
              className="text-center font-display-medium text-base leading-6 text-ink-500 dark:text-snow-600"
              style={{ letterSpacing: -0.176 }}
            >
              Edit Photo Profile
            </Text>
            <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
              250x250 / max 5mb
            </Text>
          </View>
          <Button size="sm" label="Attach Photo" />
        </View>

        <AvatarGrid selected={selected} onSelect={onSelect} />
      </View>
    </Modal>
  );
}

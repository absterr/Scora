import { Image, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import ProfileAvatar from "@/components/screens/settings/ProfileAvatar";
import Button from "@/components/ui/Button";
import { Modal, ModalTopbar } from "@/components/ui/Modal";
import { AVATARS, type AvatarName } from "@/lib/avatars";

type AvatarPickerModalProps = {
  visible: boolean;
  onClose: () => void;
  selected: AvatarName | null;
  onSelect: (name: AvatarName | null) => void;
};

const NAMES = Object.keys(AVATARS) as AvatarName[];
const ROWS = [NAMES.slice(0, 4), NAMES.slice(4, 8)];

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

        <View className="w-full gap-6">
          {ROWS.map((row, i) => (
            <View key={i} className="flex-row justify-between">
              {row.map((name) => (
                <AvatarOption
                  key={name}
                  name={name}
                  selected={name === selected}
                  onPress={() => onSelect(name === selected ? null : name)}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const AvatarOption = ({
  name,
  selected,
  onPress,
}: {
  name: AvatarName;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="radio"
    accessibilityState={{ checked: selected }}
    accessibilityLabel={name}
    className="size-[60px]"
  >
    <Image source={AVATARS[name]} className="size-full rounded-full" />
    {selected ? (
      <>
        <View
          pointerEvents="none"
          className="absolute inset-0 rounded-full border-2 border-white"
        />
        <View className="absolute right-0 top-1 size-4 items-center justify-center rounded-full bg-white">
          <Svg width={12} height={12} viewBox="0 0 14 14">
            <Path
              d="M3 7.5 5.8 10.2 11 4.5"
              stroke="#0A1BAA"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </>
    ) : null}
  </Pressable>
);

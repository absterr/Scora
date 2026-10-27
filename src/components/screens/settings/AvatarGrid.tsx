import { Image, Pressable, View } from "react-native";

import { Check } from "@/components/icons/line";
import { AVATARS, type AvatarName } from "@/lib/avatars";

type AvatarGridProps = {
  selected: AvatarName | null;
  onSelect: (name: AvatarName | null) => void;
};

const NAMES = Object.keys(AVATARS) as AvatarName[];
const ROWS = [NAMES.slice(0, 4), NAMES.slice(4, 8)];

export default function AvatarGrid({ selected, onSelect }: AvatarGridProps) {
  return (
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
          <Check className="text-brand-500" />
        </View>
      </>
    ) : null}
  </Pressable>
);

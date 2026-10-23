import { Image, Pressable, View, type ImageSourcePropType } from "react-native";

import { PlusCircle } from "@/components/icons/solid";

type ProfileAvatarProps = {
  source?: ImageSourcePropType | null;
  size?: number;
  onPress?: () => void;
};

export default function ProfileAvatar({
  source,
  size = 100,
  onPress,
}: ProfileAvatarProps) {
  const dimension = { width: size, height: size };

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel="Change profile photo"
    >
      {source ? (
        <Image source={source} className="rounded-full" style={dimension} />
      ) : (
        <View
          className={`items-center justify-center rounded-full border border-dashed
            border-brand-400 bg-[rgba(46,61,241,0.16)] dark:border-grey-500 dark:bg-grey-600`}
          style={dimension}
        >
          <PlusCircle
            width={24}
            height={24}
            className="text-brand-300 dark:text-brand-100"
          />
        </View>
      )}
    </Pressable>
  );
}

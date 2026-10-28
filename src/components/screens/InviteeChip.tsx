import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import Avatar from "@/components/ui/Avatar";

export default function InviteeChip({
  name,
  onRemove,
  className,
}: {
  name: string;
  onRemove: () => void;
  className?: string;
}) {
  return (
    <View className={`w-[89px] items-center gap-1 ${className}`}>
      <View>
        <Avatar
          name={name}
          size={40}
          className="border bg-brand-400"
          textClassName="text-sm"
        />
        <Pressable
          onPress={onRemove}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${name}`}
          className="absolute -right-0.5 top-0.5"
        >
          <Svg width={12} height={12} viewBox="0 0 12 12">
            <Circle cx={6} cy={6} r={6} fill="#FFFFFF" />
            <Path
              d="M4 4l4 4M8 4l-4 4"
              stroke="#3B49BB"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
          </Svg>
        </Pressable>
      </View>
      <Text
        numberOfLines={1}
        className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
        style={{ letterSpacing: -0.084 }}
      >
        {name.split("@")[0]}
      </Text>
    </View>
  );
}

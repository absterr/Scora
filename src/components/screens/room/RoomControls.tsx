import type { FC } from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import {
  Message,
  Microphone,
  Upload,
  Users,
  VideoRecorderOff,
  VideoRecorderSolid,
} from "@/components/icons/solid";
import { cn } from "@/lib/utils";

type MeetingControlsProps = {
  micOn: boolean;
  videoOn: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
};

type Control = {
  key: string;
  label: string;
  Icon: FC<SvgProps>;
  toggle?: boolean;
  active?: boolean;
  onPress?: () => void;
};

export default function RoomControls({
  micOn,
  videoOn,
  onToggleMic,
  onToggleVideo,
}: MeetingControlsProps) {
  const controls: Control[] = [
    {
      key: "mic",
      label: "Mic",
      Icon: Microphone,
      toggle: true,
      active: micOn,
      onPress: onToggleMic,
    },
    {
      key: "video",
      label: "Video",
      Icon: videoOn ? VideoRecorderSolid : VideoRecorderOff,
      toggle: true,
      active: videoOn,
      onPress: onToggleVideo,
    },
    { key: "share", label: "Share", Icon: Upload },
    { key: "people", label: "People", Icon: Users },
    { key: "chat", label: "Chat", Icon: Message },
  ];

  return (
    <View className="flex-row gap-2 px-3 pb-3 pt-4">
      {controls.map(({ key, label, Icon, toggle, active, onPress }) => {
        const tone = active
          ? "text-ink-500 dark:text-snow-600"
          : "text-snow-800";
        return (
          <Pressable
            key={key}
            onPress={onPress}
            accessibilityRole={toggle ? "switch" : "button"}
            accessibilityState={toggle ? { checked: !!active } : undefined}
            className="min-h-11 flex-1 items-center gap-0.5"
          >
            <Icon width={20} height={20} className={tone} />
            <Text
              numberOfLines={1}
              className={cn("font-display-regular text-sm leading-5", tone)}
              style={{ letterSpacing: -0.084 }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

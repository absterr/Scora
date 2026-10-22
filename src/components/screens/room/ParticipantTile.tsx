import type { FC } from "react";
import { Text, View, type ImageSourcePropType } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Microphone, VideoRecorderOff } from "@/components/icons/solid";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

export type Participant = {
  id: string;
  name: string;
  avatar?: ImageSourcePropType;
  host?: boolean;
  micOn: boolean;
};

type ParticipantTileProps = {
  participant: Participant;
  compact?: boolean;
  className?: string;
};

export default function ParticipantTile({
  participant,
  compact,
  className,
}: ParticipantTileProps) {
  const { name, avatar, host, micOn } = participant;

  return (
    <View
      className={cn(
        "items-center justify-center rounded-2xl border border-brand-100",
        "bg-[rgba(205,207,229,0.22)] dark:border-card-stroke dark:bg-grey-700",
        className
      )}
    >
      <View
        className={cn(
          "absolute flex-row gap-1",
          compact ? "left-2 top-2" : "left-4 top-4"
        )}
      >
        <Chip
          icon={Microphone}
          label={host ? "Host" : undefined}
          dim={!micOn}
          compact={compact}
        />
        {host ? null : <Chip icon={VideoRecorderOff} compact={compact} />}
      </View>
      <View className="items-center gap-2 px-2">
        <Avatar
          name={name}
          source={avatar}
          size={compact ? 48 : 100}
          className={cn("bg-brand-100", compact ? "border" : "border-[2.5px]")}
          textClassName="text-brand-800"
        />
        <Text
          numberOfLines={1}
          className={cn(
            "font-display-medium text-ink-500 dark:text-snow-600",
            compact ? "text-xs" : "text-base"
          )}
        >
          {name}
        </Text>
      </View>
    </View>
  );
}

const Chip = ({
  icon: Icon,
  label,
  dim,
  compact,
}: {
  icon: FC<SvgProps>;
  label?: string;
  dim?: boolean;
  compact?: boolean;
}) => (
  <View
    className={cn(
      "flex-row items-center gap-1 rounded-full border border-[rgba(205,207,229,0.22)]",
      "bg-[rgba(4,17,174,0.16)] dark:border-grey-700 dark:bg-[rgba(161,161,161,0.4)]",
      compact ? "px-2 py-0.5" : "px-3 py-1",
      dim && "opacity-60"
    )}
  >
    <Icon
      width={compact ? 12 : 16}
      height={compact ? 12 : 16}
      className="text-ink-500 dark:text-snow-600"
    />
    {label ? (
      <Text
        className="font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600"
        style={{ letterSpacing: -0.084 }}
      >
        {label}
      </Text>
    ) : null}
  </View>
);

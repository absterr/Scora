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

export default function ParticipantTile({
  participant,
}: {
  participant: Participant;
}) {
  const { name, avatar, host, micOn } = participant;

  return (
    <View
      className={`flex-1 items-center justify-center rounded-2xl border
        border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-card-stroke dark:bg-grey-700`}
    >
      <View className="absolute left-4 top-4 flex-row gap-1">
        <Chip
          icon={Microphone}
          label={host ? "Host" : undefined}
          dim={!micOn}
        />
        {host ? null : <Chip icon={VideoRecorderOff} />}
      </View>
      <View className="items-center gap-3">
        <Avatar
          name={name}
          source={avatar}
          size={100}
          className="border-[2.5px] bg-brand-100"
          textClassName="text-brand-800"
        />
        <Text className="font-display-medium text-base text-ink-500 dark:text-snow-600">
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
}: {
  icon: FC<SvgProps>;
  label?: string;
  dim?: boolean;
}) => (
  <View
    className={cn(
      "flex-row items-center gap-1 px-3 py-1 rounded-full",
      "border border-[rgba(205,207,229,0.22)] bg-[rgba(4,17,174,0.16)]",
      "dark:border-grey-700 dark:bg-[rgba(161,161,161,0.4)]",
      dim && "opacity-60"
    )}
  >
    <Icon width={16} height={16} className="text-ink-500 dark:text-snow-600" />
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

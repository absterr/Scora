import type { FC } from "react";
import { Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Announcement, StarsLine, Unlocked } from "@/components/icons/line";
import AppTile from "@/components/screens/plans/AppTile";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { ModalHeader, ModalTopbar } from "@/components/ui/Modal";

type TrialStepProps = {
  price: string;
  onBack: () => void;
  onSkip: () => void;
  onStart: () => void;
};

const TRIAL_DAYS = 7;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const TIGHT = { letterSpacing: -0.084 };
const TILE_SHADOW = { boxShadow: "0 2px 6px rgba(11,10,10,0.25)" };

const trialEnd = () => {
  const date = new Date();
  date.setDate(date.getDate() + TRIAL_DAYS);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
};

export default function TrialStep({
  price,
  onBack,
  onSkip,
  onStart,
}: TrialStepProps) {
  const rate = price.replace("/", "per");
  const rows: { Icon: FC<SvgProps>; title: string; text: string }[] = [
    {
      Icon: Unlocked,
      title: "Today",
      text: "Start your full access to all features.",
    },
    {
      Icon: Announcement,
      title: "In 5 days",
      text: "Get an email reminder before your trial ends.",
    },
    {
      Icon: StarsLine,
      title: "In 7 days",
      text: `Your free trial ends and you’ll be charged ${rate} automatically.`,
    },
  ];

  return (
    <View className="flex-1 justify-between gap-6">
      <View className="gap-6">
        <ModalTopbar onBack={onBack} onSkip={onSkip} />
        <ModalHeader
          title="Enjoy Your 7-Day Trial!"
          description="Unlock the complete experience during your trial period."
          className="gap-4"
        >
          <AppTile />
        </ModalHeader>

        <View className="gap-4">
          {rows.map(({ Icon, title, text }) => (
            <View key={title} className="flex-row items-center gap-3">
              <View
                className="size-8 items-center justify-center rounded-lg bg-brand-400 dark:bg-[#EBECFA]"
                style={TILE_SHADOW}
              >
                <Icon
                  width={16}
                  height={16}
                  className="text-ink-50 dark:text-ink-500"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
                  style={TIGHT}
                >
                  {title}
                </Text>
                <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
                  {text}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Alert size="sm">
          You won’t be charged until {trialEnd()}. Cancel anytime up to 24 hours
          before your trial ends.
        </Alert>
      </View>

      <View className="gap-4">
        <View>
          <Text
            className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
            style={TIGHT}
          >
            Free 7 Day Trial
          </Text>
          <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
            {rate} after trial.
          </Text>
        </View>
        <Button label="Start my free trial" onPress={onStart} />
      </View>
    </View>
  );
}

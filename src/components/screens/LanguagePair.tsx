import type { FC } from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import {
  China,
  France,
  Germany,
  Indonesia,
  Italy,
  Spain,
  UnitedKingdom,
} from "@/components/icons/flags";
import { SwitchHorizontal } from "@/components/icons/line";
import { cn } from "@/lib/utils";
import FlagBadge from "./FlagBadge";

export type Lang = "en" | "id" | "zh" | "fr" | "de" | "it" | "es";

type LanguagePairProps = {
  value: [Lang, Lang];
  onSwap: () => void;
  onChange?: () => void;
  className?: string;
};

const LANGUAGES: Record<Lang, { flag: FC<SvgProps>; label: string }> = {
  en: { flag: UnitedKingdom, label: "English" },
  id: { flag: Indonesia, label: "Indonesian" },
  zh: { flag: China, label: "Chinese" },
  fr: { flag: France, label: "French" },
  de: { flag: Germany, label: "German" },
  it: { flag: Italy, label: "Italian" },
  es: { flag: Spain, label: "Spanish" },
};

export default function LanguagePair({
  value,
  onSwap,
  onChange,
  className,
}: LanguagePairProps) {
  return (
    <View
      className={cn(
        "h-12 flex-row items-center justify-between gap-2.5 rounded-xl border p-3",
        "border-brand-100 bg-white/60 dark:border-card-stroke dark:bg-snow-300/[0.04]",
        className
      )}
    >
      <View className="flex-row items-center gap-3">
        <FlagBadge flag={LANGUAGES[value[0]].flag} />

        <Pressable
          onPress={onSwap}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Swap languages"
          className={`size-6 items-center justify-center rounded-full border border-brand-100
           bg-[rgba(205,207,229,0.22)] dark:border-card-stroke dark:bg-grey-700`}
        >
          <SwitchHorizontal
            width={12}
            height={12}
            className="text-ink-500 dark:text-snow-600"
          />
        </Pressable>

        <FlagBadge flag={LANGUAGES[value[1]].flag} />
      </View>

      <Pressable onPress={onChange} hitSlop={8} accessibilityRole="button">
        <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
          Change Language
        </Text>
      </Pressable>
    </View>
  );
}

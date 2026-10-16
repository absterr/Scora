import type { FC } from "react";
import { Text, View } from "react-native";
import Svg, { Path, type SvgProps } from "react-native-svg";

import { cn } from "@/lib/utils";
import FlagBadge from "../FlagBadge";

type LanguageOptionProps = {
  flag: FC<SvgProps>;
  label: string;
  selected?: boolean;
  className?: string;
};

const CHECK_RING = { boxShadow: "0px 0px 0px 2.33333px #F4EBFF" };

export default function LanguageOption({
  flag,
  label,
  selected = false,
  className,
}: LanguageOptionProps) {
  return (
    <View
      className={cn(
        "h-10 flex-row items-center gap-2.5 rounded-xl border px-4",
        selected
          ? "border-brand-200 bg-brand-50 dark:border-brand-400 dark:bg-brand-400"
          : "border-brand-50 bg-snow-300/10 dark:border-card-stroke dark:bg-grey-600",
        className
      )}
    >
      <FlagBadge flag={flag} />
      <Text
        numberOfLines={1}
        className={cn(
          "flex-1 font-display-regular text-sm leading-5 text-ink-500",
          selected ? "dark:text-snow-100" : "dark:text-snow-600"
        )}
        style={{ letterSpacing: -0.084 }}
      >
        {label}
      </Text>
      <View
        className={cn(
          "size-3.5 items-center justify-center rounded-full border-[0.875px]",
          selected
            ? "border-brand-500 bg-brand-500"
            : "border-brand-100 bg-snow-500/[0.16] dark:bg-grey-200/40"
        )}
        style={selected ? CHECK_RING : undefined}
      >
        {selected ? (
          <Svg width={14} height={14} viewBox="0 0 14 14">
            <Path
              d="M4.1 7 5.8 8.7 9.9 4.8"
              stroke="#FFFFFF"
              strokeWidth={1.458}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        ) : null}
      </View>
    </View>
  );
}

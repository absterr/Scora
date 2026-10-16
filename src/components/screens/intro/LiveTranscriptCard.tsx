import { Text, View } from "react-native";

import {
  France,
  Germany,
  Indonesia,
  Spain,
  UnitedKingdom,
} from "@/components/icons/flags";
import { SwitchHorizontal } from "@/components/icons/line";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import FlagBadge from "../FlagBadge";
import LanguageOption from "./LanguageOption";

const noop = () => {};

export default function LiveTranscriptCard() {
  return (
    <View className="w-[311px] gap-5 rounded-xl border border-brand-100 bg-white p-3 dark:border-card-stroke dark:bg-grey-800">
      <View className="gap-2.5">
        <View className="flex-row items-center gap-4">
          <View className="flex-1">
            <Text
              className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
              style={{ letterSpacing: -0.084 }}
            >
              Live Transcript
            </Text>
            <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
              See live captions during the meeting.
            </Text>
          </View>
          <View pointerEvents="none">
            <ToggleSwitch value onValueChange={noop} />
          </View>
        </View>

        <View className="h-12 flex-row items-center justify-between gap-2.5 rounded-xl border border-brand-50 bg-snow-300/10 p-3 dark:border-card-stroke dark:bg-grey-600">
          <View className="flex-row items-center gap-3">
            <FlagBadge flag={UnitedKingdom} />
            <View className="size-6 items-center justify-center rounded-full border border-brand-500/[0.16] bg-[rgba(70,73,255,0.22)]">
              <SwitchHorizontal
                width={12}
                height={12}
                className="text-snow-500"
              />
            </View>
            <FlagBadge flag={Indonesia} />
          </View>
          <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
            Change Language
          </Text>
        </View>
      </View>

      <View className="gap-3">
        <LanguageOption flag={Spain} label="Spanish" />
        <View className="z-10">
          <View className="h-10 rounded-xl border border-dashed border-brand-200 bg-[rgba(70,73,255,0.22)] dark:border-card-stroke dark:bg-card-stroke" />
          <LanguageOption
            selected
            flag={UnitedKingdom}
            label="English"
            className="absolute left-[51px] top-[7px] h-12 w-64"
          />
        </View>
        <LanguageOption flag={France} label="French" />
        <LanguageOption flag={Germany} label="Germany" />
      </View>
    </View>
  );
}

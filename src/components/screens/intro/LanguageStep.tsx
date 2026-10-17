import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import type { FC } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import Button from "@/components/ui/Button";
import RadioButton from "@/components/ui/RadioButton";

type Language = { id: string; label: string; Flag: FC<SvgProps> };

type LanguageStepProps = {
  value: string | null;
  onChange: (id: string) => void;
  onContinue: () => void;
};

const BASE_LANGUAGES: Language[] = [
  { id: "id", label: "Indonesia", Flag: Indonesia },
];
const OTHER_LANGUAGES: Language[] = [
  { id: "es", label: "Spanish", Flag: Spain },
  { id: "en", label: "English", Flag: UnitedKingdom },
  { id: "fr", label: "French", Flag: France },
  { id: "de", label: "Germany", Flag: Germany },
  { id: "it", label: "Italian", Flag: Italy },
  { id: "zh", label: "Chinese", Flag: China },
];
const TRACKING = { letterSpacing: -0.084 };

export default function LanguageStep({
  value,
  onChange,
  onContinue,
}: LanguageStepProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 gap-5 px-6 pt-12"
      style={{ paddingBottom: insets.bottom + 16 }}
    >
      <View className="gap-1.5">
        <Text className="text-center font-display-medium text-base leading-none text-ink-500 dark:text-snow-600">
          Choose your language
        </Text>
        <Text
          className="text-center font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={TRACKING}
        >
          Select a preferred language for reading and listening.
        </Text>
      </View>

      <View className="flex-1">
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-5">
            <LanguageGroup
              title="Base on your location:"
              languages={BASE_LANGUAGES}
              value={value}
              onChange={onChange}
            />
            <LanguageGroup
              title="Other languages:"
              languages={OTHER_LANGUAGES}
              value={value}
              onChange={onChange}
            />
          </View>
        </BottomSheetScrollView>
      </View>

      <View className="pt-3">
        <Button label="Get started" disabled={!value} onPress={onContinue} />
      </View>
    </View>
  );
}

type LanguageGroupProps = {
  title: string;
  languages: Language[];
  value: string | null;
  onChange: (id: string) => void;
};

const LanguageGroup = ({
  title,
  languages,
  value,
  onChange,
}: LanguageGroupProps) => (
  <View className="gap-2">
    <Text
      className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
      style={TRACKING}
    >
      {title}
    </Text>
    <View className="gap-3">
      {languages.map(({ id, label, Flag }) => (
        <RadioButton
          key={id}
          label={label}
          selected={id === value}
          onPress={() => onChange(id)}
          flag={<Flag width="100%" height="100%" />}
        />
      ))}
    </View>
  </View>
);

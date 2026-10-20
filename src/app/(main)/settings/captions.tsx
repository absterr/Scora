import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Indonesia, UnitedKingdom } from "@/components/icons/flags";
import { ChevronRight } from "@/components/icons/line";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import Selectable from "@/components/ui/Selectable";

const TIGHT = { letterSpacing: -0.084 };

const Flag = ({ Icon }: { Icon: typeof UnitedKingdom }) => (
  <View className="size-4 overflow-hidden rounded-full">
    <Icon width={16} height={16} />
  </View>
);

const LANGUAGES = [
  { label: "English (UK)", value: "en", icon: <Flag Icon={UnitedKingdom} /> },
  { label: "Indonesian", value: "id", icon: <Flag Icon={Indonesia} /> },
];

export default function CaptionsTranslation() {
  const { top } = useSafeAreaInsets();
  const [displayLanguage, setDisplayLanguage] = useState("en");
  const [translateLanguage, setTranslateLanguage] = useState("id");

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Captions and Translation"
        description="Manage how captions and translations appear in your videos."
      />

      <View className="gap-2">
        <Pressable
          accessibilityRole="button"
          className={`h-11 px-3 flex-row items-center justify-between gap-2 rounded-xl
            border border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-800`}
        >
          <Text
            className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
            style={TIGHT}
          >
            Display Captions
          </Text>
          <View className="flex-row items-center gap-1">
            <Text
              className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
              style={TIGHT}
            >
              On
            </Text>
            <ChevronRight
              width={16}
              height={16}
              className="text-ink-400 dark:text-grey-100"
            />
          </View>
        </Pressable>

        <Collapsible
          defaultOpen
          title="Language Settings"
          description="Manage display and content languages across your experience."
        >
          <View className="gap-4">
            <Selectable
              label="Display language"
              options={LANGUAGES}
              value={displayLanguage}
              onValueChange={setDisplayLanguage}
            />
            <Selectable
              label="Translate to"
              options={LANGUAGES}
              value={translateLanguage}
              onValueChange={setTranslateLanguage}
            />
          </View>
        </Collapsible>

        <Collapsible
          title="Glossary"
          description="A complete index of terms to help you navigate and analyze with confidence."
        >
          <Button label="Add term" />
        </Collapsible>
      </View>
    </ScrollView>
  );
}

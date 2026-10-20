import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Checkbox from "@/components/ui/Checkbox";
import Collapsible from "@/components/ui/Collapsible";
import Selectable from "@/components/ui/Selectable";

const TEMPLATES = ["Bullet", "Minutes of Meeting (MOM)", "Action Items"];

const EXPORT_LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Indonesian", value: "id" },
];

export default function AISummaries() {
  const { top } = useSafeAreaInsets();
  const [templates, setTemplates] = useState<string[]>(TEMPLATES);
  const [exportLanguage, setExportLanguage] = useState<string>();

  const toggle = (name: string, checked: boolean) =>
    setTemplates((prev) =>
      checked ? [...prev, name] : prev.filter((n) => n !== name)
    );

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="AI and Summaries"
        description="Review and customize how Scora’s AI processes and summarizes information."
      />

      <View className="gap-2">
        <Collapsible
          defaultOpen
          title="Summary Template"
          description="Customize how AI structures and formats your automated summaries."
        >
          <View className="gap-2">
            {TEMPLATES.map((name) => (
              <Checkbox
                key={name}
                label={name}
                checked={templates.includes(name)}
                onChange={(checked) => toggle(name, checked)}
              />
            ))}
          </View>
        </Collapsible>

        <Collapsible
          title="Level Details"
          description="View detailed information about each level and its requirements."
        >
          <Text className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100">
            Brief keeps summaries to a few lines. Detailed includes every topic,
            decision and action item.
          </Text>
        </Collapsible>

        <Collapsible
          title="Export Language Selection"
          description="Choose the language for your exported reports and summaries."
        >
          <Selectable
            placeholder="Select language"
            options={EXPORT_LANGUAGES}
            value={exportLanguage}
            onValueChange={setExportLanguage}
          />
        </Collapsible>
      </View>
    </ScrollView>
  );
}

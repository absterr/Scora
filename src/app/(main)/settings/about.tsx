import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRight } from "@/components/icons/line";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import { cn } from "@/lib/utils";

const TIGHT = { letterSpacing: -0.084 };

const ROWS: { label: string; value?: string }[] = [
  { label: "Version", value: "1.0.0 (2025)" },
  { label: "Developer", value: "Scora AI" },
  { label: "Website" },
  { label: "Privacy Policy" },
  { label: "Terms of Use" },
  { label: "Contact Us" },
];

export default function About() {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="About"
        description="Learn more about this application and its version details."
      />

      <View className="overflow-hidden rounded-xl border border-brand-100 dark:border-grey-500">
        {ROWS.map(({ label, value }, i) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            className={cn(
              "h-11 flex-row items-center gap-2 bg-[rgba(205,207,229,0.22)] px-4 dark:bg-grey-800",
              i > 0 && "border-t border-brand-100 dark:border-grey-500"
            )}
          >
            <Text
              className="flex-1 font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
              style={TIGHT}
            >
              {label}
            </Text>
            {value ? (
              <Text
                className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                style={TIGHT}
              >
                {value}
              </Text>
            ) : null}
            <ChevronRight
              width={16}
              height={16}
              className="text-ink-400 dark:text-grey-100"
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

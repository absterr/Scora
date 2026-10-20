import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRight } from "@/components/icons/line";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Collapsible from "@/components/ui/Collapsible";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils";

const TIGHT = { letterSpacing: -0.084 };
const DIVIDER = "border-brand-100 dark:border-card-stroke";

const PREFERENCES = [
  { label: "Quiet Hours", value: "Not set" },
  { label: "Mobile Devices", value: "All" },
];

const CATEGORIES = [
  {
    id: "conversations",
    title: "My Conversations",
    description: "Conversations process and ready",
    channels: ["Push", "Email"],
    defaultOpen: true,
  },
  {
    id: "live-notes",
    title: "Live Notes",
    description: "Get a calendar reminder when your meeting starts.",
    channels: ["Push", "Email"],
  },
  {
    id: "summary",
    title: "Meeting Summary",
    description:
      "Get instant summaries and key takeaways for meetings you record or receive.",
    channels: ["Push", "Email"],
  },
  {
    id: "calendar",
    title: "Calendar Events",
    description: "Upcoming calendar event to be recorded",
    channels: ["Push", "Email"],
  },
  {
    id: "tips",
    title: "Product Tips",
    description:
      "Smart updates and learning tips to help you unlock Scora’s full potential.",
    channels: ["Push", "Email"],
  },
  {
    id: "offers",
    title: "Offers & Discounts",
    description: "New about special offers and discounts on Scora product.",
    channels: ["Push", "Email"],
  },
];

export default function Notifications() {
  const { top } = useSafeAreaInsets();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    "conversations:Push": false,
    "conversations:Email": true,
  });

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Notifications"
        description="Set your preferred notification channels and timing for a smoother workflow."
      />

      <View className="gap-5">
        <View className="gap-3">
          <Text
            className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
            style={TIGHT}
          >
            Allow notifications for:
          </Text>
          <View className="overflow-hidden rounded-xl border border-brand-100 dark:border-card-stroke">
            {PREFERENCES.map(({ label, value }, i) => (
              <Pressable
                key={label}
                accessibilityRole="button"
                className={cn(
                  "h-11 flex-row items-center gap-2 bg-[rgba(205,207,229,0.22)] p-3 dark:bg-grey-700",
                  i === 0 && `border-b ${DIVIDER}`
                )}
              >
                <Text
                  className="flex-1 font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
                  style={TIGHT}
                >
                  {label}
                </Text>
                <Text
                  className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                  style={TIGHT}
                >
                  {value}
                </Text>
                <ChevronRight
                  width={16}
                  height={16}
                  className="text-ink-400 dark:text-grey-100"
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View className="gap-2">
          {CATEGORIES.map(({ id, channels, ...rest }) => (
            <Collapsible key={id} {...rest}>
              <View className="gap-3">
                {channels.map((channel) => {
                  const key = `${id}:${channel}`;
                  return (
                    <View
                      key={key}
                      className="flex-row items-center justify-between gap-2.5"
                    >
                      <Text
                        className="flex-1 font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                        style={TIGHT}
                      >
                        {channel}
                      </Text>
                      <ToggleSwitch
                        value={enabled[key] ?? true}
                        onValueChange={(v) =>
                          setEnabled((prev) => ({ ...prev, [key]: v }))
                        }
                      />
                    </View>
                  );
                })}
              </View>
            </Collapsible>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

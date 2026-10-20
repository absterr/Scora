import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRight } from "@/components/icons/line";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import { cn } from "@/lib/utils";

const TIGHT = { letterSpacing: -0.084 };

const FIELDS = [
  { label: "Display Name", value: "Mark Burghschent" },
  { label: "Username", value: "markburgschent" },
  { label: "Email", value: "markburg@gmail.com" },
  { label: "Phone Number", value: "Not set" },
  { label: "Update Password", value: "•••••••••" },
  { label: "Manage login devices", value: "Mac OS" },
];

export default function Profile() {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerClassName="gap-10 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Profile and Identity"
        description="Manage your personal information and preferences."
      />

      <View className="gap-6">
        <View className="items-center gap-3">
          <Image
            source={require("@/assets/avatars/enzo.png")}
            className="size-[100px] rounded-full"
          />
          <View className="items-center">
            <Text
              className="font-display-medium text-lg leading-6 text-ink-500 dark:text-snow-600"
              style={{ letterSpacing: -0.27 }}
            >
              Mark Burghschent
            </Text>
            <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
              markburg@gmail.com
            </Text>
          </View>
        </View>

        <View className="overflow-hidden rounded-xl border border-brand-100 dark:border-card-stroke">
          {FIELDS.map(({ label, value }, i) => (
            <Pressable
              key={label}
              accessibilityRole="button"
              className={cn(
                "h-11 flex-row items-center gap-2 bg-[#EBECFA] px-4 dark:bg-grey-800",
                i > 0 &&
                  "border-t border-[rgba(205,207,229,0.22)] dark:border-grey-500"
              )}
            >
              <Text
                className="flex-1 font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600"
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
    </ScrollView>
  );
}

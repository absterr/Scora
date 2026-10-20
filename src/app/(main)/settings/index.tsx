import { Href, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRight } from "@/components/icons/line";
import { cn } from "@/lib/utils";

const TIGHT = { letterSpacing: -0.084 };

const SECTIONS: { label: string; href?: Href }[] = [
  { label: "Security & Privacy", href: "/settings/security" },
  { label: "Video & Audio", href: "/settings/video-audio" },
  { label: "Captions & Translation", href: "/settings/captions" },
  { label: "AI & Summaries", href: "/settings/ai-summaries" },
  { label: "Documents & Export", href: "/settings/docs-export" },
  { label: "Integrations", href: "/settings/integrations" },
  { label: "Notifications", href: "/settings/notifications" },
  { label: "Plan & Billing", href: "/settings/billing" },
  { label: "About", href: "/settings/about" },
  { label: "Team & Roles" },
];

export default function Settings() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerClassName="gap-4 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <View className="gap-1">
        <Text className="font-display-medium text-xl leading-6 text-ink-500 dark:text-snow-600">
          Settings
        </Text>
        <Text
          className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={TIGHT}
        >
          {
            "Customize Scora’s behavior and features\nto fit the way you work best."
          }
        </Text>
      </View>

      <View className="gap-4 rounded-2xl border border-brand-100 bg-[#EBECFA] p-3 dark:border-grey-500 dark:bg-grey-800">
        <Pressable
          onPress={() => router.push("/settings/profile")}
          accessibilityRole="button"
          className={`h-16 flex-row items-center gap-2.5 rounded-xl border border-[rgba(205,207,229,0.22)]
            bg-[rgba(205,207,229,0.22)] p-3 dark:border-grey-500 dark:bg-snow-300/[0.04]`}
        >
          <Image
            source={require("@/assets/avatars/enzo.png")}
            className="size-10 rounded-full"
          />
          <View className="flex-1 justify-center">
            <Text className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600">
              Mark Burghschent
            </Text>
            <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
              markburg@gmail.com
            </Text>
          </View>
          <ChevronRight
            width={16}
            height={16}
            className="text-ink-400 dark:text-grey-100"
          />
        </Pressable>

        <View
          className={`overflow-hidden rounded-xl border border-[rgba(205,207,229,0.22)]
            bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-snow-300/[0.04]`}
        >
          {SECTIONS.map(({ label, href }, i) => (
            <Pressable
              key={label}
              onPress={href ? () => router.push(href) : undefined}
              accessibilityRole="button"
              className={cn(
                "h-11 flex-row items-center gap-2.5 px-3",
                i > 0 &&
                  "border-t border-[rgba(205,207,229,0.22)] dark:border-grey-500"
              )}
            >
              <Text
                className="flex-1 font-display-medium text-sm leading-5 text-ink-400 dark:text-grey-100"
                style={TIGHT}
              >
                {label}
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

      <Text
        className="text-center font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
        style={TIGHT}
      >
        © 2025 Scora AI Assistant — Empowering smarter meetings with AI.
      </Text>
    </ScrollView>
  );
}

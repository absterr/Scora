import { useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AIBubble from "@/components/AIBubble";
import { AppLogo } from "@/components/icons/app";
import {
  Bell,
  BrokenLink,
  Calendar,
  ChevronDown,
  Menu,
  StarsLine,
  VideoRecorderLine,
} from "@/components/icons/line";
import ActionMenu from "@/components/screens/meeting/ActionMenu";
import { AVATARS } from "@/lib/avatars";
import { cn } from "@/lib/utils";

const TIGHT = { letterSpacing: -0.084 };
const TABS = ["All", "Scheduled", "Summaries", "Documents", "Translate"];

const SURFACE =
  "border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-card-stroke dark:bg-grey-700";
const ROUND_BUTTON =
  "size-9 items-center justify-center rounded-full border border-[rgba(4,17,174,0.16)] bg-[rgba(4,17,174,0.16)] dark:border-[rgba(161,161,161,0.4)] dark:bg-[rgba(161,161,161,0.4)]";
const BODY = "font-display-regular text-sm leading-5";
const MUTED = "text-ink-400 dark:text-grey-100";
const STRONG = "text-ink-500 dark:text-snow-600";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Calendar;
  title: string;
  description: string;
}) => (
  <Pressable
    accessibilityRole="button"
    className={`h-[114px] flex-1 justify-center gap-2.5 rounded-xl border p-3 ${SURFACE}`}
  >
    <View
      className="size-6 items-center justify-center rounded-md bg-brand-400 dark:bg-[#EBECFA]"
      style={{ boxShadow: "0 1.5px 4.5px rgba(11,10,10,0.25)" }}
    >
      <Icon width={12} height={12} className="text-ink-50 dark:text-ink-500" />
    </View>
    <View className="gap-1">
      <Text className={`${BODY} ${STRONG}`} style={TIGHT}>
        {title}
      </Text>
      <Text className={`font-display-regular text-xs ${MUTED}`}>
        {description}
      </Text>
    </View>
  </Pressable>
);

export default function Meetings() {
  const { top } = useSafeAreaInsets();
  const barRef = useRef<View>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(TABS[0]);

  return (
    <ScrollView
      contentContainerClassName="gap-10 px-6 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <View className="flex-row items-center justify-between gap-2">
        <View className="flex-row items-center gap-2">
          <Image source={AVATARS.enzo} className="size-10 rounded-full" />
          <View>
            <Text className={`font-display-medium text-sm leading-5 ${STRONG}`}>
              Good Morning!
            </Text>
            <Text className={`${BODY} ${MUTED}`}>Mark Burghschent</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <Pressable
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            className={ROUND_BUTTON}
          >
            <Bell width={18} height={18} className="text-snow-100" />
          </Pressable>
          <Pressable
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel="Menu"
            className={ROUND_BUTTON}
          >
            <Menu width={18} height={18} className="text-snow-100" />
          </Pressable>
        </View>
      </View>

      <View className="gap-8">
        <View className="items-center gap-2">
          <Text className={`font-display-medium text-base ${STRONG}`}>
            Start your meeting in seconds
          </Text>
          <Text className={`text-center ${BODY} ${MUTED}`} style={TIGHT}>
            {
              "Bring your team together anytime, anywhere,\nand keep the conversation flowing without limits."
            }
          </Text>
        </View>

        <AIBubble
          source={require("@/assets/images/ai-bubble.png")}
          origin="50% 50%"
          className="size-[92px] self-center"
        />

        <View
          ref={barRef}
          collapsable={false}
          className={`flex-row items-center gap-6 self-center rounded-xl border px-4 py-2.5 ${SURFACE}`}
        >
          <AppLogo
            width={79}
            height={20}
            className="text-brand-400 dark:text-snow-600"
          />
          <Pressable
            onPress={() => setMenuOpen(true)}
            accessibilityRole="button"
            accessibilityState={{ expanded: menuOpen }}
            className={`h-7 flex-row items-center justify-center px-3 gap-1 rounded-lg
              border border-brand-100 bg-white/40 dark:border-card-stroke dark:bg-[rgba(161,161,161,0.4)]`}
          >
            <Text
              className={`font-display-medium text-xs ${STRONG}`}
              style={{ letterSpacing: 0.24 }}
            >
              Start Meeting
            </Text>
            <ChevronDown
              width={14}
              height={14}
              className="text-ink-500 dark:text-snow-600"
            />
          </Pressable>
        </View>
      </View>

      <View className="gap-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-4"
        >
          {TABS.map((name) => (
            <Pressable
              key={name}
              onPress={() => setTab(name)}
              hitSlop={12}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === name }}
            >
              <Text
                className={cn(BODY, tab === name ? STRONG : MUTED)}
                style={TIGHT}
              >
                {name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View className="gap-3">
          <View className="flex-row gap-3">
            <FeatureCard
              icon={Calendar}
              title="Schedule Meeting"
              description="View upcoming meetings and past meeting history."
            />
            <FeatureCard
              icon={StarsLine}
              title="AI Assistant"
              description="Summarization and document handling"
            />
          </View>

          <View className={`gap-3 rounded-xl border p-3 ${SURFACE}`}>
            <View className="gap-1">
              <Text className={`${BODY} ${STRONG}`} style={TIGHT}>
                Schedule Meeting List
              </Text>
              <Text className={`font-display-regular text-xs ${MUTED}`}>
                View upcoming meetings and past meeting history.
              </Text>
            </View>
            <View
              className={`h-10 px-3 items-center justify-center rounded-xl border border-dashed
                border-brand-100 bg-[#EBECFA] dark:border-card-stroke dark:bg-grey-700`}
            >
              <Text className={`font-display-regular text-xs ${MUTED}`}>
                No list yet.{" "}
                <Text className="text-brand-400 underline dark:text-brand-200">
                  Create a new meeting
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ActionMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorRef={barRef}
        items={[
          { label: "New Meeting", icon: VideoRecorderLine },
          { label: "Schedule Meeting", icon: Calendar },
          { label: "Join With Link", icon: BrokenLink },
        ]}
      />
    </ScrollView>
  );
}

import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRight } from "@/components/icons/line";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import Selectable from "@/components/ui/Selectable";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

const TIGHT = { letterSpacing: -0.084 };

const RETENTION = [
  { label: "30 days", value: "30" },
  { label: "90 days", value: "90" },
  { label: "1 year", value: "365" },
  { label: "Forever", value: "forever" },
];

const ToggleRow = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <View className="flex-row items-center justify-between gap-2.5">
    <Text
      className="flex-1 font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600"
      style={TIGHT}
    >
      {label}
    </Text>
    <ToggleSwitch value={value} onValueChange={onValueChange} />
  </View>
);

export default function SecurityPrivacy() {
  const { top } = useSafeAreaInsets();
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [retention, setRetention] = useState<string>();

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Security and Privacy"
        description="Protecting your data with advanced security and privacy controls."
      />

      <View className="gap-2">
        <Collapsible
          size="sm"
          title="2FA & Biometric"
          description="Enable advanced authentication methods for stronger security."
        >
          <View className="gap-4">
            <ToggleRow
              label="Two-factor authentication"
              value={twoFactor}
              onValueChange={setTwoFactor}
            />
            <ToggleRow
              label="Biometric login"
              value={biometric}
              onValueChange={setBiometric}
            />
          </View>
        </Collapsible>

        <Collapsible
          size="sm"
          title="Retention data"
          description="Manage how long your meeting data and records are stored."
        >
          <Selectable
            label="Keep meeting data for"
            placeholder="Select duration"
            options={RETENTION}
            value={retention}
            onValueChange={setRetention}
          />
        </Collapsible>

        <Collapsible
          size="sm"
          title="Download Data"
          description="Export your meetings, notes, and insights in a secure file."
        >
          <Button label="Request export" />
        </Collapsible>

        <Pressable
          accessibilityRole="button"
          className="h-10 flex-row items-center justify-between gap-2 rounded-xl border border-brand-100 bg-[rgba(205,207,229,0.22)] px-3 dark:border-grey-500 dark:bg-grey-800"
        >
          <Text
            className="font-display-medium text-xs leading-4 text-error-500"
            style={{ letterSpacing: 0.24 }}
          >
            Delete Account
          </Text>
          <ChevronRight
            width={16}
            height={16}
            className="text-ink-400 dark:text-grey-100"
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}

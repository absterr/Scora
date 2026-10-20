import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Collapsible from "@/components/ui/Collapsible";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

const TIGHT = { letterSpacing: -0.084 };

export default function Billing() {
  const { top } = useSafeAreaInsets();
  const [autoRenew, setAutoRenew] = useState(false);

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Plan and Billing"
        description="Check your current plan, update billing information, and review past payments."
      />

      <View className="gap-2">
        <Collapsible defaultOpen title="Plan" description="Manage Plan">
          <View className="flex-row items-center justify-between gap-2.5">
            <View className="flex-row items-center gap-1.5">
              <Text className="font-display-regular text-xs text-ink-500 dark:text-snow-600">
                Premium
              </Text>
              <View className="size-1.5 rounded-full bg-ink-400 dark:bg-grey-100" />
              <Text className="font-display-regular text-xs text-ink-500 dark:text-snow-600">
                Monthly
              </Text>
            </View>
            <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
              1 Month free, then $32/month
            </Text>
          </View>
        </Collapsible>

        <View
          className={`flex-row items-center gap-2.5 rounded-xl border border-brand-100
          bg-[rgba(205,207,229,0.22)] p-3 dark:border-grey-500 dark:bg-grey-800`}
        >
          <View className="flex-1 gap-0.5">
            <Text
              className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
              style={TIGHT}
            >
              Payment Methods
            </Text>
            <Text
              className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
              style={TIGHT}
            >
              Auto-Renew
            </Text>
          </View>
          <ToggleSwitch value={autoRenew} onValueChange={setAutoRenew} />
        </View>

        <Collapsible
          title="Payments History"
          description="Track all your completed and pending payments."
        >
          <Text
            className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
            style={TIGHT}
          >
            No payments yet.
          </Text>
        </Collapsible>
      </View>
    </ScrollView>
  );
}

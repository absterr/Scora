import { useState, type FC } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";

import { Logout } from "@/components/icons/line";
import { GoogleDrive, Notion, OneDrive, Slack } from "@/components/icons/tools";
import ConnectIntegrationModal from "@/components/screens/settings/ConnectIntegrationModal";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Collapsible from "@/components/ui/Collapsible";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils";

type Integration = {
  id: string;
  name: string;
  Icon: FC<SvgProps>;
  width: number;
  height: number;
};

const INTEGRATIONS: Integration[] = [
  {
    id: "gdrive",
    name: "Google Drive",
    Icon: GoogleDrive,
    width: 18,
    height: 16,
  },
  { id: "onedrive", name: "OneDrive", Icon: OneDrive, width: 24, height: 15 },
  { id: "notion", name: "Notion", Icon: Notion, width: 16, height: 16 },
  { id: "slack", name: "Slack", Icon: Slack, width: 16, height: 16 },
];

const SOFT_FILL = "border-[rgba(205,207,229,0.22)] bg-[rgba(205,207,229,0.22)]";
const ROW_DIVIDER =
  "border-t border-[rgba(205,207,229,0.22)] dark:border-grey-500";

export default function Integrations() {
  const { top } = useSafeAreaInsets();
  const [connected, setConnected] = useState<Record<string, boolean>>({
    gdrive: true,
    onedrive: true,
  });
  const [autoSync, setAutoSync] = useState(true);
  const [pending, setPending] = useState<Integration | null>(null);

  const modalIntegration = pending
    ? {
        name: pending.name,
        icon: <pending.Icon width={pending.width} height={pending.height} />,
      }
    : null;

  const set = (id: string, value: boolean) =>
    setConnected((prev) => ({ ...prev, [id]: value }));

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Integrations"
        description="Manage third-party connections and sync your data across platforms."
      />

      <View className="gap-2">
        <View className="overflow-hidden rounded-xl border border-brand-100 dark:border-grey-500">
          {INTEGRATIONS.map(({ id, name, Icon, width, height }, i) => (
            <View
              key={id}
              className={cn(
                "h-[52px] flex-row items-center gap-2 px-4",
                "bg-[rgba(205,207,229,0.22)] dark:bg-grey-800",
                i > 0 && ROW_DIVIDER
              )}
            >
              <Icon width={width} height={height} />
              <Text
                className="flex-1 font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                style={{ letterSpacing: -0.084 }}
              >
                {name}
              </Text>
              <ConnectButton
                connected={!!connected[id]}
                onPress={() => setPending(INTEGRATIONS[i])}
              />
              {connected[id] ? (
                <Pressable
                  onPress={() => set(id, false)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`Disconnect ${name}`}
                  className={cn(
                    "size-7 items-center justify-center rounded-lg border",
                    `${SOFT_FILL} dark:border-grey-700 dark:bg-grey-700`
                  )}
                >
                  <Logout
                    width={14}
                    height={14}
                    className="text-ink-500 dark:text-snow-600"
                  />
                </Pressable>
              ) : null}
            </View>
          ))}
        </View>

        <Collapsible
          title="Automatic synchronization"
          description="Keep your reports and notes always up to date."
        >
          <View className="flex-row items-center justify-between gap-2.5">
            <Text
              className="flex-1 font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600"
              style={{ letterSpacing: -0.084 }}
            >
              Sync automatically
            </Text>
            <ToggleSwitch value={autoSync} onValueChange={setAutoSync} />
          </View>
        </Collapsible>
      </View>

      <ConnectIntegrationModal
        integration={modalIntegration}
        onClose={() => setPending(null)}
        onConnect={() => {
          if (pending) set(pending.id, true);
          setPending(null);
        }}
      />
    </ScrollView>
  );
}

const ConnectButton = ({
  connected,
  onPress,
}: {
  connected: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    disabled={connected}
    hitSlop={8}
    accessibilityRole="button"
    className={cn(
      "h-7 items-center justify-center rounded-lg border px-3",
      connected
        ? `${SOFT_FILL} dark:border-snow-300/[0.04] dark:bg-snow-300/[0.04]`
        : "border-brand-300 bg-brand-400"
    )}
  >
    <Text
      className={cn(
        "font-display-medium text-xs",
        connected ? "text-ink-500 dark:text-snow-600" : "text-white"
      )}
      style={{ letterSpacing: 0.24 }}
    >
      {connected ? "Connected" : "Connect"}
    </Text>
  </Pressable>
);

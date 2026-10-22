import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Copy, Expand } from "@/components/icons/line";
import Alert from "@/components/ui/Alert";

const MUTED = "text-ink-400 dark:text-grey-100";

export default function InviteCard({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await Clipboard.setStringAsync(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View
      className={`gap-3 p-3 rounded-xl border border-brand-100
        bg-[rgba(205,207,229,0.22)] dark:border-card-stroke dark:bg-grey-700`}
    >
      <View className="flex-row items-start gap-4">
        <View className="flex-1">
          <Text
            className="font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600"
            style={{ letterSpacing: -0.084 }}
          >
            Your meeting’s ready
          </Text>
          <Text className={`font-display-regular text-xs ${MUTED}`}>
            Send invites and start collaborating.
          </Text>
        </View>
        <Pressable
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Expand"
        >
          <Expand width={14} height={14} className={MUTED} />
        </Pressable>
      </View>

      <View
        className={`h-10 flex-row items-center gap-2.5 p-3 rounded-xl border
          border-white/[0.08] bg-white/60 dark:border-snow-300/[0.11] dark:bg-snow-300/[0.04]`}
        style={{ boxShadow: "0 1px 3px 1px rgba(0,0,0,0.08)" }}
      >
        <Text
          numberOfLines={1}
          className={`flex-1 font-display-regular text-xs ${MUTED}`}
        >
          {link}
        </Text>
        <Pressable
          onPress={copy}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Copy link"
        >
          {copied ? (
            <Text className={`font-display-medium text-xs ${MUTED}`}>
              Copied
            </Text>
          ) : (
            <Copy width={16} height={16} className={MUTED} />
          )}
        </Pressable>
      </View>

      <Alert size="sm">
        People who use this meeting link must get your permission before they
        can join.
      </Alert>
    </View>
  );
}

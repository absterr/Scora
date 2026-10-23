import { Text, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import SegmentedControl, {
  type SegmentedOption,
} from "@/components/ui/SegmentedControl";
import { formatClock, type LastMeeting } from "@/lib/last-meeting";
import { formatLongDate, toKey } from "@/lib/meetings";

export type SummaryTabName = "summary" | "transcript" | "speaker";

type MeetingInfoCardProps = {
  meeting: LastMeeting;
  tab: SummaryTabName;
  onTabChange: (tab: SummaryTabName) => void;
};

const TABS: SegmentedOption<SummaryTabName>[] = [
  { label: "Summary", value: "summary" },
  { label: "Transcript", value: "transcript" },
  { label: "Speaker", value: "speaker" },
];

const MUTED = "text-ink-400 dark:text-grey-100";

export default function MeetingInfoCard({
  meeting,
  tab,
  onTabChange,
}: MeetingInfoCardProps) {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <View
      className={`gap-3 p-3 rounded-xl border border-brand-100
        bg-[rgba(234,235,255,0.4)] dark:border-grey-500 dark:bg-grey-800`}
    >
      <View className="gap-2">
        <View className="flex-row items-center justify-between gap-2.5">
          <Text className={`font-display-regular text-xs ${MUTED}`}>
            {formatLongDate(toKey(new Date(meeting.endedAt)))}
          </Text>
          <View
            className={`px-2 py-1 rounded-full border border-brand-100
              bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-700`}
          >
            <Text className={`font-display-regular text-xs ${MUTED}`}>
              {formatClock(meeting.durationSec)} Minutes
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between gap-2.5">
          <View className="flex-1 gap-1">
            <Text
              numberOfLines={1}
              className="font-display-medium text-sm leading-[14px] text-ink-500 dark:text-snow-600"
              style={{ letterSpacing: 0.42 }}
            >
              {meeting.name}
            </Text>
            <Text
              numberOfLines={1}
              className={`font-display-regular text-sm leading-5 ${MUTED}`}
              style={{ letterSpacing: -0.084 }}
            >
              {zone}
            </Text>
          </View>
          <View className="flex-row items-center pl-[9px]">
            {meeting.participants.slice(0, 2).map((p) => (
              <Avatar key={p} name={p} className="-ml-[9px]" />
            ))}
          </View>
        </View>
      </View>
      <SegmentedControl
        options={TABS}
        value={tab}
        onValueChange={onTabChange}
      />
    </View>
  );
}

import { Text, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { formatLongDate, formatTime, type Meeting } from "@/lib/meetings";

const MUTED = "text-ink-400 dark:text-grey-100";

export default function MeetingCard({
  meeting,
  onJoin,
}: {
  meeting: Meeting;
  onJoin?: () => void;
}) {
  return (
    <View
      className={`p-3 gap-3 rounded-xl border border-brand-100
        bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-700`}
    >
      <View className="flex-row items-center justify-between gap-2.5">
        <Text className={`font-display-regular text-xs ${MUTED}`}>
          {formatLongDate(meeting.date)}
        </Text>
        <View
          className={`px-2 py-1 rounded-full border border-[rgba(205,207,229,0.22)]
            bg-[rgba(4,17,174,0.16)] dark:border-grey-500 dark:bg-grey-700`}
        >
          <Text className={`font-display-regular text-xs ${MUTED}`}>
            {formatTime(meeting.start)} -{" "}
            {formatTime(meeting.start + meeting.duration)}
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
            {meeting.timezone}
          </Text>
        </View>
        <View className="flex-row items-center">
          {meeting.invitees.slice(0, 2).map((email, i) => (
            <Avatar
              key={email}
              name={email}
              className={i > 0 ? "-ml-[9px]" : undefined}
            />
          ))}
        </View>
      </View>

      <Button label="Join Meeting" onPress={onJoin} />
    </View>
  );
}

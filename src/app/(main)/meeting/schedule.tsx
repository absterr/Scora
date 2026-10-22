import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MeetingCard from "@/components/screens/meeting/MeetingCard";
import ScheduleModal from "@/components/screens/meeting/ScheduleModal";
import WeekCalendar from "@/components/screens/meeting/WeekCalendar";
import SegmentedControl, {
  type SegmentedOption,
} from "@/components/ui/SegmentedControl";
import {
  getStatus,
  keyToDate,
  toKey,
  type Meeting,
  type Status,
} from "@/lib/meetings";

const MUTED = "text-ink-400 dark:text-grey-100";

const TABS: SegmentedOption<Status>[] = [
  { label: "Ongoing", value: "ongoing" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Last Meeting", value: "last" },
];

const NewMeetingBar = ({
  empty,
  onPress,
}: {
  empty?: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    className={`h-10 px-3 items-center justify-center rounded-xl border border-dashed
      border-brand-100 bg-[#EBECFA] dark:border-card-stroke dark:bg-grey-700`}
  >
    <Text className={`font-display-regular text-xs ${MUTED}`}>
      {empty ? "No list yet. " : ""}
      <Text className="text-brand-400 underline dark:text-brand-200">
        Create a new meeting
      </Text>
    </Text>
  </Pressable>
);

export default function Schedule() {
  const { top } = useSafeAreaInsets();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Status>("upcoming");
  const [selected, setSelected] = useState(() => new Date());

  const now = new Date();
  const key = toKey(selected);
  const visible = meetings
    .filter((m) => m.date === key && getStatus(m, now) === tab)
    .sort((a, b) => a.start - b.start);

  const handleCreate = (meeting: Meeting) => {
    setMeetings((prev) => [...prev, meeting]);
    setSelected(keyToDate(meeting.date));
    setTab(getStatus(meeting));
  };

  return (
    <>
      <ScrollView
        contentContainerClassName="gap-4 px-6 pb-6"
        contentContainerStyle={{ paddingTop: top + 24 }}
      >
        <View className="gap-1">
          <Text className="font-display-medium text-xl leading-6 text-ink-500 dark:text-snow-600">
            Schedule Meeting
          </Text>
          <Text
            className={`font-display-regular text-sm leading-5 ${MUTED}`}
            style={{ letterSpacing: -0.084 }}
          >
            View upcoming meetings and past meeting history.
          </Text>
        </View>

        {meetings.length === 0 ? (
          <NewMeetingBar empty onPress={() => setOpen(true)} />
        ) : (
          <>
            <SegmentedControl
              options={TABS}
              value={tab}
              onValueChange={setTab}
            />
            <View className="gap-6">
              <WeekCalendar selected={selected} onSelect={setSelected} />
              <View className="gap-4">
                {visible.length ? (
                  visible.map((m) => <MeetingCard key={m.id} meeting={m} />)
                ) : (
                  <Text
                    className={`text-center font-display-regular text-sm ${MUTED}`}
                  >
                    No meetings here.
                  </Text>
                )}
              </View>
            </View>
            <NewMeetingBar onPress={() => setOpen(true)} />
          </>
        )}
      </ScrollView>

      <ScheduleModal
        visible={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
}

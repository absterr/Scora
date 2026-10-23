import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MeetingInfoCard, {
  type SummaryTabName,
} from "@/components/screens/summaries/MeetingInfoCard";
import SpeakerTab from "@/components/screens/summaries/SpeakerTab";
import SummaryTab from "@/components/screens/summaries/SummaryTab";
import TranscriptTab from "@/components/screens/summaries/TranscriptTab";
import { useLastMeeting } from "@/lib/last-meeting";
import { SUMMARY } from "@/lib/mock-room";

export default function Summaries() {
  const { top } = useSafeAreaInsets();
  const last = useLastMeeting();
  const [tab, setTab] = useState<SummaryTabName>("summary");

  return (
    <ScrollView
      contentContainerClassName="gap-4 px-6 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      {last ? (
        <>
          <Text
            className="font-display-medium text-xl leading-[27px] text-ink-500 dark:text-snow-600"
            style={{ letterSpacing: -0.2 }}
          >
            {SUMMARY.title}
          </Text>
          <MeetingInfoCard meeting={last} tab={tab} onTabChange={setTab} />
          {tab === "summary" ? (
            <SummaryTab />
          ) : tab === "transcript" ? (
            <TranscriptTab />
          ) : (
            <SpeakerTab />
          )}
        </>
      ) : (
        <>
          <View className="gap-1">
            <Text className="font-display-medium text-xl leading-6 text-ink-500 dark:text-snow-600">
              Summaries
            </Text>
            <Text
              className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
              style={{ letterSpacing: -0.084 }}
            >
              End a meeting to see its summary here.
            </Text>
          </View>
          <View
            className={`h-10 px-3 items-center justify-center rounded-xl border border-dashed
            border-brand-100 bg-[#EBECFA] dark:border-card-stroke dark:bg-grey-700`}
          >
            <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
              No summaries yet.
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

import { useState } from "react";
import { View } from "react-native";

import KeyPointsCard from "@/components/screens/room/KeyPointsCard";
import LiveTranscriptCard from "@/components/screens/room/LiveTranscriptCard";
import SegmentedControl, {
  type SegmentedOption,
} from "@/components/ui/SegmentedControl";

type Tab = "keypoints" | "transcript";

const OPTIONS: SegmentedOption<Tab>[] = [
  { label: "Key Points", value: "keypoints" },
  { label: "Live Transcript", value: "transcript" },
];

export default function InsightPanel() {
  const [tab, setTab] = useState<Tab>("keypoints");

  return (
    <View className="gap-4">
      <SegmentedControl options={OPTIONS} value={tab} onValueChange={setTab} />
      {tab === "keypoints" ? <KeyPointsCard /> : <LiveTranscriptCard />}
    </View>
  );
}

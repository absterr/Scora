import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InsightPanel from "@/components/screens/room/InsightPanel";
import InviteCard from "@/components/screens/room/InviteCard";
import JoinRequestModal from "@/components/screens/room/JoinRequestModal";
import ParticipantGrid from "@/components/screens/room/ParticipantGrid";
import { type Participant } from "@/components/screens/room/ParticipantTile";
import PendingCard from "@/components/screens/room/PendingCard";
import RoomControls from "@/components/screens/room/RoomControls";
import RoomTopbar from "@/components/screens/room/RoomTopbar";
import { AVATARS } from "@/lib/avatars";
import { setLastMeeting } from "@/lib/last-meeting";

type Guest = Omit<Participant, "micOn">;

// Mock join requests, one every 3s while hosting. Replace with the real API.
const MOCK_GUESTS: Guest[] = [
  { id: "jhon", name: "Jhon Doe" },
  { id: "jane", name: "Jane Anne", avatar: AVATARS.nina },
  { id: "anneth", name: "Anneth Black", avatar: AVATARS.zack },
  { id: "clara", name: "Clara Burg", avatar: AVATARS.cleo },
  { id: "axel", name: "Axel Brooks", avatar: AVATARS.axel },
];

const MOCK_HOST: Participant = {
  id: "host",
  name: "Clara Burg",
  avatar: AVATARS.cleo,
  host: true,
  micOn: true,
};

export default function Room() {
  const router = useRouter();
  const { role, name } = useLocalSearchParams<{
    role?: "host" | "guest";
    name?: string;
  }>();
  const isHost = role !== "guest";
  const { top, bottom } = useSafeAreaInsets();

  const liveSince = useRef<number | null>(null);
  const [live, setLive] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);
  const [guests, setGuests] = useState<Participant[]>([]);
  const [handled, setHandled] = useState(0);
  const [requester, setRequester] = useState<Guest | null>(null);

  const link = useMemo(
    () =>
      "scora.co/" +
      [3, 5, 3]
        .map((n) =>
          Math.random()
            .toString(36)
            .slice(2, 2 + n)
        )
        .join("-"),
    []
  );

  const me: Participant = {
    id: "me",
    name: "Mark Burghschent",
    avatar: AVATARS.enzo,
    host: isHost,
    micOn,
  };

  const participants: Participant[] = isHost
    ? [me, ...guests]
    : [MOCK_HOST, me];

  const crowded = participants.length > 2;

  useEffect(() => {
    const t = setTimeout(() => {
      liveSince.current = Date.now();
      setLive(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isHost || !live || requester || handled >= MOCK_GUESTS.length) return;
    const t = setTimeout(() => setRequester(MOCK_GUESTS[handled]), 3000);
    return () => clearTimeout(t);
  }, [isHost, live, requester, handled]);

  const resolve = (accepted: boolean) => {
    if (accepted && requester)
      setGuests((prev) => [...prev, { ...requester, micOn: true }]);
    setHandled((n) => n + 1);
    setRequester(null);
  };

  const leave = () => router.back();

  const endMeeting = () => {
    if (!liveSince.current) return leave();
    setLastMeeting({
      name: name ?? "Instant meeting",
      endedAt: Date.now(),
      durationSec: Math.round((Date.now() - liveSince.current) / 1000),
      participants: participants.map((p) => p.name),
    });
    router.dismissTo("/summaries");
  };

  return (
    <View
      className="flex-1 bg-snow-500 dark:bg-ink-800"
      style={{ paddingTop: top + 16, paddingBottom: bottom }}
    >
      <View className="flex-1 gap-4 px-6">
        <RoomTopbar onBack={leave} onEnd={endMeeting} />
        {!live ? (
          <View className="flex-1 justify-center">
            <PendingCard onClose={leave} />
          </View>
        ) : crowded ? (
          <ScrollView
            className="flex-1"
            contentContainerClassName="gap-4"
            showsVerticalScrollIndicator={false}
          >
            <ParticipantGrid participants={participants} />
            <InsightPanel />
          </ScrollView>
        ) : (
          <View className="flex-1 gap-4">
            <ParticipantGrid participants={participants} />
            {isHost && guests.length === 0 ? <InviteCard link={link} /> : null}
          </View>
        )}
      </View>

      <RoomControls
        micOn={micOn}
        videoOn={videoOn}
        onToggleMic={() => setMicOn((v) => !v)}
        onToggleVideo={() => setVideoOn((v) => !v)}
      />

      <JoinRequestModal
        name={requester?.name ?? null}
        onAccept={() => resolve(true)}
        onDecline={() => resolve(false)}
      />
    </View>
  );
}

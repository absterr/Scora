import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InviteCard from "@/components/screens/room/InviteCard";
import JoinRequestModal from "@/components/screens/room/JoinRequestModal";
import ParticipantTile, {
  type Participant,
} from "@/components/screens/room/ParticipantTile";
import PendingCard from "@/components/screens/room/PendingCard";
import RoomControls from "@/components/screens/room/RoomControls";
import RoomTopbar from "@/components/screens/room/RoomTopbar";
import { AVATARS } from "@/lib/avatars";

export default function Room() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: "host" | "guest" }>();
  const isHost = role !== "guest";
  const { top, bottom } = useSafeAreaInsets();

  const [live, setLive] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);
  const [guests, setGuests] = useState<Participant[]>([]);
  const [requester, setRequester] = useState<string | null>(null);

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

  const leave = () => router.back();

  useEffect(() => {
    const t = setTimeout(() => setLive(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // MOCK: A guest asks to join a few seconds after the host goes live
  useEffect(() => {
    if (!isHost || !live || guests.length) return;
    const t = setTimeout(() => setRequester("Jhon Doe"), 3000);
    return () => clearTimeout(t);
  }, [isHost, live, guests.length]);

  const accept = () => {
    if (requester) setGuests([{ id: "guest-1", name: requester, micOn: true }]);
    setRequester(null);
  };

  const participants: Participant[] = [
    {
      id: "host",
      name: "Mark Burghschent",
      avatar: AVATARS.enzo,
      host: true,
      micOn,
    },
    ...guests,
  ];

  return (
    <View
      className="flex-1 bg-snow-500 dark:bg-ink-800"
      style={{ paddingTop: top + 16, paddingBottom: bottom }}
    >
      <View className="flex-1 gap-4 px-6">
        <RoomTopbar onBack={leave} onEnd={leave} />
        {live ? (
          <View className="flex-1 gap-4">
            {participants.map((p) => (
              <ParticipantTile key={p.id} participant={p} />
            ))}
            {isHost && guests.length === 0 ? <InviteCard link={link} /> : null}
          </View>
        ) : (
          <View className="flex-1 justify-center">
            <PendingCard isHost={isHost} onClose={leave} />
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
        name={requester}
        onAccept={accept}
        onDecline={() => setRequester(null)}
      />
    </View>
  );
}

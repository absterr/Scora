import { View } from "react-native";

import ParticipantTile, {
  type Participant,
} from "@/components/screens/room/ParticipantTile";

const chunk = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
    items.slice(i * size, i * size + size)
  );

export default function ParticipantGrid({
  participants,
}: {
  participants: Participant[];
}) {
  const [host, ...others] = participants;

  if (participants.length <= 2) {
    return (
      <View className="flex-1 gap-4">
        {participants.map((p) => (
          <ParticipantTile key={p.id} participant={p} className="flex-1" />
        ))}
      </View>
    );
  }

  return (
    <View className="gap-2">
      <ParticipantTile participant={host} className="aspect-[4/3] w-full" />
      {chunk(others, 2).map((row, i) => (
        <View key={i} className="flex-row gap-2">
          {row.map((p) => (
            <ParticipantTile
              key={p.id}
              participant={p}
              compact
              className="aspect-square flex-1"
            />
          ))}
          {row.length === 1 ? <View className="flex-1" /> : null}
        </View>
      ))}
    </View>
  );
}

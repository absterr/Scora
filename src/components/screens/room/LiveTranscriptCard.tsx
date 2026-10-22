import { useState } from "react";
import { Text, View } from "react-native";

import LanguagePair, { type Lang } from "@/components/screens/LanguagePair";
import GenerateStatus from "@/components/screens/room/GenerateStatus";
import Avatar from "@/components/ui/Avatar";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { AVATARS } from "@/lib/avatars";
import { SPEAKERS, TRANSCRIPT } from "@/lib/mock-room";

const STRONG = "text-ink-500 dark:text-snow-600";
const MUTED = "text-ink-400 dark:text-grey-100";

export default function LiveTranscriptCard() {
  const [captions, setCaptions] = useState(true);
  const [langs, setLangs] = useState<[Lang, Lang]>(["en", "id"]);

  return (
    <View
      className={`gap-4 rounded-xl border border-brand-100 bg-[rgba(205,207,229,0.22)]
       dark:border-card-stroke dark:bg-grey-700`}
    >
      <View className="gap-2.5 border-b border-brand-100 p-3 dark:border-card-stroke">
        <View className="flex-row items-center gap-4">
          <View className="flex-1">
            <Text
              className={`font-display-regular text-sm leading-5 ${STRONG}`}
              style={{ letterSpacing: -0.084 }}
            >
              Live Transcript
            </Text>
            <Text className={`font-display-regular text-xs ${MUTED}`}>
              See live captions during the meeting.
            </Text>
          </View>
          <ToggleSwitch value={captions} onValueChange={setCaptions} />
        </View>
        <LanguagePair
          value={langs}
          onSwap={() => setLangs(([a, b]) => [b, a])}
        />
      </View>

      <View className="gap-3 px-3 pb-3">
        {captions
          ? TRANSCRIPT.map((t) => {
              const speaker = SPEAKERS.find((s) => s.id === t.speakerId)!;
              return (
                <View
                  key={t.id}
                  className="gap-1 border-b border-dashed border-brand-100 pb-2"
                >
                  <View className="flex-row items-center justify-between gap-3">
                    <View className="flex-row items-center gap-1.5">
                      <Avatar
                        name={speaker.name}
                        source={AVATARS[speaker.avatar]}
                        size={24}
                      />
                      <Text
                        className={`font-display-regular text-xs ${STRONG}`}
                      >
                        {speaker.name}
                      </Text>
                    </View>
                    <Text className={`font-display-regular text-xs ${STRONG}`}>
                      {t.at}
                    </Text>
                  </View>
                  <Text className={`font-display-regular text-xs ${MUTED}`}>
                    {t.text[langs[1]]}
                  </Text>
                </View>
              );
            })
          : null}
        <GenerateStatus label="Listening" />
      </View>
    </View>
  );
}

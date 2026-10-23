import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { PauseCircle, Play } from "@/components/icons/solid";
import Avatar from "@/components/ui/Avatar";
import ProgressBar from "@/components/ui/ProgressBar";
import { AVATARS } from "@/lib/avatars";
import { formatClock } from "@/lib/last-meeting";
import { SPEAKERS, TRANSCRIPT, type TranscriptEntry } from "@/lib/mock-room";

const STRONG = "text-ink-500 dark:text-snow-600";
const MUTED = "text-ink-400 dark:text-grey-100";
const XS = "font-display-regular text-xs";

const splitHighlight = (t: TranscriptEntry) =>
  t.highlight
    ? ([t.highlight, t.text.en.slice(t.highlight.length).trim()] as const)
    : null;

export default function TranscriptTab() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const current = TRANSCRIPT.find((t) => t.id === playing);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (current && elapsed >= current.durationSec) setPlaying(null);
  }, [elapsed, current]);

  const toggle = (id: string) => {
    if (playing === id) return setPlaying(null);
    setElapsed(0);
    setPlaying(id);
  };

  return (
    <View className="gap-2">
      {TRANSCRIPT.map((t) => {
        const speaker = SPEAKERS.find((s) => s.id === t.speakerId)!;
        const active = playing === t.id;
        const Icon = active ? PauseCircle : Play;
        const parts = splitHighlight(t);

        return (
          <View
            key={t.id}
            className={`gap-2.5 p-3 rounded-xl border border-brand-100
              bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-800`}
          >
            <View
              className={`flex-row items-center justify-between gap-3 border-b
                border-[rgba(205,207,229,0.22)] pb-2 dark:border-grey-500`}
            >
              <View className="flex-row items-center gap-1.5">
                <Avatar
                  name={speaker.name}
                  source={AVATARS[speaker.avatar]}
                  size={24}
                />
                <Text className={`${XS} ${STRONG}`}>{speaker.name}</Text>
              </View>
              <Pressable
                onPress={() => toggle(t.id)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={active ? "Pause" : "Play"}
                className="flex-row items-center gap-1"
              >
                <Icon width={12} height={12} className={STRONG} />
                <Text className={`${XS} ${STRONG}`}>
                  {formatClock(t.durationSec)}
                </Text>
              </Pressable>
            </View>

            {active && parts ? (
              <>
                <View className="rounded-[2px] bg-[rgba(243,105,96,0.2)] px-1 py-0.5">
                  <Text className={`${XS} text-error-400`}>{parts[0]}</Text>
                </View>
                <Text className={`px-1 ${XS} ${MUTED}`}>{parts[1]}</Text>
              </>
            ) : (
              <Text className={`${XS} ${MUTED}`}>{t.text.en}</Text>
            )}

            {active ? (
              <View className="gap-1">
                <View className="flex-row justify-between">
                  <Text className={`${XS} ${MUTED}`}>
                    {formatClock(elapsed)}
                  </Text>
                  <Text className={`${XS} ${MUTED}`}>
                    {formatClock(t.durationSec)}
                  </Text>
                </View>
                <ProgressBar value={elapsed / t.durationSec} />
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AIBubble from "@/components/AIBubble";
import DocExportCard from "@/components/screens/intro/DocExportCard";
import FormatList from "@/components/screens/intro/FormatList";
import LiveTranscriptCard from "@/components/screens/intro/LiveTranscriptCard";
import { OnboardingSheet } from "@/components/screens/intro/OnboardingSheet";
import { StepSheetHandle } from "@/components/StepSheet";
import Button from "@/components/ui/Button";

const INTERVAL = 3500;
const ENTERING = FadeInDown.duration(250);
const EXITING = FadeOutUp.duration(250);

export default function Intro() {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<StepSheetHandle>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [paused]);

  const { key, title, description, Mid } = SLIDES[index];

  return (
    <>
      <View
        className="flex-1 items-center px-6"
        style={{
          paddingBottom: insets.bottom + 18,
        }}
      >
        {!sheetOpen && (
          <>
            <View className="w-full flex-1">
              <Animated.View
                key={key}
                entering={ENTERING}
                exiting={EXITING}
                className="absolute inset-0 items-center justify-center"
              >
                <Mid />
              </Animated.View>
            </View>

            <View className="w-full gap-8">
              <View className="h-[78px]">
                <Animated.View
                  key={key}
                  entering={ENTERING}
                  exiting={EXITING}
                  className="absolute inset-x-0 top-0 gap-2.5"
                >
                  <Text className="text-center font-display-medium text-xl leading-none text-ink-500 dark:text-snow-600">
                    {title}
                  </Text>
                  <Text
                    className="text-center font-display-regular text-base leading-6 text-ink-400 dark:text-grey-100"
                    style={{ letterSpacing: -0.128 }}
                  >
                    {description}
                  </Text>
                </Animated.View>
              </View>

              <Button
                label="Get started"
                onPress={() => {
                  sheetRef.current?.present();
                  setPaused(true);
                  setSheetOpen(true);
                }}
              />
            </View>
          </>
        )}
      </View>

      <OnboardingSheet
        ref={sheetRef}
        onDismiss={() => {
          setSheetOpen(false);
          setPaused(false);
        }}
      />
    </>
  );
}

const ExportMid = () => (
  <View className="items-center gap-3.5">
    <DocExportCard />
    <FormatList />
  </View>
);

const IntroBubble = () => (
  <AIBubble
    source={require("@/assets/images/ai-bubble-two.png")}
    className="h-[294px] w-[180px]"
  />
);

const SLIDES = [
  {
    key: "meeting",
    title: "AI Meeting",
    description:
      "Record conversations, get instant transcripts, and smart summaries to keep everyone aligned.",
    Mid: IntroBubble,
  },
  {
    key: "translate",
    title: "Auto Translate",
    description:
      "Record conversations, get instant transcripts, and smart summaries to keep everyone aligned.",
    Mid: LiveTranscriptCard,
  },
  {
    key: "export",
    title: "Export Documents",
    description:
      "Generate and download organized document files directly from the platform.",
    Mid: ExportMid,
  },
];

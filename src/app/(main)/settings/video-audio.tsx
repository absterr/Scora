import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRight } from "@/components/icons/line";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Collapsible from "@/components/ui/Collapsible";
import RadioButton from "@/components/ui/RadioButton";
import Selectable from "@/components/ui/Selectable";
import Slider from "@/components/ui/Slider";

const TIGHT = { letterSpacing: -0.084 };

const ROWS = [
  { label: "Video Quality", value: "HD" },
  { label: "Microphone", value: "Built-in" },
  { label: "Speaker", value: "Default" },
];

const BACKGROUNDS = ["None", "Blur", "Office"];

const MICROPHONES = [
  { label: "Default", value: "default" },
  { label: "Built-in microphone", value: "builtin" },
  { label: "Bluetooth headset", value: "bluetooth" },
];

export default function VideoAudio() {
  const { top } = useSafeAreaInsets();
  const [background, setBackground] = useState("None");
  const [microphone, setMicrophone] = useState("default");
  const [volume, setVolume] = useState(50);

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Video and Audio"
        description="Manage your meeting video and audio preferences."
      />

      <View className="gap-2">
        {ROWS.map(({ label, value }) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            className={`h-11 px-3 flex-row items-center justify-between gap-2 rounded-xl
              border border-brand-100 bg-[rgba(205,207,229,0.22)]  dark:border-grey-500 dark:bg-grey-800`}
          >
            <Text
              className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
              style={TIGHT}
            >
              {label}
            </Text>
            <View className="flex-row items-center gap-1">
              <Text
                className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                style={TIGHT}
              >
                {value}
              </Text>
              <ChevronRight
                width={16}
                height={16}
                className="text-ink-400 dark:text-grey-100"
              />
            </View>
          </Pressable>
        ))}

        <Collapsible
          title="Set Background"
          description="Choose a background to appear behind you during calls."
        >
          <View className="gap-2">
            {BACKGROUNDS.map((name) => (
              <RadioButton
                key={name}
                label={name}
                selected={background === name}
                onPress={() => setBackground(name)}
              />
            ))}
          </View>
        </Collapsible>

        <Collapsible
          defaultOpen
          title="Set Audio"
          description="Adjust your audio settings to ensure clear sound."
        >
          <View className="gap-4">
            <View className="gap-2">
              <Text
                className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
                style={TIGHT}
              >
                Microphone
              </Text>
              <Selectable
                placeholder="Select microphone"
                options={MICROPHONES}
                value={microphone}
                onValueChange={setMicrophone}
              />
            </View>
            <Slider label="Volume" value={volume} onValueChange={setVolume} />
          </View>
        </Collapsible>
      </View>
    </ScrollView>
  );
}

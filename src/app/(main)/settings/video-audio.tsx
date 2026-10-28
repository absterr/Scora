import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Checkbox from "@/components/ui/Checkbox";
import Collapsible from "@/components/ui/Collapsible";
import RadioButton from "@/components/ui/RadioButton";
import Selectable from "@/components/ui/Selectable";
import Slider from "@/components/ui/Slider";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

const TIGHT = { letterSpacing: -0.084 };

const ROWS = [{ label: "Video Quality", value: "HD" }];

const VIDEO_QUALITIES = [
  { label: "Auto", value: "auto" },
  { label: "nHD", value: "360p" },
  { label: "HD", value: "720p" },
  { label: "Full HD", value: "1080p" },
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
  const [defaultVideo, setDefaultVideo] = useState(false);
  const [quality, setQuality] = useState("auto");

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
        <Collapsible
          title="Video"
          description="Set default video behavior and resolution."
        >
          <View className="gap-4">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 gap-0.5">
                <Text
                  className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
                  style={TIGHT}
                >
                  Default Video
                </Text>
                <Text
                  className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                  style={TIGHT}
                >
                  Set your video to turn on automatically or stay off by
                  default.
                </Text>
              </View>
              <ToggleSwitch
                value={defaultVideo}
                onValueChange={setDefaultVideo}
              />
            </View>

            <View className="gap-2">
              <Text
                className="font-display-medium text-sm leading-5 text-ink-400 dark:text-grey-100"
                style={TIGHT}
              >
                Resolution
              </Text>
              <View className="flex-row justify-between py-1 gap-2">
                {VIDEO_QUALITIES.map(({ label, value }) => (
                  <Checkbox
                    key={value}
                    variant="outline"
                    label={value !== "auto" ? `${label} (${value})` : label}
                    checked={quality === value}
                    onChange={() => setQuality(value)}
                    className="pt-0"
                  />
                ))}
              </View>
            </View>
          </View>
        </Collapsible>

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

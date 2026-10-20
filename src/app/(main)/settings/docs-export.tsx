import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Collapsible from "@/components/ui/Collapsible";
import Input from "@/components/ui/Input";
import Selectable from "@/components/ui/Selectable";
import { cn } from "@/lib/utils";

const FORMATS = ["Word (.docx)", "PDF", "HTML"];

const LOCATIONS = [
  { label: "Downloads", value: "downloads" },
  { label: "Documents", value: "documents" },
  { label: "Google Drive", value: "gdrive" },
  { label: "OneDrive", value: "onedrive" },
];

const UNCHECKED =
  "border-brand-100 bg-[#E7E7E7] dark:border-snow-300/[0.11] dark:bg-snow-300/[0.04]";

export default function DocsExport() {
  const { top } = useSafeAreaInsets();
  const [format, setFormat] = useState(FORMATS[0]);
  const [pattern, setPattern] = useState("{date}-{title}");
  const [location, setLocation] = useState<string>();

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Documents and Export"
        description="Manage your generated documents and export settings in one place."
      />

      <View className="gap-2">
        <Collapsible
          defaultOpen
          title="Default Format"
          description="Choose your preferred export file type"
        >
          <View className="gap-2">
            {FORMATS.map((name) => (
              <FormatOption
                key={name}
                label={name}
                selected={format === name}
                onPress={() => setFormat(name)}
              />
            ))}
          </View>
        </Collapsible>

        <Collapsible
          title="File Naming Rule"
          description="Set a custom file name pattern."
        >
          <Input
            label="Pattern"
            value={pattern}
            onChangeText={setPattern}
            autoCapitalize="none"
          />
        </Collapsible>

        <Collapsible
          title="Default export location"
          description="Select where your files are saved"
        >
          <Selectable
            placeholder="Select location"
            options={LOCATIONS}
            value={location}
            onValueChange={setLocation}
          />
        </Collapsible>
      </View>
    </ScrollView>
  );
}

const FormatOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    hitSlop={8}
    accessibilityRole="radio"
    accessibilityState={{ checked: selected }}
    className="flex-row items-center gap-2"
  >
    <View
      className={cn(
        "size-3.5 items-center justify-center rounded-full border",
        selected ? "border-brand-400 bg-brand-400" : UNCHECKED
      )}
    >
      {selected ? (
        <Svg width={14} height={14} viewBox="0 0 14 14">
          <Path
            d="M3.5 7.2 5.8 9.4 10.5 4.6"
            stroke="#FFFFFF"
            strokeWidth={1.458}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      ) : null}
    </View>
    <Text
      className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
      style={{ letterSpacing: -0.084 }}
    >
      {label}
    </Text>
  </Pressable>
);

import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import Checkbox from "@/components/ui/Checkbox";
import Collapsible from "@/components/ui/Collapsible";
import Input from "@/components/ui/Input";
import Selectable from "@/components/ui/Selectable";

const FORMATS = ["Word (.docx)", "PDF", "HTML"];

const LOCATIONS = [
  { label: "Downloads", value: "downloads" },
  { label: "Documents", value: "documents" },
  { label: "Google Drive", value: "gdrive" },
  { label: "OneDrive", value: "onedrive" },
];

const LAYOUTS = [
  { label: "By date", value: "date" },
  { label: "Project", value: "project" },
];

export default function DocsExport() {
  const { top } = useSafeAreaInsets();
  const [format, setFormat] = useState(FORMATS[0]);
  const [pattern, setPattern] = useState("{date}-{title}");
  const [layout, setLayout] = useState(LAYOUTS[0].value);
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
              <Checkbox
                key={name}
                label={name}
                checked={format === name}
                onChange={() => setFormat(name)}
                shape="circle"
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
          title="Export folder layout"
          description="Organize exports by date or project for easy access"
        >
          <View className="gap-2">
            {LAYOUTS.map(({ label, value }) => (
              <Checkbox
                key={value}
                label={label}
                checked={layout === value}
                onChange={() => setLayout(value)}
                shape="circle"
              />
            ))}
          </View>
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

import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Play, StarsSolid } from "@/components/icons/solid";
import { GoogleDrive, OneDrive, Slack } from "@/components/icons/tools";
import LanguagePair, { type Lang } from "@/components/screens/LanguagePair";
import Button from "@/components/ui/Button";
import Selectable from "@/components/ui/Selectable";
import { SUMMARY } from "@/lib/mock-room";

const SURFACE =
  "border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-800";
const FIELD =
  "border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-card-stroke dark:bg-grey-700";
const STRONG = "text-ink-500 dark:text-snow-600";
const MUTED = "text-ink-400 dark:text-grey-100";
const XS = "font-display-regular text-xs";

const FORMATS = [
  { label: "PDF", value: "pdf" },
  { label: "Word (.docx)", value: "docx" },
  { label: "HTML", value: "html" },
];

export default function SummaryTab() {
  const [langs, setLangs] = useState<[Lang, Lang]>(["en", "id"]);
  const [format, setFormat] = useState("pdf");

  return (
    <View className="gap-4">
      <View className={`gap-2.5 p-3 rounded-xl border ${SURFACE}`}>
        <View className="border-b border-[rgba(205,207,229,0.22)] pb-2 dark:border-grey-500">
          <Text className={`${XS} ${STRONG}`}>Summary</Text>
        </View>
        <Text className={`${XS} ${MUTED}`}>{SUMMARY.text}</Text>
        <View className="gap-2">
          <Text className={`${XS} ${STRONG}`}>Key Point</Text>
          {SUMMARY.points.map((p) => (
            <View
              key={p.title}
              className="flex-row items-center justify-between gap-1"
            >
              <View className="flex-1 flex-row items-center gap-1">
                <StarsSolid
                  width={12}
                  height={12}
                  className="text-brand-400 dark:text-[#EBECFA]"
                />
                <Text className={`${XS} ${MUTED}`}>{p.title}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Play width={12} height={12} className={STRONG} />
                <Text className={`${XS} ${STRONG}`}>{p.at}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-2">
        <Text className={`${XS} ${STRONG}`}>Translate to:</Text>
        <LanguagePair
          value={langs}
          onSwap={() => setLangs(([a, b]) => [b, a])}
        />
      </View>

      <View className="flex-row gap-4">
        <View className="flex-1 gap-2">
          <Text className={`${XS} ${STRONG}`}>Share to:</Text>
          <View
            className={`h-10 flex-row items-center gap-3 px-3 rounded-xl border ${FIELD}`}
          >
            {[
              { Icon: GoogleDrive, w: 18, h: 16, label: "Google Drive" },
              { Icon: OneDrive, w: 24, h: 15, label: "OneDrive" },
              { Icon: Slack, w: 16, h: 16, label: "Slack" },
            ].map(({ Icon, w, h, label }) => (
              <Pressable
                key={label}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Share to ${label}`}
              >
                <Icon width={w} height={h} />
              </Pressable>
            ))}
          </View>
        </View>
        <View className="flex-1 gap-2">
          <Text className={`${XS} ${STRONG}`}>Export to:</Text>
          <Selectable
            options={FORMATS}
            value={format}
            onValueChange={setFormat}
            className="gap-0"
            triggerClassName="h-10 px-3"
          />
        </View>
      </View>

      <Button label="Generate" />
    </View>
  );
}

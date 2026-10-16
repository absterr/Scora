import { Text, View } from "react-native";

const TRACKING = { letterSpacing: -0.084 };
const LABEL =
  "font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100";

export default function DocExportCard() {
  return (
    <View
      className={`w-[311px] gap-5 rounded-xl border border-brand-100 bg-white
      p-3 dark:border-card-stroke dark:bg-grey-800`}
    >
      <View className="gap-1.5">
        <Text
          className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
          style={TRACKING}
        >
          Document and Export
        </Text>
        <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
          Manage your generated documents and export settings in one place.
        </Text>
      </View>

      <SliderField
        label="Resolution"
        progress={172 / 287}
        start="0px"
        end="1080px"
      />
      <SliderField label="Size" progress={57 / 287} start="0mb" end="512mb" />
    </View>
  );
}

const SliderField = ({
  label,
  progress,
  start,
  end,
}: {
  label: string;
  progress: number;
  start: string;
  end: string;
}) => {
  const percent = `${progress * 100}%` as const;

  return (
    <View className="gap-2">
      <Text className={LABEL} style={TRACKING}>
        {label}
      </Text>
      <View className="gap-0.5">
        <View className="h-3 justify-center">
          <View className="h-1.5 rounded-full bg-brand-500/[0.16] dark:bg-[rgba(70,73,255,0.22)]" />
          <View
            className="absolute left-0 h-1.5 rounded-l-full bg-brand-300"
            style={{ width: percent }}
          />
          <View
            className="absolute inset-y-0 left-0 items-end"
            style={{ width: percent }}
          >
            <View className="h-3 w-[2.66px] rounded-sm bg-brand-300" />
          </View>
        </View>
        <View className="flex-row justify-between gap-2">
          <Text className={LABEL} style={TRACKING}>
            {start}
          </Text>
          <Text className={LABEL} style={TRACKING}>
            {end}
          </Text>
        </View>
      </View>
    </View>
  );
};

import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import Svg, { Rect } from "react-native-svg";

type NotificationRowProps = {
  title: string;
  time: string;
  description: string;
};

const TILE_SHADOW = { boxShadow: "0px 2px 6px rgba(11,10,10,0.25)" };
// 11 petals, 32.73deg apart, symmetric about the vertical axis (from the logo CSS)
const PETALS = Array.from({ length: 11 }, (_, i) => 16.36 + (360 / 11) * i);
const TEXT =
  "font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100";

export default function NotificationRow({
  title,
  time,
  description,
}: NotificationRowProps) {
  const { colorScheme } = useColorScheme();
  // ink-50 on brand-400 (light), ink-500 on brand-50 (dark)
  const mark = colorScheme === "dark" ? "#101010" : "#E7E7E7";

  return (
    <View className="w-full flex-row items-center gap-2.5 rounded-xl border border-brand-100 bg-brand-50 p-2 dark:border-card-stroke dark:bg-snow-300/[0.04]">
      <View
        className="size-8 items-center justify-center rounded-lg bg-brand-400 dark:bg-brand-50"
        style={TILE_SHADOW}
      >
        <ScoraMark color={mark} />
      </View>
      <View className="flex-1 gap-0.5">
        <View className="flex-row items-center justify-between gap-2.5">
          <Text
            numberOfLines={1}
            className="flex-1 font-display-medium text-xs leading-4 text-ink-500 dark:text-snow-600"
          >
            {title}
          </Text>
          <Text className={TEXT}>{time}</Text>
        </View>
        <Text numberOfLines={1} className={TEXT}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const ScoraMark = ({ color }: { color: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16">
    {PETALS.map((angle) => (
      <Rect
        key={angle}
        x={7.095}
        y={0}
        width={1.81}
        height={5.73}
        rx={0.905}
        fill={color}
        transform={`rotate(${angle} 8 8)`}
      />
    ))}
  </Svg>
);

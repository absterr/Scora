import type { FC } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";

export default function FlagBadge({ flag: Flag }: { flag: FC<SvgProps> }) {
  return (
    <View
      className={`size-6 overflow-hidden rounded-full border-[0.96px]
        border-snow-600 dark:border-grey-700`}
    >
      <Flag width="100%" height="100%" />
    </View>
  );
}

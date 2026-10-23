import { View } from "react-native";

import { AppIcon } from "@/components/icons/app";

export default function AppTile() {
  return (
    <View
      className={`size-[60px] items-center justify-center rounded-xl
        border-[1.5px] border-brand-100 bg-brand-400 dark:bg-[#EBECFA]`}
    >
      <AppIcon
        width={40}
        height={40}
        className="text-ink-50 dark:text-ink-500"
      />
    </View>
  );
}

import { View } from "react-native";

import {
  AcrobatPDF,
  GoogleDrive,
  MicrosoftWord,
} from "@/components/icons/tools";

const TILE =
  "size-[68px] items-center justify-center rounded-2xl bg-brand-50 dark:bg-grey-500";
const BLUR = { filter: [{ blur: 3 }] };

export default function FormatList() {
  return (
    <View className="w-[420px] flex-row items-center gap-5 self-center">
      <View className={TILE} style={BLUR} />
      <View className={TILE}>
        <AcrobatPDF width={40} height={40} />
      </View>
      <View className={TILE}>
        <MicrosoftWord width={40} height={40} />
      </View>
      <View className={TILE}>
        <GoogleDrive width={40} height={36} />
      </View>
      <View className={TILE} style={BLUR} />
    </View>
  );
}

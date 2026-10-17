import { useColorScheme } from "nativewind";
import { Image, View } from "react-native";

import { Bezel, StatusBar } from "@/components/icons/app";

const GRADIENT = {
  light: require("@/assets/images/light-gradient-bg.png"),
  dark: require("@/assets/images/dark-gradient-bg.png"),
};

const LOGO = {
  light: require("@/assets/images/logo-dark.png"),
  dark: require("@/assets/images/logo-light.png"),
};

// brand-400 (light), brand-200 (dark)
const FRAME_TINT = { light: "#3B49BB", dark: "#8E96D8" };

export default function PhonePreview() {
  const { colorScheme } = useColorScheme();
  const mode = colorScheme === "dark" ? "dark" : "light";

  return (
    <View className="h-[577px] w-[283px]">
      <View
        className={`absolute left-[3px] top-px h-[590px] w-[277px]
            overflow-hidden rounded-[50px] border-[0.64px] border-brand-200
           bg-brand-50 dark:border-transparent dark:bg-ink-800`}
      >
        <Image
          source={mode === "dark" ? GRADIENT.dark : GRADIENT.light}
          resizeMode="cover"
          className="absolute inset-x-0 top-0 w-full"
          style={{ aspectRatio: 375 / 443 }}
        />
      </View>

      <StatusBar
        width={273}
        height={32}
        className="absolute left-1.5 top-[18px] text-ink-400 dark:text-grey-100"
      />

      <View className="absolute inset-x-0 top-[86px] items-center">
        <Image
          source={LOGO[mode]}
          resizeMode="contain"
          className="h-[68px] w-[84px]"
        />
      </View>

      <Bezel className="absolute inset-0 h-full w-full text-brand-400 dark:text-brand-200" />
    </View>
  );
}

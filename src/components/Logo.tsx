import { Image } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("@/assets/images/small-logo.png")}
      resizeMode="contain"
      accessibilityLabel="Scora"
      className="h-7 w-[120px]"
    />
  );
}

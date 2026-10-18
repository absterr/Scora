import { Text, View } from "react-native";

type AuthHeaderProps = { title: string; subtitle: React.ReactNode };

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <View className="w-full items-center gap-3">
      <Text className="text-center font-display-medium text-xl leading-none text-ink-500 dark:text-snow-600">
        {title}
      </Text>
      <Text
        className="text-center font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
        style={{ letterSpacing: -0.084 }}
      >
        {subtitle}
      </Text>
    </View>
  );
}

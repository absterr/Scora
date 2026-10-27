import { Text, View } from "react-native";

export default function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View className="items-center gap-0.5">
      <Text
        className="text-center font-display-medium text-base leading-6 text-ink-500 dark:text-snow-600"
        style={{ letterSpacing: -0.176 }}
      >
        {title}
      </Text>
      <Text
        className="text-center font-display-regular text-sm text-ink-400 dark:text-grey-100"
        style={{ letterSpacing: -0.084 }}
      >
        {subtitle}
      </Text>
    </View>
  );
}

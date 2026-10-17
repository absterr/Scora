import { Pressable, Text } from "react-native";

import { cn } from "@/lib/utils";

type AuthSwitchProps = {
  prompt: string;
  action: string;
  onPress: () => void;
  className?: string;
};

export default function AuthSwitch({
  prompt,
  action,
  onPress,
  className,
}: AuthSwitchProps) {
  return (
    <Pressable accessibilityRole="link" hitSlop={12} onPress={onPress}>
      <Text
        className={cn(
          "text-center font-display-regular text-sm leading-5",
          className
        )}
        style={{ letterSpacing: -0.084 }}
      >
        {`${prompt} `}
        <Text className="font-display-medium text-ink-500 dark:text-snow-600">
          {action}
        </Text>
      </Text>
    </Pressable>
  );
}

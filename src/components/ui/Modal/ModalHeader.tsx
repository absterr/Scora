import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { cn } from "@/lib/utils";

type ModalHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export default function ModalHeader({
  title,
  description,
  children,
  className,
}: ModalHeaderProps) {
  return (
    <View className={cn("items-center gap-6", className)}>
      {children}
      <View className="w-full gap-0.5">
        <Text
          className="text-center font-display-medium text-base leading-6 text-ink-500 dark:text-snow-600"
          style={{ letterSpacing: -0.176 }}
        >
          {title}
        </Text>
        {description ? (
          <Text
            className="text-center font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
            style={{ letterSpacing: -0.084 }}
          >
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

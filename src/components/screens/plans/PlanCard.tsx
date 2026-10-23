import { Text, View } from "react-native";

import { CheckCircle } from "@/components/icons/solid";
import Button from "@/components/ui/Button";

const TIGHT = { letterSpacing: -0.084 };

export default function PlanCard({
  title,
  description,
  price,
  features,
  onUpgrade,
}: {
  title: string;
  description: string;
  price: string;
  features: string[];
  onUpgrade?: () => void;
}) {
  return (
    <View
      className={`gap-4 rounded-2xl p-4 border border-brand-100
        bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-snow-300/[0.04]`}
    >
      <View className="gap-0.5">
        <Text
          className="font-display-medium text-base leading-6 text-ink-500 dark:text-snow-600"
          style={{ letterSpacing: -0.176 }}
        >
          {title}
        </Text>
        <Text
          className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={TIGHT}
        >
          {description}
        </Text>
      </View>

      <Text
        className="text-center font-display-medium text-2xl leading-8 text-ink-500 dark:text-snow-600"
        style={{ letterSpacing: -0.36 }}
      >
        {price}
      </Text>

      <Button
        variant="accent"
        size="sm"
        label="Upgrade Plan"
        onPress={onUpgrade}
      />

      <View className="gap-3">
        {features.map((feature) => (
          <View key={feature} className="flex-row items-start gap-2">
            <View className="h-5 justify-center">
              <CheckCircle
                width={16}
                height={16}
                className="text-brand-400 dark:text-snow-600"
              />
            </View>
            <Text
              className="flex-1 font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
              style={TIGHT}
            >
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

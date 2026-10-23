import { Text, View } from "react-native";

import { CheckCircle } from "@/components/icons/solid";

const COLUMNS = ["Basic", "Premium", "Custom"];

// Order matches COLUMNS
const ROWS = [
  { label: "Meetings & Transcripts", included: [true, true, true] },
  { label: "Export Without Watermark", included: [false, true, false] },
  { label: "Multi-language Support", included: [false, true, false] },
  {
    label: "Advanced Security (SSO, Compliance)",
    included: [false, false, true],
  },
  { label: "Priority Support", included: [false, true, true] },
];

const TIGHT = { letterSpacing: -0.084 };
const LABEL =
  "w-[88px] font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100";

export default function ComparePlans() {
  return (
    <View
      className={`gap-6 p-4 rounded-2xl border border-brand-100
        bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-snow-300/[0.04]`}
    >
      <View className="gap-0.5">
        <Text
          className="font-display-medium text-base leading-6 text-ink-500 dark:text-snow-600"
          style={{ letterSpacing: -0.176 }}
        >
          Compare Plans
        </Text>
        <Text
          className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={TIGHT}
        >
          Easily compare options to match your team’s needs.
        </Text>
      </View>

      <View className="gap-4">
        <View className="flex-row items-center gap-2">
          <Text
            className="w-[88px] font-display-medium text-base leading-6 text-ink-400 dark:text-grey-100"
            style={{ letterSpacing: -0.176 }}
          >
            Features
          </Text>
          <View className="flex-1 flex-row">
            {COLUMNS.map((column) => (
              <Text
                key={column}
                numberOfLines={1}
                className={`flex-1 text-center font-display-medium text-base
                  leading-6 text-ink-400 dark:text-grey-100`}
                style={{ letterSpacing: -0.176 }}
              >
                {column}
              </Text>
            ))}
          </View>
        </View>

        {ROWS.map(({ label, included }) => (
          <View key={label} className="flex-row items-center gap-2">
            <Text className={LABEL} style={TIGHT}>
              {label}
            </Text>
            <View className="flex-1 flex-row">
              {included.map((yes, i) => (
                <View key={COLUMNS[i]} className="flex-1 items-center">
                  {yes ? (
                    <CheckCircle
                      width={16}
                      height={16}
                      className="text-brand-400 dark:text-snow-600"
                    />
                  ) : (
                    <Text
                      className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                      style={TIGHT}
                    >
                      -
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

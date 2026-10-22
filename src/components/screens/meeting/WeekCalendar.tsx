import { Pressable, Text, View } from "react-native";

import { ChevronLeft, ChevronRight } from "@/components/icons/line";
import { addDays, getWeek, MONTHS, toKey, WEEKDAYS } from "@/lib/meetings";
import { cn } from "@/lib/utils";

const MUTED = "text-ink-400 dark:text-grey-100";

export default function WeekCalendar({
  selected,
  onSelect,
}: {
  selected: Date;
  onSelect: (date: Date) => void;
}) {
  const week = getWeek(selected);
  const selectedKey = toKey(selected);

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Text
          className={`font-display-medium text-base leading-6 ${MUTED}`}
          style={{ letterSpacing: -0.176 }}
        >
          {MONTHS[selected.getMonth()]} {selected.getFullYear()}
        </Text>
        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={() => onSelect(addDays(selected, -7))}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Previous week"
          >
            <ChevronLeft width={16} height={16} className={MUTED} />
          </Pressable>
          <Pressable
            onPress={() => onSelect(addDays(selected, 7))}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Next week"
          >
            <ChevronRight width={16} height={16} className={MUTED} />
          </Pressable>
        </View>
      </View>

      <View className="flex-row justify-between">
        {week.map((day, i) => {
          const active = toKey(day) === selectedKey;
          return (
            <View key={i} className="items-center gap-2.5">
              <Text
                className={`w-7 text-center font-display-regular text-xs ${MUTED}`}
              >
                {WEEKDAYS[i]}
              </Text>
              <Pressable
                onPress={() => onSelect(day)}
                hitSlop={6}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                accessibilityLabel={`${day.getDate()} ${MONTHS[day.getMonth()]}`}
                className={cn(
                  "size-[29px] items-center justify-center rounded-lg border",
                  active
                    ? "border-brand-300 bg-brand-400"
                    : "border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-700"
                )}
              >
                <Text
                  className={cn(
                    "font-display-regular text-sm",
                    active ? "text-snow-500 dark:text-snow-700" : MUTED
                  )}
                >
                  {day.getDate()}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

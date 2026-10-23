import { useColorScheme } from "nativewind";
import { useRef, useState, type ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { ChevronDown, Search } from "@/components/icons/line";
import { cn } from "@/lib/utils";

export type SelectableOption = {
  label: string;
  value: string;
  display?: string;
  meta?: string;
  icon?: ReactNode;
};

type SelectableProps = {
  options: SelectableOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
  variant?: "default" | "grouped";
  className?: string;
  triggerClassName?: string;
};

const ROW = 40;
const MENU_PADDING = 10;
const MAX_MENU_HEIGHT = 250; // six rows
const GAP = 24;
const SCREEN_MARGIN = 8;
const SEARCH_COLOR = { light: "#404040", dark: "#BCBCBC" }; // ink-400 (light), grey-100 (dark)
const FIELD_SHADOW = { boxShadow: "0 1px 3px 1px rgba(0,0,0,0.08)" };
const MENU_SHADOW = { boxShadow: "0 2px 4px rgba(24,24,24,0.08)" };

export default function Selectable({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  label,
  searchPlaceholder,
  variant = "default",
  className,
  triggerClassName,
}: SelectableProps) {
  const { colorScheme } = useColorScheme();
  const { height: screenHeight } = useWindowDimensions();
  const fieldRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [query, setQuery] = useState("");

  const selected = options.find((o) => o.value === value);
  const visible = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const rows = (list: unknown[]) => list.length + (searchPlaceholder ? 1 : 0);
  const menuHeight = Math.min(
    MAX_MENU_HEIGHT,
    MENU_PADDING + ROW * rows(visible)
  );
  const top = above
    ? Math.max(SCREEN_MARGIN, anchor.y - GAP - menuHeight)
    : anchor.y + anchor.height + GAP;

  const openMenu = () => {
    fieldRef.current?.measureInWindow((x, y, width, height) => {
      const fullHeight = Math.min(
        MAX_MENU_HEIGHT,
        MENU_PADDING + ROW * rows(options)
      );
      setAnchor({ x, y, width, height });
      setAbove(y + height + GAP + fullHeight > screenHeight - SCREEN_MARGIN);
      setOpen(true);
    });
  };

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const fill =
    variant === "default"
      ? "bg-white/60 dark:bg-snow-300/[0.04]"
      : "bg-[#F0F1F5] dark:bg-snow-300/[0.04]";
  const border =
    variant === "default"
      ? open
        ? "border-brand-400"
        : "border-white/[0.08] dark:border-snow-300/[0.11]"
      : "border-brand-100 dark:border-grey-500";

  return (
    <View className={cn("w-full gap-2", className)}>
      {label ? (
        <Text className="font-display-regular text-sm text-ink-500 dark:text-snow-600">
          {label}
        </Text>
      ) : null}

      <Pressable
        ref={fieldRef}
        onPress={openMenu}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        className={cn(
          "h-11 w-full flex-row items-center gap-2 rounded-xl border px-4",
          fill,
          border,
          triggerClassName
        )}
        style={variant === "default" ? FIELD_SHADOW : undefined}
      >
        {selected?.icon}
        <Text
          numberOfLines={1}
          className={cn(
            "flex-1 font-display-regular text-sm",
            selected
              ? "text-ink-500 dark:text-white"
              : "text-ink-400 dark:text-grey-100"
          )}
        >
          {selected ? (selected.display ?? selected.label) : placeholder}
        </Text>
        <ChevronDown
          width={16}
          height={16}
          className="text-ink-400 dark:text-grey-100"
        />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={close}
      >
        <View className="flex-1">
          <Pressable style={StyleSheet.absoluteFill} onPress={close} />
          <View
            className="absolute rounded-xl border border-brand-100 bg-snow-500 py-1 dark:border-card-stroke dark:bg-grey-600"
            style={[
              MENU_SHADOW,
              {
                top,
                left: anchor.x,
                width: anchor.width,
                maxHeight: MAX_MENU_HEIGHT,
              },
            ]}
          >
            {searchPlaceholder ? (
              <View className="h-10 flex-row items-center gap-2 px-4">
                <Search
                  width={16}
                  height={16}
                  className="text-ink-400 dark:text-grey-100"
                />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={
                    colorScheme === "dark"
                      ? SEARCH_COLOR.dark
                      : SEARCH_COLOR.light
                  }
                  className="flex-1 p-0 font-display-regular text-[14px] text-ink-400 dark:text-grey-100"
                />
              </View>
            ) : null}
            <ScrollView keyboardShouldPersistTaps="handled">
              {visible.map((option) => (
                <OptionRow
                  key={option.value}
                  option={option}
                  selected={option.value === value}
                  onPress={() => {
                    onValueChange(option.value);
                    close();
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const OptionRow = ({
  option,
  selected,
  onPress,
}: {
  option: SelectableOption;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityState={{ selected }}
    className="px-1.5 py-px"
  >
    {({ pressed }) => {
      const highlighted = pressed || selected;
      const text = highlighted
        ? "text-ink-500 dark:text-snow-600"
        : "text-ink-400 dark:text-grey-100";
      return (
        <View
          className={cn(
            "h-[38px] flex-row items-center gap-2 rounded-xl border px-2.5",
            highlighted
              ? "border-brand-200 bg-[rgba(234,235,255,0.16)] dark:border-brand-300 dark:bg-card-stroke"
              : "border-transparent"
          )}
        >
          {option.icon}
          <Text className={cn("flex-1 font-display-regular text-sm", text)}>
            {option.label}
          </Text>
          {option.meta ? (
            <Text className={cn("font-display-regular text-sm", text)}>
              {option.meta}
            </Text>
          ) : null}
        </View>
      );
    }}
  </Pressable>
);

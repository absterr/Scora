import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "../icons/line";

type InputProps = TextInputProps & {
  label: string;
  error?: string;
  invalid?: boolean;
  isPassword?: boolean;
  className?: string;
};

export default function Input({
  label,
  error,
  invalid,
  isPassword = false,
  secureTextEntry,
  onFocus,
  onBlur,
  className,
  ...props
}: InputProps) {
  const { colorScheme } = useColorScheme();
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const borderClass =
    error || invalid
      ? "border-error-500"
      : focused
        ? "border-brand-400"
        : "border-white/[0.08] dark:border-snow-300/[0.11]";

  return (
    <View className={cn("w-full gap-2", className)}>
      <Text
        className="font-display-medium text-sm leading-none text-ink-400 dark:text-grey-100"
        style={{ letterSpacing: 0.42 }}
      >
        {label}
      </Text>

      <View
        className={cn(
          "h-11 w-full flex-row items-center gap-2 rounded-xl border bg-white/60 px-4 dark:bg-snow-300/[0.04]",
          borderClass
        )}
        style={{ boxShadow: "0 1px 3px 1px rgba(0,0,0,0.08)" }}
      >
        <TextInput
          secureTextEntry={isPassword ? !visible : secureTextEntry}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          // snow-800 (light), ink-400 (dark)
          placeholderTextColor={colorScheme === "dark" ? "#404040" : "#8A8A8A"}
          className="flex-1 p-0 font-display-regular text-[14px] text-ink-500 dark:text-white"
          {...props}
        />

        {isPassword ? (
          <Pressable
            onPress={() => setVisible((v) => !v)}
            hitSlop={8}
            accessibilityLabel="Toggle password visibility"
          >
            {visible ? (
              <EyeOff width={16} height={16} className="text-grey-400" />
            ) : (
              <Eye width={16} height={16} className="text-grey-400" />
            )}
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text className="font-display-regular text-sm text-ink-400 dark:text-grey-100">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

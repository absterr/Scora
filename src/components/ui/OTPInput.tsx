import { useColorScheme } from "nativewind";
import { useRef, useState } from "react";
import { TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

type OTPInputProps = {
  length?: number;
  value: string;
  onChangeValue: (value: string) => void;
  className?: string;
};

export default function OTPInput({
  length = 6,
  value,
  onChangeValue,
  className,
}: OTPInputProps) {
  const { colorScheme } = useColorScheme();
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const handleChange = (text: string, index: number) => {
    const entered = text.replace(/\D/g, "");
    const next = digits.slice();

    if (entered.length > 1) {
      const chars = entered.slice(0, length - index).split("");
      chars.forEach((digit, i) => {
        next[index + i] = digit;
      });
      onChangeValue(next.join("").slice(0, length));

      const nextIndex = Math.min(index + chars.length, length - 1);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    next[index] = entered;
    onChangeValue(next.join("").slice(0, length));

    if (entered && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View
      className={cn("w-full flex-row items-center justify-between", className)}
    >
      {digits.map((digit, index) => {
        return (
          <View
            key={index}
            className={`h-11 w-11 items-center justify-center rounded-lg border bg-white/60
               border-white/[0.08] dark:bg-snow-300/[0.04] dark:border-snow-300/[0.11]`}
            style={{ boxShadow: "0 1px 3px 1px rgba(0,0,0,0.08)" }}
          >
            <TextInput
              ref={(input) => {
                inputsRef.current[index] = input;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              onFocus={() => setFocusedIndex(index)}
              onBlur={() =>
                setFocusedIndex((prev) => (prev === index ? null : prev))
              }
              keyboardType="number-pad"
              maxLength={length}
              selectionColor={colorScheme === "dark" ? "#FFFFFF" : "#101010"}
              accessibilityLabel={`Verification code digit ${index + 1}`}
              className={cn(
                "h-full w-full p-0 text-center font-display-regular text-sm",
                digit
                  ? "text-ink-500 dark:text-white"
                  : "text-snow-800 dark:text-grey-400"
              )}
            />
          </View>
        );
      })}
    </View>
  );
}

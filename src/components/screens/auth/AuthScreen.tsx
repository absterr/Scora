import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

type AuthScreenProps = { children: ReactNode; className?: string };

export default function AuthScreen({ children, className }: AuthScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="grow"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          className={cn("flex-1 px-6 pt-16", className)}
          style={{ paddingBottom: insets.bottom + 30 }}
        >
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { BlurView } from "expo-blur";
import { useColorScheme } from "nativewind";
import { useEffect, useId, type ReactNode } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { useModalHost } from "./ModalProvider";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  topBar?: ReactNode;
  handle?: boolean;
  className?: string;
};

export default function Modal({
  visible,
  onClose,
  children,
  topBar,
  handle,
  className,
}: ModalProps) {
  const id = useId();
  const { targetRef, show, hide } = useModalHost();
  const { colorScheme } = useColorScheme();
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const node = (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={StyleSheet.absoluteFill}
    >
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 justify-center px-3"
      >
        <BlurView
          blurTarget={targetRef}
          blurMethod="dimezisBlurView"
          intensity={30}
          tint={colorScheme === "dark" ? "dark" : "light"}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        />
        <View
          className="bg-black/30"
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        />
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Close"
        />
        <View
          className={cn(
            "px-3 pb-4 pt-6 gap-6 rounded-2xl border border-brand-100 bg-snow-500 dark:border-grey-500 dark:bg-grey-800",
            className
          )}
          style={{ maxHeight: height - top - bottom - 32 }}
        >
          {topBar}
          <ScrollView
            contentContainerClassName="gap-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
          {handle && (
            <View className="h-[5px] w-10 self-center rounded-full bg-ink-200 dark:bg-snow-600" />
          )}
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );

  // Runs every render so the portal always holds the latest children.
  useEffect(() => {
    if (visible) show(id, node);
    else hide(id);
  });

  useEffect(() => () => hide(id), [id, hide]);

  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [visible, onClose]);

  return null;
}

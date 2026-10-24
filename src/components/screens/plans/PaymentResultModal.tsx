import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppIcon } from "@/components/icons/app";
import { CheckCircle, XCircle } from "@/components/icons/solid";
import Button from "@/components/ui/Button";
import { Modal, ModalHeader } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

export type PaymentResult = "success" | "failed";

type PaymentResultModalProps = {
  visible: boolean;
  status: PaymentResult;
  onClose: () => void;
  onPrimary: () => void;
  onSecondary?: () => void;
};

const CONTENT = {
  success: {
    title: "Payment Successful",
    description: "Your transaction has been completed securely.",
    ring: "bg-[rgba(70,73,255,0.22)]",
    colors: ["#32B6FF", "#6939EE"],
    start: { x: 0.2, y: 0 },
    end: { x: 0.8, y: 1 },
    Icon: CheckCircle,
    primary: "Get Started",
    secondary: "Download Invoice",
  },
  failed: {
    title: "Payment Failed",
    description:
      "We couldn’t process your payment. Please try again or use a different method.",
    ring: "bg-[rgba(243,105,96,0.2)]",
    colors: ["#E13065", "#FFB5CB"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    Icon: XCircle,
    primary: "Change Payment Method",
    secondary: "Dismiss",
  },
} as const;

const TILE_SHADOW = { boxShadow: "0 2px 6px rgba(11,10,10,0.25)" };

export default function PaymentResultModal({
  visible,
  status,
  onClose,
  onPrimary,
  onSecondary,
}: PaymentResultModalProps) {
  const c = CONTENT[status];

  return (
    <Modal visible={visible} onClose={onClose} handle className="pt-10">
      <ModalHeader title={c.title} description={c.description}>
        <View className="size-[115px] items-center justify-center rounded-full">
          <View
            className={cn(
              "size-[115px] items-center justify-center rounded-full",
              c.ring
            )}
          >
            <Pulse className={c.ring} />
            <LinearGradient
              colors={c.colors}
              start={c.start}
              end={c.end}
              style={{
                width: 75,
                height: 75,
                borderRadius: 38,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <c.Icon width={40} height={40} className="text-brand-50" />
            </LinearGradient>
          </View>
        </View>
      </ModalHeader>

      {status === "success" ? (
        <View
          className={`flex-row items-center gap-2.5 rounded-xl border border-brand-100
            bg-[#EBECFA] p-3 dark:border-grey-500 dark:bg-snow-300/[0.04]`}
        >
          <View
            className="size-8 items-center justify-center rounded-lg bg-brand-400 dark:bg-[#EBECFA]"
            style={TILE_SHADOW}
          >
            <AppIcon
              width={16}
              height={16}
              className="text-ink-50 dark:text-ink-500"
            />
          </View>
          <View className="flex-1 gap-1">
            <Text
              className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
              style={{ letterSpacing: -0.084 }}
            >
              Auto-Upgrade Entitlements
            </Text>
            <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
              Auto-upgrade access for eligible users.
            </Text>
          </View>
        </View>
      ) : null}

      <View className="gap-2">
        <Button label={c.primary} onPress={onPrimary} />
        <Button
          label={c.secondary}
          variant="ghost"
          className="h-[42px]"
          onPress={onSecondary}
        />
      </View>
    </Modal>
  );
}

const Pulse = ({ className }: { className: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(withTiming(1, { duration: 900 }));
  }, [progress]);

  const style = useAnimatedStyle(() => ({
    opacity: 1 - progress.get(),
    transform: [{ scale: 1 + 0.5 * progress.get() }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      className={cn("absolute size-[75px] rounded-full", className)}
      style={style}
    />
  );
};

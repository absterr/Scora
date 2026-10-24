import { Pressable, ScrollView, Text, View } from "react-native";

import { ChevronRight } from "@/components/icons/line";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { ModalHeader, ModalTopbar } from "@/components/ui/Modal";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils";

type ReviewStepProps = {
  name: string;
  billingId?: string;
  planTitle: string;
  price: string;
  autoRenew: boolean;
  loading?: boolean;
  onAutoRenewChange: (value: boolean) => void;
  onBack: () => void;
  onConfirm: () => void;
};

const ADMIN_FEE = 0.05;
const TIGHT = { letterSpacing: -0.084 };
const FIELD_SHADOW = { boxShadow: "0 1px 3px 1px rgba(0,0,0,0.08)" };
const MUTED =
  "font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100";
const STRONG =
  "font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600";
const PANEL =
  "border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-700";
const FIELD =
  "border-white/[0.08] bg-white/60 dark:border-snow-300/[0.11] dark:bg-snow-300/[0.04]";

export default function ReviewStep({
  name,
  billingId,
  planTitle,
  price,
  autoRenew,
  loading,
  onAutoRenewChange,
  onBack,
  onConfirm,
}: ReviewStepProps) {
  const amount = parseFloat(price.replace(/[^\d.]/g, ""));
  const total = (amount * (1 + ADMIN_FEE)).toFixed(2);

  return (
    <View className="flex-1 gap-6">
      <ModalTopbar onBack={onBack} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <ModalHeader
          title="Review Payment"
          description="Check and confirm your payment details before proceeding."
        />

        <View className="gap-2">
          <Text className={MUTED} style={TIGHT}>
            Inquiry detail
          </Text>
          <View className="gap-2">
            <LinkRow label="Name" value={name} field />
            {billingId ? (
              <LinkRow label="Billing ID" value={billingId} field />
            ) : null}
          </View>
        </View>

        <View className="gap-2">
          <Text className={MUTED} style={TIGHT}>
            Payment detail
          </Text>
          <View className={cn("gap-2.5 rounded-xl border p-3", PANEL)}>
            <View className="flex-row items-center justify-between gap-2 border-b border-ink-50 pb-3 dark:border-snow-300/[0.04]">
              <Text className={STRONG} style={TIGHT}>
                Bill Amount
              </Text>
              <Text className={MUTED} style={TIGHT}>
                {price.split(" / ")[0]} ({planTitle})
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-2.5">
              <View>
                <Text
                  className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
                  style={TIGHT}
                >
                  Subscription Plan
                </Text>
                <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
                  Auto-Renew
                </Text>
              </View>
              <ToggleSwitch
                value={autoRenew}
                onValueChange={onAutoRenewChange}
              />
            </View>
          </View>
          <LinkRow label="Admin Fee" value={`${ADMIN_FEE * 100}%`} />
        </View>

        <View className="flex-row items-start justify-between gap-6">
          <Text className={STRONG} style={TIGHT}>
            Total Payment
          </Text>
          <Text className={STRONG} style={TIGHT}>
            ${total}
          </Text>
        </View>

        <Alert size="sm">
          All your transactions are secure and fast. By continuing, you agree to
          the Terms and Conditions.
        </Alert>
      </ScrollView>
      <Button
        label={loading ? "Processing..." : "Pay Now"}
        disabled={loading}
        onPress={onConfirm}
      />
    </View>
  );
}

type LinkRowProps = { label: string; value: string; field?: boolean };

const LinkRow = ({ label, value, field }: LinkRowProps) => (
  <Pressable
    accessibilityRole="button"
    className={cn(
      "h-11 flex-row items-center justify-between gap-2 rounded-xl border px-3",
      field ? FIELD : PANEL
    )}
    style={field ? FIELD_SHADOW : undefined}
  >
    <Text className={MUTED} style={TIGHT}>
      {label}
    </Text>
    <View className="flex-row items-center gap-1">
      <Text className={STRONG} style={TIGHT}>
        {value}
      </Text>
      <ChevronRight width={16} height={16} className="text-snow-700" />
    </View>
  </Pressable>
);

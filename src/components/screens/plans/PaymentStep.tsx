import { type FC } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Path, type SvgProps } from "react-native-svg";

import { Bank, Plus } from "@/components/icons/line";
import { LemonSqueezy, MasterCard, Paypal } from "@/components/icons/payment";
import Button from "@/components/ui/Button";
import Expandable from "@/components/ui/Expandable";
import Input from "@/components/ui/Input";
import { ModalHeader, ModalTopbar } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { validExpiry } from "@/lib/validation";

export type PaymentMethod = "card" | "lemonsqueezy" | "paypal" | "bank";
export type CardDetails = { number: string; expiry: string; cvv: string };

export const EMPTY_CARD: CardDetails = { number: "", expiry: "", cvv: "" };

const METHODS: { key: PaymentMethod; label: string; Icon: FC<SvgProps> }[] = [
  { key: "card", label: "Credit or Debit Card", Icon: MasterCard },
  { key: "lemonsqueezy", label: "Lemon Squeezy", Icon: LemonSqueezy },
  { key: "paypal", label: "PayPal", Icon: Paypal },
  { key: "bank", label: "Bank Transfer", Icon: Bank },
];

export const PAYMENT_LABELS = Object.fromEntries(
  METHODS.map((m) => [m.key, m.label])
) as Record<PaymentMethod, string>;

type PaymentStepProps = {
  method: PaymentMethod;
  card: CardDetails;
  onSelect: (method: PaymentMethod) => void;
  onCardChange: (key: keyof CardDetails, value: string) => void;
  onBack: () => void;
  onNext: () => void;
};

const TIGHT = { letterSpacing: -0.084 };
const LABEL =
  "font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100 tracking-tighter";
const ROW = "bg-[rgba(205,207,229,0.22)] p-3 dark:bg-grey-700";
const DIVIDER = "border-b border-ink-50 dark:border-snow-300/[0.04]";

const groupDigits = (digits: string) => digits.replace(/(.{4})/g, "$1 ").trim();
const formatExpiry = (text: string) => {
  const digits = text.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};

export default function PaymentStep({
  method,
  card,
  onSelect,
  onCardChange,
  onBack,
  onNext,
}: PaymentStepProps) {
  const cardComplete =
    card.number.length >= 13 &&
    validExpiry(card.expiry) &&
    card.cvv.length >= 3;

  const canContinue = method !== "card" || cardComplete;

  return (
    <View className="flex-1 gap-6">
      <ModalTopbar onBack={onBack} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <ModalHeader
          title="Payment Methods"
          description="All transactions are secure and encrypted"
        />

        <View className="gap-2">
          <Text className={LABEL} style={TIGHT}>
            Select a payment method
          </Text>
          <View className="overflow-hidden rounded-xl border border-brand-100 dark:border-grey-500">
            {METHODS.map(({ key, label, Icon }) => {
              const selected = method === key;
              return (
                <View key={key} className={cn(ROW, DIVIDER)}>
                  <Pressable
                    onPress={() => onSelect(key)}
                    hitSlop={12}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                    className="h-5 flex-row items-center gap-2"
                  >
                    <Icon
                      width={16}
                      height={16}
                      className="text-ink-400 dark:text-grey-100"
                    />
                    <Text className={cn(LABEL, "flex-1")} style={TIGHT}>
                      {label}
                    </Text>
                    <Radio selected={selected} />
                  </Pressable>

                  {key === "card" ? (
                    <Expandable open={selected}>
                      <View className="gap-4 pt-4">
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          value={groupDigits(card.number)}
                          onChangeText={(t) =>
                            onCardChange(
                              "number",
                              t.replace(/\D/g, "").slice(0, 19)
                            )
                          }
                          keyboardType="number-pad"
                          autoComplete="cc-number"
                          labelClassName={LABEL}
                          labelSpacing={-0.084}
                        />
                        <View className="flex-row gap-4">
                          <Input
                            label="Expiry Date"
                            placeholder="MM/YY"
                            value={card.expiry}
                            onChangeText={(t) =>
                              onCardChange("expiry", formatExpiry(t))
                            }
                            error={
                              card.expiry.length === 5 &&
                              !validExpiry(card.expiry)
                                ? "Enter a valid date"
                                : undefined
                            }
                            keyboardType="number-pad"
                            autoComplete="cc-exp"
                            labelClassName={LABEL}
                            labelSpacing={-0.084}
                            className="flex-1"
                          />
                          <Input
                            label="CVV"
                            placeholder="123"
                            value={card.cvv}
                            onChangeText={(t) =>
                              onCardChange(
                                "cvv",
                                t.replace(/\D/g, "").slice(0, 4)
                              )
                            }
                            keyboardType="number-pad"
                            autoComplete="cc-csc"
                            labelClassName={LABEL}
                            labelSpacing={-0.084}
                            className="flex-1"
                          />
                        </View>
                      </View>
                    </Expandable>
                  ) : null}
                </View>
              );
            })}

            <Pressable
              accessibilityRole="button"
              className={cn("min-h-11 flex-row items-center gap-2", ROW)}
            >
              <Plus
                width={16}
                height={16}
                className="text-ink-400 dark:text-grey-100"
              />
              <Text className={cn(LABEL, "flex-1")} style={TIGHT}>
                Add new payment method
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Button label="Next" disabled={!canContinue} onPress={onNext} />
    </View>
  );
}

const Radio = ({ selected }: { selected: boolean }) => (
  <View
    className={cn(
      "size-3.5 items-center justify-center rounded-full border-[0.875px]",
      selected
        ? "border-brand-500 bg-brand-500"
        : "border-brand-100 bg-ink-50 dark:border-snow-300/[0.11] dark:bg-snow-300/[0.04]"
    )}
    style={selected ? { boxShadow: "0 0 0 2.33px #F4EBFF" } : undefined}
  >
    {selected ? (
      <Svg width={12} height={12} viewBox="0 0 14 14">
        <Path
          d="M3.5 7.2 5.8 9.4 10.5 4.6"
          stroke="#FFFFFF"
          strokeWidth={1.458}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    ) : null}
  </View>
);

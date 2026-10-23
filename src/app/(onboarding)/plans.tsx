import { useState } from "react";
import { ScrollView, View } from "react-native";

import NotchedPanel from "@/components/NotchedPanel";
import ComparePlans from "@/components/screens/plans/ComparePlans";
import PlanCard from "@/components/screens/plans/PlanCard";
import { ModalHeader } from "@/components/ui/Modal";
import SegmentedControl, {
  type SegmentedOption,
} from "@/components/ui/SegmentedControl";

type Billing = "monthly" | "yearly";

const BILLING_OPTIONS: SegmentedOption<Billing>[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const PLANS = [
  {
    key: "basic",
    title: "Basic",
    description: "Start with essential features for simple needs.",
    price: { monthly: "$19 / month", yearly: "$182 / year" },
    features: [
      "Host a set number of meetings each month.",
      "Exported content will include a watermark.",
      "Perfect for individuals or small teams just getting started.",
    ],
  },
  {
    key: "premium",
    title: "Premium",
    description: "Complete tools for teams that need more flexibility.",
    price: { monthly: "$32 / month", yearly: "$307 / year" },
    features: [
      "Unlimited meetings and detailed summaries to keep everyone aligned.",
      "Multi-language support for global collaboration without barriers.",
      "Exported content comes clean, with no watermark.",
      "Best for growing teams that need advanced features at an affordable price.",
    ],
  },
  {
    key: "custom",
    title: "Custom (Enterprise)",
    description: "Tailored solutions with security and priority support.",
    price: { monthly: "Contact us", yearly: "Contact us" },
    features: [
      "Single Sign-On (SSO) integration to simplify and secure team access.",
      "Enterprise-grade compliance to meet organizational standards.",
      "Priority support with faster response times and dedicated assistance.",
      "Ideal for large companies or organizations with advanced needs.",
    ],
  },
];

export default function Plans() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <View className="w-full flex-1 px-1 pb-1 pt-10">
      <NotchedPanel
        className="flex-1"
        bottomRadius={40}
        light={{ fill: "rgba(234,235,255,0.4)" }}
        dark={{ fill: "#161616", stroke: "#333333" }}
      >
        <View className="flex-1 px-3 pb-3 pt-10">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View
              className={`px-3 py-6 gap-4 rounded-2xl border border-brand-100
              bg-white dark:border-grey-500 dark:bg-grey-800`}
            >
              <ModalHeader
                title="Choose a Plan"
                description="Select the plan that fits your needs."
              />
              <SegmentedControl
                options={BILLING_OPTIONS}
                value={billing}
                onValueChange={setBilling}
                className="w-[178px] self-center"
              />
              {PLANS.map(({ key, price, ...plan }) => (
                <PlanCard key={key} price={price[billing]} {...plan} />
              ))}
              <ComparePlans />
            </View>
          </ScrollView>
        </View>
      </NotchedPanel>
    </View>
  );
}

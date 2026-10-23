import { useState } from "react";
import { ScrollView, View } from "react-native";

import NotchedPanel from "@/components/NotchedPanel";
import ComparePlans from "@/components/screens/plans/ComparePlans";
import PlanCard from "@/components/screens/plans/PlanCard";
import UpgradePlanFlow from "@/components/screens/plans/UpgradePlanFlow";
import { ModalHeader } from "@/components/ui/Modal";
import SegmentedControl, {
  type SegmentedOption,
} from "@/components/ui/SegmentedControl";
import { PRICING_PLANS } from "@/lib/pricing-plans";

type Billing = "monthly" | "yearly";

const BILLING_OPTIONS: SegmentedOption<Billing>[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export default function Plans() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [selectedKey, setSelectedKey] = useState("basic");
  const [open, setOpen] = useState(false);
  const selected = PRICING_PLANS.find((p) => p.key === selectedKey);

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
              {PRICING_PLANS.map(({ key, price, ...plan }) => (
                <PlanCard
                  key={key}
                  price={price[billing]}
                  {...plan}
                  onUpgrade={
                    key === "custom"
                      ? undefined
                      : () => {
                          setSelectedKey(key);
                          setOpen(true);
                        }
                  }
                />
              ))}
              <ComparePlans />
            </View>
          </ScrollView>
        </View>
      </NotchedPanel>
      <UpgradePlanFlow
        visible={open}
        onClose={() => setOpen(false)}
        planTitle={selected?.title ?? ""}
        price={selected?.price[billing] ?? ""}
      />
    </View>
  );
}

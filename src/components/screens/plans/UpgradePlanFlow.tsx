import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CouponStep from "@/components/screens/plans/CouponStep";
import StepFlow, { type StepDef } from "@/components/StepFlow";
import { Modal } from "@/components/ui/Modal";

type UpgradePlanFlowProps = {
  visible: boolean;
  onClose: () => void;
  price: string;
};

const FLOW_HEIGHT = 586;
const MODAL_CHROME = 71 + 32;

export default function UpgradePlanFlow({
  visible,
  onClose,
  price,
}: UpgradePlanFlowProps) {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const [coupon, setCoupon] = useState("");

  const flowHeight = Math.min(
    FLOW_HEIGHT,
    height - top - bottom - MODAL_CHROME
  );

  const steps: StepDef[] = [
    {
      key: "coupon",
      render: ({ goNext, finish }) => (
        <CouponStep
          value={coupon}
          onChange={setCoupon}
          onBack={finish}
          onSkip={goNext}
          onSubmit={goNext}
        />
      ),
    },
  ];

  return (
    <Modal visible={visible} onClose={onClose} handle>
      <View style={{ height: flowHeight }}>
        <StepFlow steps={steps} onFinish={onClose} />
      </View>
    </Modal>
  );
}

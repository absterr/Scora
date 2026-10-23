import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import StepFlow, { type StepDef } from "@/components/StepFlow";
import { Modal } from "@/components/ui/Modal";
import BillingStep, { EMPTY_BILLING, type BillingDetails } from "./BillingStep";
import CouponStep from "./CouponStep";
import PaymentStep, {
  CardDetails,
  EMPTY_CARD,
  PaymentMethod,
} from "./PaymentStep";
import TrialStep from "./TrialStep";

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
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [billing, setBilling] = useState<BillingDetails>(EMPTY_BILLING);
  const [card, setCard] = useState<CardDetails>(EMPTY_CARD);

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
    {
      key: "trial",
      render: ({ goNext, goBack }) => (
        <TrialStep
          price={price}
          onBack={goBack}
          onSkip={goNext}
          onStart={goNext}
        />
      ),
    },
    {
      key: "billing",
      render: ({ goNext, goBack }) => (
        <BillingStep
          values={billing}
          onChange={(key, value) => setBilling((b) => ({ ...b, [key]: value }))}
          onBack={goBack}
          onNext={goNext}
        />
      ),
    },
    {
      key: "payment",
      render: ({ goNext, goBack }) => (
        <PaymentStep
          method={method}
          card={card}
          onSelect={setMethod}
          onCardChange={(key, value) =>
            setCard((c) => ({ ...c, [key]: value }))
          }
          onBack={goBack}
          onNext={goNext}
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

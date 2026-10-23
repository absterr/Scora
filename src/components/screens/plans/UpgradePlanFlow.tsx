import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BillingStep, {
  EMPTY_BILLING,
  type BillingDetails,
} from "@/components/screens/plans/BillingStep";
import CouponStep from "@/components/screens/plans/CouponStep";
import PaymentStep, {
  EMPTY_CARD,
  type CardDetails,
  type PaymentMethod,
} from "@/components/screens/plans/PaymentStep";
import ReviewStep from "@/components/screens/plans/ReviewStep";
import TrialStep from "@/components/screens/plans/TrialStep";
import StepFlow, { type StepDef } from "@/components/StepFlow";
import { Modal } from "@/components/ui/Modal";

type UpgradePlanFlowProps = {
  visible: boolean;
  onClose: () => void;
  planTitle: string;
  price: string;
};

const FLOW_HEIGHT = 648;
const MODAL_CHROME = 71 + 32;

const mockBillingId = () =>
  `BIL-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

export default function UpgradePlanFlow({
  visible,
  onClose,
  planTitle,
  price,
}: UpgradePlanFlowProps) {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const [coupon, setCoupon] = useState("");
  const [billing, setBilling] = useState<BillingDetails>(EMPTY_BILLING);
  const [billingId] = useState(mockBillingId);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [card, setCard] = useState<CardDetails>(EMPTY_CARD);
  const [autoRenew, setAutoRenew] = useState(true);

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
    {
      key: "review",
      render: ({ goNext, goBack }) => (
        <ReviewStep
          name={billing.username}
          billingId={billingId}
          planTitle={planTitle}
          price={price}
          autoRenew={autoRenew}
          onAutoRenewChange={setAutoRenew}
          onBack={goBack}
          onConfirm={goNext}
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

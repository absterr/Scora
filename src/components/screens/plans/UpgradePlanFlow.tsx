import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BillingStep, {
  EMPTY_BILLING,
  type BillingDetails,
} from "@/components/screens/plans/BillingStep";
import CouponStep from "@/components/screens/plans/CouponStep";
import PaymentResultModal, {
  type PaymentResult,
} from "@/components/screens/plans/PaymentResultModal";
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
  onReopen: () => void;
  planTitle: string;
  price: string;
};

const FLOW_HEIGHT = 648;
const MODAL_CHROME = 71 + 32;
const PAYMENT_STEP = 3;
const PAY_DELAY = 1500;

const mockBillingId = () =>
  `BIL-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

export default function UpgradePlanFlow({
  visible,
  onClose,
  onReopen,
  planTitle,
  price,
}: UpgradePlanFlowProps) {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const [coupon, setCoupon] = useState("");
  const [billing, setBilling] = useState<BillingDetails>(EMPTY_BILLING);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [card, setCard] = useState<CardDetails>(EMPTY_CARD);
  const [autoRenew, setAutoRenew] = useState(false);
  const [billingId] = useState(mockBillingId);
  const [startIndex, setStartIndex] = useState(0);
  const [paying, setPaying] = useState(false);
  const [result, setResult] = useState<PaymentResult>("success");
  const [resultVisible, setResultVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flowHeight = Math.min(
    FLOW_HEIGHT,
    height - top - bottom - MODAL_CHROME
  );

  const close = () => {
    setStartIndex(0);
    onClose();
  };

  // Simulated network call: PayPal or a card ending in 0000 fails
  const pay = () => {
    setPaying(true);
    timer.current = setTimeout(() => {
      const failed =
        method === "paypal" ||
        (method === "card" && card.number.endsWith("0000"));
      setPaying(false);
      setResult(failed ? "failed" : "success");
      setResultVisible(true);
      close();
    }, PAY_DELAY);
  };

  const dismissResult = () => setResultVisible(false);

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
      render: ({ goBack }) => (
        <ReviewStep
          name={billing.username}
          billingId={billingId}
          planTitle={planTitle}
          price={price}
          autoRenew={autoRenew}
          onAutoRenewChange={setAutoRenew}
          loading={paying}
          onBack={goBack}
          onConfirm={pay}
        />
      ),
    },
  ];

  return (
    <>
      <Modal visible={visible} onClose={close} handle>
        <View style={{ height: flowHeight }}>
          <StepFlow steps={steps} onFinish={close} initialIndex={startIndex} />
        </View>
      </Modal>

      <PaymentResultModal
        visible={resultVisible}
        status={result}
        onClose={dismissResult}
        onPrimary={() => {
          dismissResult();
          if (result === "success") {
            router.push("/meeting");
          } else {
            setStartIndex(PAYMENT_STEP);
            onReopen();
          }
        }}
        onSecondary={result === "failed" ? dismissResult : undefined}
      />
    </>
  );
}

import { useEffect, useState, type ReactNode } from "react";
import { BackHandler, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";

export type StepNav = {
  goNext: () => void;
  goBack: () => void;
  finish: () => void;
};

export type StepDef = {
  key: string;
  render: (nav: StepNav) => ReactNode;
};

type Step = { index: number; direction: 1 | -1 };

const ENTER_FORWARD = FadeInRight.duration(300);
const ENTER_BACK = FadeInLeft.duration(300);
const EXIT_FORWARD = FadeOutRight.duration(200);
const EXIT_BACK = FadeOutLeft.duration(200);

const move = (delta: 1 | -1, last: number) => (step: Step) => ({
  index: Math.min(Math.max(step.index + delta, 0), last),
  direction: delta,
});

export default function StepFlow({
  steps,
  initialIndex = 0,
  onFinish,
}: {
  steps: StepDef[];
  initialIndex?: number;
  onFinish: () => void;
}) {
  const [{ index, direction }, setStep] = useState<Step>({
    index: initialIndex,
    direction: 1,
  });
  const last = steps.length - 1;

  // On the first step the handler is not registered, so the router handles back.
  useEffect(() => {
    if (index === 0) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      setStep(move(-1, last));
      return true;
    });
    return () => sub.remove();
  }, [index, last]);

  const nav: StepNav = {
    goNext: () => setStep(move(1, last)),
    goBack: () => setStep(move(-1, last)),
    finish: onFinish,
  };

  const current = steps[index];

  return (
    <View className="flex-1 overflow-hidden">
      <Animated.View
        key={current.key}
        entering={direction === 1 ? ENTER_FORWARD : ENTER_BACK}
        exiting={direction === 1 ? EXIT_FORWARD : EXIT_BACK}
        className="absolute inset-0"
      >
        {current.render(nav)}
      </Animated.View>
    </View>
  );
}

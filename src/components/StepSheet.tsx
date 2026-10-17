import {
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackgroundProps,
} from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  BackHandler,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
} from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOut,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export type StepNav = {
  goNext: () => void;
  goBack: () => void;
  dismiss: () => void;
};

export type StepDef = {
  key: string;
  render: (nav: StepNav) => ReactNode;
};

export type StepSheetHandle = {
  present: () => void;
  dismiss: () => void;
};

type StepSheetProps = {
  steps: StepDef[];
  onDismiss?: () => void;
};

type Step = { index: number; direction: 1 | -1 };

const SHEET_HEIGHT = 662;
const BUMP_HEIGHT = 25.46;
const BODY_RADIUS = 24;
// Notch ellipse is 84x89.12, centered 19.1px below the body top (chord half-width 37.95)
const NOTCH = { rx: 42, ry: 44.56, half: 37.95 };
const INITIAL: Step = { index: 0, direction: 1 };
const ENTER_FORWARD = FadeInRight.duration(250);
const ENTER_BACK = FadeInLeft.duration(250);
const EXIT = FadeOut.duration(150);

const move = (delta: 1 | -1, last: number) => (step: Step) => ({
  index: Math.min(Math.max(step.index + delta, 0), last),
  direction: delta,
});

export const StepSheet = forwardRef<StepSheetHandle, StepSheetProps>(
  ({ steps, onDismiss }, ref) => {
    const insets = useSafeAreaInsets();
    const { height: windowHeight } = useWindowDimensions();
    const sheetHeight = Math.min(SHEET_HEIGHT, windowHeight - insets.top);
    const snapPoints = useMemo(() => [sheetHeight], [sheetHeight]);

    const sheetRef = useRef<BottomSheetModal>(null);
    const [{ index, direction }, setStep] = useState(INITIAL);
    const [open, setOpen] = useState(false);
    const last = steps.length - 1;

    useImperativeHandle(ref, () => ({
      present: () => sheetRef.current?.present(),
      dismiss: () => sheetRef.current?.dismiss(),
    }));

    useEffect(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        if (!open) return false;
        if (index > 0) setStep(move(-1, last));
        else sheetRef.current?.dismiss();
        return true;
      });
      return () => sub.remove();
    }, [open, index, last]);

    const nav: StepNav = {
      goNext: () => setStep(move(1, last)),
      goBack: () => setStep(move(-1, last)),
      dismiss: () => sheetRef.current?.dismiss(),
    };

    const handleDismiss = () => {
      setStep(INITIAL);
      onDismiss?.();
    };

    const current = steps[index];

    return (
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        handleComponent={null}
        backgroundComponent={SheetBackground}
        onChange={(i) => setOpen(i >= 0)}
        onDismiss={handleDismiss}
      >
        <BottomSheetView style={{ height: sheetHeight }}>
          <View className="flex-1 overflow-hidden">
            <Animated.View
              key={current.key}
              entering={direction === 1 ? ENTER_FORWARD : ENTER_BACK}
              exiting={EXIT}
              className="absolute inset-0"
            >
              {current.render(nav)}
            </Animated.View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

StepSheet.displayName = "StepSheet";

const silhouette = (w: number, h: number) =>
  [
    `M0 ${h}`,
    `V${BUMP_HEIGHT + BODY_RADIUS}`,
    `A${BODY_RADIUS} ${BODY_RADIUS} 0 0 1 ${BODY_RADIUS} ${BUMP_HEIGHT}`,
    `H${w / 2 - NOTCH.half}`,
    `A${NOTCH.rx} ${NOTCH.ry} 0 0 1 ${w / 2 + NOTCH.half} ${BUMP_HEIGHT}`,
    `H${w - BODY_RADIUS}`,
    `A${BODY_RADIUS} ${BODY_RADIUS} 0 0 1 ${w} ${BUMP_HEIGHT + BODY_RADIUS}`,
    `V${h}`,
    "Z",
  ].join(" ");

const SheetBackground = ({ style }: BottomSheetBackgroundProps) => {
  const { colorScheme } = useColorScheme();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const isDark = colorScheme === "dark";

  return (
    <Animated.View
      pointerEvents="none"
      style={style}
      onLayout={({ nativeEvent }: LayoutChangeEvent) =>
        setSize(nativeEvent.layout)
      }
    >
      {size.width > 0 ? (
        <Svg width={size.width} height={size.height}>
          <Path
            d={silhouette(size.width, size.height)}
            // grey-800 (dark), white (light), card-stroke (dark border)
            fill={isDark ? "#161616" : "#FFFFFF"}
            stroke={isDark ? "#333333" : "none"}
            strokeWidth={1}
          />
        </Svg>
      ) : null}
      <View className="absolute inset-x-0 top-[11px] items-center">
        <View className="size-3 rounded-full border border-snow-600 bg-snow-500 dark:border-card-stroke dark:bg-grey-700" />
      </View>
    </Animated.View>
  );
};

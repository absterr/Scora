import { forwardRef, useState } from "react";

import {
  Bell,
  Camera,
  Headset,
  storage as Storage,
} from "@/components/icons/feature";
import {
  StepSheet,
  type StepDef,
  type StepSheetHandle,
} from "@/components/StepSheet";
import LanguageStep from "./LanguageStep";
import PermissionStep, { type Permission } from "./PermissionStep";

type OnboardingSheetProps = { onDismiss?: () => void };

const PERMISSIONS: Permission[] = [
  {
    key: "camera",
    Icon: Camera,
    label: "Camera",
    name: "camera",
    target: "camera",
  },
  {
    key: "microphone",
    Icon: Headset,
    label: "Microphone",
    name: "microphone",
    target: "mic",
  },
  {
    key: "storage",
    Icon: Storage,
    label: "Storage",
    name: "storage",
    target: "storage",
  },
  {
    key: "notification",
    Icon: Bell,
    label: "Notification",
    name: "notification",
    target: "phone",
  },
];

export const OnboardingSheet = forwardRef<
  StepSheetHandle,
  OnboardingSheetProps
>(({ onDismiss }, ref) => {
  const [language, setLanguage] = useState<string | null>(null);

  const steps: StepDef[] = [
    {
      key: "language",
      render: ({ goNext }) => (
        <LanguageStep
          value={language}
          onChange={setLanguage}
          onContinue={goNext}
        />
      ),
    },
    ...PERMISSIONS.map((permission, i) => ({
      key: permission.key,
      render: ({ goNext, dismiss }: Parameters<StepDef["render"]>[0]) => (
        <PermissionStep
          permission={permission}
          onSetup={() => {}}
          onSkip={i === PERMISSIONS.length - 1 ? dismiss : goNext}
        />
      ),
    })),
  ];

  return (
    <StepSheet
      ref={ref}
      steps={steps}
      onDismiss={() => {
        setLanguage(null);
        onDismiss?.();
      }}
    />
  );
});

OnboardingSheet.displayName = "OnboardingSheet";

import { useState } from "react";

import {
  Bell,
  Camera,
  Headset,
  storage as Storage,
} from "@/components/icons/feature";
import StepFlow, { type StepDef, type StepNav } from "@/components/StepFlow";
import LanguageStep from "./LanguageStep";
import PermissionStep, { type Permission } from "./PermissionStep";

type OnboardingStepsProps = { onFinish: () => void };

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

export default function OnboardingSteps({ onFinish }: OnboardingStepsProps) {
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
      render: ({ goNext, finish }: StepNav) => (
        <PermissionStep
          permission={permission}
          onSetup={() => {}}
          onSkip={i === PERMISSIONS.length - 1 ? finish : goNext}
        />
      ),
    })),
  ];

  return <StepFlow steps={steps} onFinish={onFinish} />;
}

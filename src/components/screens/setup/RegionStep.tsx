import { View } from "react-native";

import SetupStep, {
  type StepActions,
} from "@/components/screens/setup/SetupStep";
import StepHeading from "@/components/screens/setup/StepHeading";
import Selectable from "@/components/ui/Selectable";
import { LANGUAGES, TIME_ZONES } from "@/lib/regions";

type RegionStepProps = StepActions & {
  language?: string;
  timeZone?: string;
  onLanguageChange: (value: string) => void;
  onTimeZoneChange: (value: string) => void;
};

const LANGUAGE_OPTIONS = LANGUAGES.map(({ Icon, ...o }) => ({
  ...o,
  icon: <Icon width={20} height={20} />,
}));

export default function RegionStep({
  language,
  timeZone,
  onLanguageChange,
  onTimeZoneChange,
  ...actions
}: RegionStepProps) {
  return (
    <SetupStep {...actions} nextDisabled={!language || !timeZone}>
      <View className="gap-6">
        <StepHeading
          title="Select Language & Time Zone"
          subtitle="We'll use these settings to customize your account."
        />
        <View>
          <Selectable
            variant="grouped"
            options={LANGUAGE_OPTIONS}
            value={language}
            onValueChange={onLanguageChange}
            placeholder="Select Language"
            searchPlaceholder="Search Language"
            triggerClassName="rounded-b-none"
          />
          <Selectable
            variant="grouped"
            options={TIME_ZONES}
            value={timeZone}
            onValueChange={onTimeZoneChange}
            placeholder="Select Time Zone"
            searchPlaceholder="Search Time Zone"
            triggerClassName="rounded-t-none border-t-0"
          />
        </View>
      </View>
    </SetupStep>
  );
}

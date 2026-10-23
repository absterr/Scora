import { useState, type FC } from "react";
import { Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import Button from "@/components/ui/Button";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import NotificationRow from "../NotificationRow";

export type Permission = {
  key: string;
  Icon: FC<SvgProps>;
  label: string;
  name: string;
  target: string;
};

type PermissionStepProps = {
  permission: Permission;
  onSetup: () => void;
  onSkip: () => void;
};

const ICON_SHADOW = { boxShadow: "0px 1px 5px rgba(11,10,10,0.25)" };
const SUBTEXT =
  "font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100";

export default function PermissionStep({
  permission,
  onSetup,
  onSkip,
}: PermissionStepProps) {
  const { Icon, label, name, target } = permission;
  const [allowed, setAllowed] = useState(true);
  const description = `Scora would like to access your ${target}.`;

  return (
    <View className="flex-1 gap-6 px-4 pt-10">
      <View
        className={`gap-8 rounded-2xl border px-3 py-6 bg-white
        border-brand-100 dark:border-grey-500 dark:bg-grey-600`}
      >
        <View className="items-center gap-4">
          <View
            className="size-11 items-center justify-center rounded-full bg-brand-50"
            style={ICON_SHADOW}
          >
            <Icon width={24} height={24} />
          </View>

          <View className="w-full gap-4">
            <View className="gap-1.5">
              <Text
                className={`text-center font-display-medium text-base
                 leading-none text-ink-500 dark:text-snow-600`}
              >
                {`${label} Permission Required`}
              </Text>
              <Text className={`text-center ${SUBTEXT}`}>
                {`Enable ${name} access to make video calls.`}
              </Text>
            </View>

            <View className="items-center gap-2">
              <NotificationRow
                title={`Allow ${name} access`}
                time="3 Mins ago"
                description={description}
              />
              <View className="w-full px-3">
                <NotificationRow
                  title={`Video call - ${label}`}
                  time="6 Mins ago"
                  description={description}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <View className="flex-1 gap-1">
            <Text
              className="font-display-medium text-xs leading-3 text-ink-500 dark:text-snow-600"
              style={{ letterSpacing: 0.24 }}
            >
              Allow Access
            </Text>
            <Text className={SUBTEXT}>
              You can enable or disable it in account settings.
            </Text>
          </View>
          <ToggleSwitch value={allowed} onValueChange={setAllowed} />
        </View>
      </View>

      <View className="gap-2">
        <Button
          label="Setup Notification"
          className="h-[42px]"
          onPress={onSetup}
        />
        <Button
          label="Maybe later"
          variant="ghost"
          className="h-[42px]"
          onPress={onSkip}
        />
      </View>
    </View>
  );
}

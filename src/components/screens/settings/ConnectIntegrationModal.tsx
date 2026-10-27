import { useState, type ReactNode } from "react";
import { View } from "react-native";

import { AppIcon } from "@/components/icons/app";
import { SwitchHorizontal } from "@/components/icons/line";
import StepHeading from "@/components/screens/setup/StepHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

type ConnectIntegrationModalProps = {
  integration: { name: string; icon: ReactNode } | null;
  onClose: () => void;
  onConnect: (webhookUrl: string) => void;
};

export default function ConnectIntegrationModal({
  integration,
  onClose,
  onConnect,
}: ConnectIntegrationModalProps) {
  const [url, setUrl] = useState("");

  const close = () => {
    setUrl("");
    onClose();
  };

  const connect = () => {
    onConnect(url.trim());
    setUrl("");
  };

  return (
    <Modal visible={!!integration} onClose={close} handle className="h-[70%]">
      {integration ? (
        <View className="gap-6">
          <View className="items-center gap-6">
            <View className="flex-row items-center gap-4">
              <IconBox>
                <AppIcon
                  width={16}
                  height={16}
                  className="text-ink-500 dark:text-snow-600"
                />
              </IconBox>
              <SwitchHorizontal
                width={16}
                height={16}
                className="text-brand-400 dark:text-snow-600"
              />
              <IconBox>{integration.icon}</IconBox>
            </View>
            <StepHeading
              title={`Connect Scora to ${integration.name}`}
              subtitle={`Automatically sync your meeting notes and recordings to ${integration.name}.`}
            />
          </View>

          <Input
            label="Webhook URL"
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
          />

          <Button
            label="Connect"
            className="h-[42px]"
            disabled={!url.trim()}
            onPress={connect}
          />
        </View>
      ) : null}
    </Modal>
  );
}

const IconBox = ({ children }: { children: ReactNode }) => (
  <View
    className={`size-10 items-center justify-center rounded-lg border
      border-brand-100 bg-[rgba(205,207,229,0.22)] dark:bg-grey-700`}
  >
    {children}
  </View>
);

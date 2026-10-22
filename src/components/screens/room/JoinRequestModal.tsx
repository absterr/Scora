import { Text, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type JoinRequestModalProps = {
  name: string | null;
  onAccept: () => void;
  onDecline: () => void;
};

export default function JoinRequestModal({
  name,
  onAccept,
  onDecline,
}: JoinRequestModalProps) {
  return (
    <Modal
      visible={name !== null}
      onClose={onDecline}
      handle={false}
      className="gap-4 border-snow-600 pb-6 dark:border-card-stroke"
    >
      <View className="gap-4">
        <View className="items-center gap-2">
          <View className="flex-row items-center gap-1">
            <Avatar
              name={name ?? ""}
              size={40}
              className="border bg-brand-100"
              textClassName="text-brand-800"
            />
            <Text className="font-display-regular text-sm leading-5 text-ink-500 dark:text-snow-600">
              {name}
            </Text>
          </View>
          <Text className="text-center font-display-regular text-xs text-ink-400 dark:text-grey-100">
            {name} wants to join this meeting. Please accept or decline.
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Button
            label="Decline"
            onPress={onDecline}
            className="flex-1 border-card-stroke bg-ink-500 dark:bg-[rgba(161,161,161,0.4)]"
          />
          <Button
            label="Accept"
            onPress={onAccept}
            className="flex-1 border-success-600 bg-success-700"
          />
        </View>
      </View>
    </Modal>
  );
}

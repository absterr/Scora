import { View } from "react-native";

import AppTile from "@/components/screens/plans/AppTile";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ModalHeader, ModalTopbar } from "@/components/ui/Modal";

type CouponStepProps = {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onSkip: () => void;
  onSubmit: () => void;
};

export default function CouponStep({
  value,
  onChange,
  onBack,
  onSkip,
  onSubmit,
}: CouponStepProps) {
  return (
    <View className="flex-1 justify-between gap-6">
      <View className="gap-6">
        <ModalTopbar onBack={onBack} onSkip={onSkip} />
        <ModalHeader
          title="Add Coupon"
          description="Redeem your coupon here for exclusive savings."
          className="gap-4"
        >
          <AppTile />
        </ModalHeader>
        <Input
          label="Coupon Code"
          placeholder="XX-XXXX-XXXX"
          value={value}
          onChangeText={onChange}
          autoCapitalize="characters"
          autoCorrect={false}
        />
      </View>
      <Button label="Submit" disabled={!value.trim()} onPress={onSubmit} />
    </View>
  );
}

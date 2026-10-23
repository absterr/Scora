import { ScrollView, View, type TextInputProps } from "react-native";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ModalHeader, ModalTopbar } from "@/components/ui/Modal";

export type BillingDetails = {
  username: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

type Field = {
  key: keyof BillingDetails;
  label: string;
  placeholder: string;
} & Pick<TextInputProps, "keyboardType" | "autoCapitalize">;

type BillingStepProps = {
  values: BillingDetails;
  onChange: (key: keyof BillingDetails, value: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export const EMPTY_BILLING: BillingDetails = {
  username: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const ACCOUNT_FIELDS: Field[] = [
  {
    key: "username",
    label: "Username",
    placeholder: "Enter username",
    autoCapitalize: "none",
  },
  {
    key: "email",
    label: "Email",
    placeholder: "Enter email address",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
];

const ADDRESS_FIELDS: Field[] = [
  { key: "address", label: "Address", placeholder: "Enter street address" },
  { key: "city", label: "City", placeholder: "Enter city" },
  { key: "state", label: "State", placeholder: "Enter state" },
  {
    key: "zip",
    label: "Zip Code",
    placeholder: "Enter zip code",
    keyboardType: "number-pad",
  },
];

export default function BillingStep({
  values,
  onChange,
  onBack,
  onNext,
}: BillingStepProps) {
  const complete = Object.values(values).every((v) => v.trim());

  const renderFields = (fields: Field[]) =>
    fields.map(({ key, ...field }) => (
      <Input
        key={key}
        value={values[key]}
        onChangeText={(text) => onChange(key, text)}
        {...field}
      />
    ));

  return (
    <View className="flex-1 gap-6">
      <ModalTopbar onBack={onBack} />
      <ModalHeader
        title="Billing Details"
        description="Enter your billing info to finish setting up your plan."
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-10"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">{renderFields(ACCOUNT_FIELDS)}</View>
        <View className="gap-4">{renderFields(ADDRESS_FIELDS)}</View>
      </ScrollView>
      <Button label="Next" disabled={!complete} onPress={onNext} />
    </View>
  );
}

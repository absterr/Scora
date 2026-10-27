import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Check, ChevronLeft } from "@/components/icons/line";
import InviteeChip from "@/components/screens/InviteeChip";
import StepHeading from "@/components/screens/setup/StepHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { gradients } from "@/lib/gradients";
import { cn } from "@/lib/utils";

const SWATCHES = [
  "linear03",
  "linear04",
  "linear05",
  "linear06",
  "linear08",
  "linear07",
] as const;

export type TeamGradient = (typeof SWATCHES)[number];

export type NewTeam = {
  name: string;
  description: string;
  gradient: TeamGradient | null;
  invitees: string[];
};

type CreateTeamModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (team: NewTeam) => void;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MENU_SHADOW = { boxShadow: "0 2px 4px rgba(24,24,24,0.08)" };
const TONES = [
  { bg: "#3B49BB", fg: "#E7E8F7" },
  { bg: "#F36960", fg: "#E7E8F7" },
  { bg: "#B3B8E5", fg: "#060F5E" },
];

const toneFor = (s: string) =>
  TONES[[...s].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length];

export default function CreateTeamModal({
  visible,
  onClose,
  onCreate,
}: CreateTeamModalProps) {
  const [step, setStep] = useState<0 | 1>(0);
  const [gradient, setGradient] = useState<TeamGradient | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [invitees, setInvitees] = useState<string[]>([]);

  const candidate = email.trim().toLowerCase();
  const suggestion =
    EMAIL.test(candidate) && !invitees.includes(candidate) ? candidate : null;

  const close = () => {
    setStep(0);
    setGradient(null);
    setName("");
    setDescription("");
    setEmail("");
    setInvitees([]);
    onClose();
  };

  const create = (list: string[]) => {
    onCreate({
      name: name.trim(),
      description: description.trim(),
      gradient,
      invitees: list,
    });
    close();
  };

  const add = () => {
    if (!suggestion) return;
    setInvitees((prev) => [...prev, suggestion]);
    setEmail("");
  };

  const topBar = (
    <View className="flex-row items-center justify-between pr-1">
      <Pressable
        onPress={step === 0 ? close : () => setStep(0)}
        hitSlop={16}
        accessibilityRole="button"
        accessibilityLabel="Back"
      >
        <ChevronLeft
          width={16}
          height={16}
          className="text-ink-400 dark:text-grey-100"
        />
      </Pressable>
      {step === 1 ? (
        <Pressable
          onPress={() => create([])}
          hitSlop={16}
          accessibilityRole="button"
        >
          <Text
            className="font-display-medium text-sm text-ink-400 dark:text-grey-100"
            style={{ letterSpacing: 0.42 }}
          >
            Skip
          </Text>
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <Modal visible={visible} onClose={close} topBar={topBar} handle>
      {step === 0 ? (
        <>
          <View className="items-center gap-6">
            <StepHeading
              title="Create Team"
              subtitle="Set up groups to collaborate, assign tasks, and share documents easily."
            />
            <Preview gradient={gradient} />
          </View>

          <View className="flex-row justify-between">
            {SWATCHES.map((id) => (
              <Swatch
                key={id}
                id={id}
                selected={id === gradient}
                onPress={() => setGradient(id === gradient ? null : id)}
              />
            ))}
          </View>

          <View className="gap-4">
            <Input
              label="Workspace Name"
              placeholder="Enter workspace name"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="Description"
              placeholder="Add team description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <Button
            label="Next"
            disabled={!name.trim()}
            onPress={() => setStep(1)}
          />
        </>
      ) : (
        <>
          <StepHeading
            title="Invite Members"
            subtitle="Add teammates to collaborate in this workspace."
          />

          <View className="gap-2">
            <View className="flex-row items-end gap-2">
              <Input
                label="Email"
                placeholder="Enter teammate email"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={add}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="w-auto flex-1"
              />
              <Button
                variant="accent"
                label="Invite"
                disabled={!invitees.length}
                onPress={() => create(invitees)}
                className="h-11 w-[63px] px-0"
              />
            </View>

            {suggestion ? (
              <View
                className="rounded-xl border border-brand-100 bg-snow-500 py-1 dark:border-card-stroke dark:bg-grey-600"
                style={MENU_SHADOW}
              >
                <SuggestionRow email={suggestion} onPress={add} />
              </View>
            ) : null}
          </View>

          {invitees.length ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {invitees.map((item, i) => (
                <InviteeChip
                  key={item}
                  className={i > 0 ? "-ml-[9px]" : undefined}
                  name={item}
                  onRemove={() =>
                    setInvitees((prev) => prev.filter((e) => e !== item))
                  }
                />
              ))}
            </ScrollView>
          ) : null}
        </>
      )}
    </Modal>
  );
}

const Preview = ({ gradient }: { gradient: TeamGradient | null }) => {
  if (!gradient) {
    return (
      <View
        className={`size-[100px] rounded-full border border-dashed border-brand-400
          bg-[rgba(46,61,241,0.16)] dark:border-grey-500 dark:bg-grey-600`}
      />
    );
  }

  const g = gradients[gradient];
  return (
    <LinearGradient
      colors={g.colors}
      start={g.start}
      end={g.end}
      style={{ width: 100, height: 100, borderRadius: 50 }}
    />
  );
};

const Swatch = ({
  id,
  selected,
  onPress,
}: {
  id: TeamGradient;
  selected: boolean;
  onPress: () => void;
}) => {
  const g = gradients[id];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={id}
      className="size-10"
    >
      <LinearGradient
        colors={g.colors}
        start={g.start}
        end={g.end}
        style={{ flex: 1, borderRadius: 20 }}
      />
      {selected ? (
        <>
          <View
            pointerEvents="none"
            className="absolute inset-0 rounded-full border-2 border-white"
          />
          <View className="absolute -right-0.5 -top-0.5 size-4 items-center justify-center rounded-full bg-white">
            <Check className="text-brand-500" />
          </View>
        </>
      ) : null}
    </Pressable>
  );
};

const SuggestionRow = ({
  email,
  onPress,
}: {
  email: string;
  onPress: () => void;
}) => {
  const tone = toneFor(email);
  return (
    <Pressable onPress={onPress} className="px-1.5 py-px">
      {({ pressed }) => (
        <View
          className={cn(
            "h-[38px] flex-row items-center gap-2 rounded-xl border px-2.5",
            pressed
              ? "border-brand-200 bg-[rgba(234,235,255,0.16)] dark:border-brand-300 dark:bg-card-stroke"
              : "border-transparent"
          )}
        >
          <View
            className="size-5 items-center justify-center rounded-full"
            style={{ backgroundColor: tone.bg }}
          >
            <Text
              className="font-display-medium text-[10px]"
              style={{ color: tone.fg }}
            >
              {email.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            className="flex-1 font-display-regular text-sm text-ink-500 dark:text-snow-600"
          >
            {email}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

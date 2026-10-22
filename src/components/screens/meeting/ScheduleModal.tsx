import { useColorScheme } from "nativewind";
import { useState, type ReactNode } from "react";
import { Text, TextInput, View } from "react-native";

import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Modal, ModalHeader } from "@/components/ui/Modal";
import Selectable from "@/components/ui/Selectable";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import {
  DURATIONS,
  formatDateInput,
  parseDateInput,
  REPEATS,
  startOfToday,
  TIME_SLOTS,
  TIMEZONES,
  toKey,
  type Meeting,
} from "@/lib/meetings";

type ScheduleModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (meeting: Meeting) => void;
};

type Form = {
  name: string;
  date: string;
  start: string;
  duration: string;
  timezone: string;
  repeat: string;
  usePersonalId: boolean;
  requireId: boolean;
  waitingRoom: boolean;
  passcode: string;
};

const TIGHT = { letterSpacing: -0.084 };
const CARD =
  "gap-4 rounded-2xl border border-brand-100 px-3 py-4 dark:border-grey-500 dark:bg-snow-300/[0.04]";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = (): Form => ({
  name: "",
  date: "",
  start: "",
  duration: "",
  timezone: "",
  repeat: "",
  usePersonalId: false,
  requireId: false,
  waitingRoom: false,
  passcode: String(Math.floor(100000 + Math.random() * 900000)),
});

export default function ScheduleModal({
  visible,
  onClose,
  onCreate,
}: ScheduleModalProps) {
  const { colorScheme } = useColorScheme();
  const [form, setForm] = useState(initialForm);
  const [invitees, setInvitees] = useState<string[]>([]);
  const [inviteText, setInviteText] = useState("");
  const [inviteError, setInviteError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const date = parseDateInput(form.date);
  const nameError =
    submitted && !form.name.trim() ? "Enter a meeting name" : undefined;
  const dateError = !submitted
    ? undefined
    : !date
      ? "Use a valid date, dd/mm/yyyy"
      : date < startOfToday()
        ? "Pick today or a later date"
        : undefined;
  const missingSelect =
    submitted && !(form.start && form.duration && form.timezone);

  const close = () => {
    setForm(initialForm());
    setInvitees([]);
    setInviteText("");
    setInviteError(undefined);
    setSubmitted(false);
    onClose();
  };

  const addInvites = () => {
    const emails = inviteText.split(/[,\s]+/).filter(Boolean);
    if (!emails.length) return;
    if (emails.some((e) => !EMAIL.test(e))) {
      setInviteError("Enter valid emails, comma separated");
      return;
    }
    setInvitees((prev) => [
      ...new Set([...prev, ...emails.map((e) => e.toLowerCase())]),
    ]);
    setInviteText("");
    setInviteError(undefined);
  };

  const submit = () => {
    setSubmitted(true);
    if (
      !form.name.trim() ||
      !date ||
      date < startOfToday() ||
      !form.start ||
      !form.duration ||
      !form.timezone
    )
      return;

    onCreate({
      id: String(Date.now()),
      name: form.name.trim(),
      date: toKey(date),
      start: Number(form.start),
      duration: Number(form.duration),
      timezone: TIMEZONES.find((z) => z.value === form.timezone)?.label ?? "",
      repeat: form.repeat || "Does not repeat",
      invitees,
      passcode: form.passcode,
      usePersonalId: form.usePersonalId,
      requireId: form.requireId,
      waitingRoom: form.waitingRoom,
    });
    close();
  };

  return (
    <Modal visible={visible} onClose={close}>
      <ModalHeader
        title="Schedule Meeting"
        description="Plan ahead and set a meeting time."
      />

      <View className="gap-4">
        <View className={CARD}>
          <Input
            label="Meeting Name"
            placeholder="e.g, Kuaci rebus"
            value={form.name}
            onChangeText={(v) => set("name", v)}
            error={nameError}
          />
          <Input
            label="Date"
            placeholder="dd/mm/yyyy"
            value={form.date}
            onChangeText={(v) => set("date", formatDateInput(v))}
            keyboardType="number-pad"
            maxLength={10}
            error={dateError}
          />
          <Field label="Start Time">
            <Selectable
              placeholder="Select start time"
              options={TIME_SLOTS}
              value={form.start}
              onValueChange={(v) => set("start", v)}
            />
          </Field>
          <Field label="Select Duration">
            <Selectable
              placeholder="Select duration"
              options={DURATIONS}
              value={form.duration}
              onValueChange={(v) => set("duration", v)}
            />
          </Field>
          <Field label="Time Zone">
            <Selectable
              placeholder="Select timezone"
              options={TIMEZONES}
              value={form.timezone}
              onValueChange={(v) => set("timezone", v)}
            />
          </Field>
          <Field label="Repeat">
            <Selectable
              placeholder="Select action"
              options={REPEATS}
              value={form.repeat}
              onValueChange={(v) => set("repeat", v)}
            />
          </Field>
        </View>

        <View className={CARD}>
          <ToggleRow
            label="User Personal Meeting ID"
            description="2162 2304 2124 2042"
            value={form.usePersonalId}
            onValueChange={(v) => set("usePersonalId", v)}
          />
          <ToggleRow
            label="Required Meeting ID"
            description="Only users with a valid Meeting ID can join."
            value={form.requireId}
            onValueChange={(v) => set("requireId", v)}
          />
          <View className="flex-row items-center justify-between gap-4">
            <Text
              className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
              style={TIGHT}
            >
              Passcode
            </Text>
            <Text
              className="font-display-regular text-sm leading-5 text-snow-800 dark:text-grey-400"
              style={TIGHT}
            >
              {form.passcode}
            </Text>
          </View>
          <ToggleRow
            label="Enable Waiting Room"
            description="Participants will enter a waiting room until approved by the host."
            value={form.waitingRoom}
            onValueChange={(v) => set("waitingRoom", v)}
          />
        </View>

        <View className={CARD}>
          <Text
            className="font-display-medium text-sm leading-none text-ink-500 dark:text-snow-600"
            style={{ letterSpacing: 0.42 }}
          >
            Invite Members
          </Text>
          <View className="flex-row gap-2">
            <View
              className={`h-10 px-4 flex-1 justify-center rounded-xl border border-white/[0.08]
                bg-white/60 dark:border-snow-300/[0.11] dark:bg-snow-300/[0.04]`}
              style={{ boxShadow: "0 1px 3px 1px rgba(0,0,0,0.08)" }}
            >
              <TextInput
                value={inviteText}
                onChangeText={setInviteText}
                onSubmitEditing={addInvites}
                placeholder="Emails, comma separated"
                placeholderTextColor={
                  colorScheme === "dark" ? "#484848" : "#8A8A8A"
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="p-0 font-display-regular text-[14px] text-ink-500 dark:text-white"
              />
            </View>
            <Button
              variant="accent"
              label="Invite"
              onPress={addInvites}
              className="px-3"
            />
          </View>
          {inviteError ? (
            <Text className="font-display-regular text-sm text-error-500">
              {inviteError}
            </Text>
          ) : invitees.length ? (
            <Text className="font-display-regular text-sm text-ink-400 dark:text-grey-100">
              {invitees.length} invited
            </Text>
          ) : null}
        </View>
      </View>

      {missingSelect ? (
        <Alert size="sm">Select a start time, duration and time zone.</Alert>
      ) : null}
      <Button label="Create Schedule" onPress={submit} />
    </Modal>
  );
}

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <View className="gap-2">
    <Text
      className="font-display-medium text-sm leading-none text-ink-400 dark:text-grey-100"
      style={{ letterSpacing: 0.42 }}
    >
      {label}
    </Text>
    {children}
  </View>
);

const ToggleRow = ({
  label,
  description,
  value,
  onValueChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <View className="flex-row items-center gap-6">
    <View className="flex-1 gap-0.5">
      <Text
        className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
        style={TIGHT}
      >
        {label}
      </Text>
      {description ? (
        <Text
          className="font-display-regular text-sm leading-5 text-snow-800 dark:text-grey-400"
          style={TIGHT}
        >
          {description}
        </Text>
      ) : null}
    </View>
    <ToggleSwitch value={value} onValueChange={onValueChange} />
  </View>
);

import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { ChevronLeft, ChevronRight, Trash } from "@/components/icons/line";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AVATARS } from "@/lib/avatars";
import { type Member } from "@/lib/mock-teams";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ManageMemberModalProps = {
  member: Member | null;
  onClose: () => void;
};

const TIGHT = { letterSpacing: -0.084 };
const BAR_LABEL = { letterSpacing: 0.42 };

const MODAL_HEIGHT = 573;
const MODAL_CHROME = 111;

export default function ManageMemberModal({
  member,
  onClose,
}: ManageMemberModalProps) {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const minHeight = Math.min(
    MODAL_HEIGHT - MODAL_CHROME,
    height - top - bottom - 32 - MODAL_CHROME
  );

  return (
    <Modal
      visible={member !== null}
      onClose={onClose}
      handle
      topBar={
        <View className="flex-row items-center justify-between pr-1">
          <Pressable
            onPress={onClose}
            hitSlop={14}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="flex-row items-center gap-1"
          >
            <ChevronLeft
              width={16}
              height={16}
              className="text-ink-400 dark:text-grey-100"
            />
            <Text
              className="font-display-medium text-sm text-ink-400 dark:text-grey-100"
              style={BAR_LABEL}
            >
              Manage team member
            </Text>
          </Pressable>
          <Pressable onPress={onClose} hitSlop={14} accessibilityRole="button">
            <Text
              className="font-display-medium text-sm text-ink-400 dark:text-grey-100"
              style={BAR_LABEL}
            >
              Close
            </Text>
          </Pressable>
        </View>
      }
    >
      <View className="gap-6" style={{ minHeight }}>
        {member ? (
          <>
            <View className="flex-row items-center gap-3">
              <Image
                source={AVATARS[member.avatar]}
                className="size-10 rounded-full"
              />
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
                  style={TIGHT}
                >
                  {member.name}
                </Text>
                <Text
                  numberOfLines={1}
                  className="font-display-regular text-xs text-ink-400 dark:text-grey-100"
                >
                  {member.email}
                </Text>
              </View>
            </View>

            <View className="gap-3">
              <Text
                className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
                style={TIGHT}
              >
                Role assigned to you :
              </Text>
              <View className="gap-2">
                <RolePanel
                  label="Role"
                  value="Admin"
                  detail="Organization Admin"
                />
                <RolePanel
                  label="Roles"
                  value="Group Admin"
                  detail="2 Groups Assigned"
                />
              </View>
            </View>

            <Button variant="danger" icon={Trash} label="Remove from team" />
          </>
        ) : null}
      </View>
    </Modal>
  );
}

type RolePanelProps = { label: string; value: string; detail: string };

const RolePanel = ({ label, value, detail }: RolePanelProps) => (
  <View
    className={`gap-2.5 rounded-xl border border-brand-100 bg-[rgba(205,207,229,0.22)] p-3
      dark:border-grey-500 dark:bg-snow-300/[0.04]`}
  >
    <View className="flex-row items-center justify-between gap-2.5 border-b border-brand-100 pb-3 dark:border-grey-500">
      <Text
        className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
        style={TIGHT}
      >
        {label}
      </Text>
      <View className="flex-row items-center gap-1">
        <Text
          className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={TIGHT}
        >
          {value}
        </Text>
        <ChevronRight
          width={16}
          height={16}
          className="text-ink-400 dark:text-grey-100"
        />
      </View>
    </View>
    <View className="flex-row items-start justify-between gap-2.5">
      <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
        {detail}
      </Text>
      <Text className="font-display-regular text-xs leading-4 text-ink-400 dark:text-grey-100">
        Scope: Organization
      </Text>
    </View>
  </View>
);

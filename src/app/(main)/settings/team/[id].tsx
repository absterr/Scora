import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Search } from "@/components/icons/line";
import { DotsHorizontal } from "@/components/icons/solid";
import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import TeamCard from "@/components/screens/settings/TeamCard";
import { AVATARS } from "@/lib/avatars";
import { TEAMS, type Member } from "@/lib/mock-teams";
import ManageMemberModal from "@/components/screens/settings/ManageMemberModal";

const TIGHT = { letterSpacing: -0.084 };
const FIELD_SHADOW = { boxShadow: "0 1px 3px 1px rgba(0,0,0,0.08)" };
const FIELD =
  "rounded-xl border border-white/[0.08] bg-white/60 dark:border-snow-300/[0.11] dark:bg-snow-300/[0.04]";
const ACTION =
  "rounded-lg border border-brand-100 bg-[rgba(205,207,229,0.22)] dark:border-grey-500 dark:bg-grey-700";
const BODY = "font-display-regular text-sm leading-5";

export default function TeamDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Member | null>(null);

  const team = TEAMS.find((t) => t.id === id);
  if (!team) return null;

  const q = query.trim().toLowerCase();
  const members = q
    ? team.members.filter(
        (m) =>
          m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      )
    : team.members;

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <ScreenHeader
        title="Team and Roles"
        description="Manage team members and their access levels."
      />

      <TeamCard team={team} />

      <View className="gap-4">
        <View className="gap-2">
          <Text
            className={`${BODY} text-ink-400 dark:text-grey-100`}
            style={TIGHT}
          >
            Search Member
          </Text>
          <View
            className={`h-11 flex-row items-center gap-2 px-4 ${FIELD}`}
            style={FIELD_SHADOW}
          >
            <Search
              width={16}
              height={16}
              className="text-ink-400 dark:text-grey-100"
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or email"
              placeholderTextColor={
                colorScheme === "dark" ? "#BCBCBC" : "#404040"
              }
              className="flex-1 p-0 font-display-regular text-[14px] text-ink-500 dark:text-white"
            />
          </View>
        </View>

        <View className="gap-3">
          <Text
            className={`${BODY} text-ink-500 dark:text-snow-600`}
            style={TIGHT}
          >
            Admin
          </Text>
          <MemberRow member={team.admin} onManage={setSelected} />
        </View>

        <View className="gap-3">
          <View className="flex-row items-center justify-between gap-3">
            <Text
              className={`${BODY} text-ink-500 dark:text-snow-600`}
              style={TIGHT}
            >
              Members List
            </Text>
            <Pressable hitSlop={12} accessibilityRole="button">
              <Text
                className="font-display-medium text-sm leading-5 text-brand-400 dark:text-grey-100"
                style={TIGHT}
              >
                Add new member
              </Text>
            </Pressable>
          </View>
          <View className="gap-2">
            {members.map((member) => (
              <MemberRow
                key={member.email}
                member={member}
                onManage={setSelected}
              />
            ))}
          </View>
        </View>
      </View>
      <ManageMemberModal member={selected} onClose={() => setSelected(null)} />
    </ScrollView>
  );
}

const MemberRow = ({
  member,
  onManage,
}: {
  member: Member;
  onManage: (member: Member) => void;
}) => (
  <View className="flex-row items-center gap-3 py-1">
    <Image source={AVATARS[member.avatar]} className="size-10 rounded-full" />
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
    <Pressable
      hitSlop={9}
      accessibilityRole="button"
      accessibilityLabel={`Actions for ${member.name}`}
      onPress={() => onManage(member)}
      className={`size-[26px] items-center justify-center ${ACTION}`}
    >
      <DotsHorizontal
        width={14}
        height={14}
        className="text-ink-500 dark:text-snow-600"
      />
    </Pressable>
  </View>
);

import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenHeader from "@/components/screens/settings/ScreenHeader";
import TeamCard from "@/components/screens/settings/TeamCard";
import { TEAMS } from "@/lib/mock-teams";
import { useRouter } from "expo-router";

export default function TeamRoles() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-4 pb-6"
      contentContainerStyle={{ paddingTop: top + 24 }}
    >
      <ScreenHeader
        title="Team and Roles"
        description="Manage team members and their access levels."
      />

      <View className="gap-3">
        <Text
          className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
          style={{ letterSpacing: -0.084 }}
        >
          Select team:
        </Text>
        <View className="gap-2">
          {TEAMS.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onPress={() => router.push(`/settings/team/${team.id}`)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

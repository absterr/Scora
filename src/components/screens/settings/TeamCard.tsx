import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import type { Team } from "@/lib/mock-teams";

type TeamCardProps = {
  team: Team;
  onPress?: () => void;
};

const TIGHT = { letterSpacing: -0.084 };
const AVATAR = { width: 36, height: 36, borderRadius: 18 };

export default function TeamCard({ team, onPress }: TeamCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? "button" : undefined}
      className={`p-3 gap-2.5 border border-brand-100 dark:border-grey-500
        bg-[rgba(205,207,229,0.22)] dark:bg-grey-800 rounded-xl`}
    >
      <View className="flex-row items-center gap-2.5 border-b border-brand-100 pb-3 dark:border-grey-500">
        <LinearGradient
          colors={team.gradient.colors}
          start={team.gradient.start}
          end={team.gradient.end}
          style={AVATAR}
        />
        <View className="flex-1">
          <Text
            className="font-display-medium text-sm leading-5 text-ink-500 dark:text-snow-600"
            style={TIGHT}
          >
            {team.name}
          </Text>
          <Text className="font-display-regular text-xs text-ink-400 dark:text-grey-100">
            Author: {team.author}
          </Text>
        </View>
      </View>
      <Text
        className="font-display-regular text-sm leading-5 text-ink-400 dark:text-grey-100"
        style={TIGHT}
      >
        {team.description}
      </Text>
    </Pressable>
  );
}

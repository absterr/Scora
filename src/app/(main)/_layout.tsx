import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  FolderLine,
  MagicWandLine,
  VideoRecorderLine,
  WrenchLine,
} from "@/components/icons/line";
import {
  FolderSolid,
  MagicWandSolid,
  VideoRecorderSolid,
  WrenchSolid,
} from "@/components/icons/solid";
import { PlatformPressable } from "expo-router/build/react-navigation";

const TABS = [
  {
    name: "meeting",
    title: "Meeting",
    Line: VideoRecorderLine,
    Solid: VideoRecorderSolid,
  },
  {
    name: "summaries",
    title: "Summaries",
    Line: MagicWandLine,
    Solid: MagicWandSolid,
  },
  {
    name: "documents",
    title: "Documents",
    Line: FolderLine,
    Solid: FolderSolid,
  },
  { name: "settings", title: "Settings", Line: WrenchLine, Solid: WrenchSolid },
];

const INACTIVE = "#8A8A8A"; // snow-800
const ACTIVE = { light: "#5B66C6", dark: "#FDFDFD" }; // brand-300, snow-100

export default function MainLayout() {
  const { colorScheme } = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  const inset = Math.max(bottom, 30);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "transparent" },
        tabBarActiveTintColor:
          ACTIVE[colorScheme === "dark" ? "dark" : "light"],
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          height: 64 + inset,
          paddingTop: 12,
          paddingBottom: 12 + inset,
        },
        tabBarLabelStyle: {
          fontFamily: "InterDisplay-Regular",
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: -0.084,
        },
      }}
    >
      {TABS.map(({ name, title, Line, Solid }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarButton: (props) => (
              <PlatformPressable
                {...props}
                pressColor="transparent"
                pressOpacity={1}
              />
            ),
            tabBarIcon: ({ color, focused }) => {
              const Icon = focused ? Solid : Line;
              return <Icon width={20} height={20} color={color} />;
            },
          }}
        />
      ))}
    </Tabs>
  );
}

import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Folder, VideoRecorder, Wrench } from "@/components/icons/line";
import { MagicWand } from "@/components/icons/solid";

const TABS = [
  { name: "meeting", title: "Meeting", Icon: VideoRecorder },
  { name: "summaries", title: "Summaries", Icon: MagicWand },
  { name: "documents", title: "Documents", Icon: Folder },
  { name: "settings", title: "Settings", Icon: Wrench },
];

const INACTIVE = "#8A8A8A"; // snow-800
const ACTIVE = { light: "#5B66C6", dark: "#FDFDFD" }; // brand-300, snow-100

export default function MainLayout() {
  const { colorScheme } = useColorScheme();
  const { bottom } = useSafeAreaInsets();

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
          height: 64 + bottom,
          paddingTop: 12,
          paddingBottom: bottom,
        },
        tabBarLabelStyle: {
          fontFamily: "InterDisplay-Regular",
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: -0.084,
        },
      }}
    >
      {TABS.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <Icon width={20} height={20} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

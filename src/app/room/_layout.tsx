import { Stack } from "expo-router";

export default function RoomLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        gestureEnabled: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    />
  );
}

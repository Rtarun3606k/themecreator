// app/(tabs)/_layout.js
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind"; // 1. Import the hook

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme(); // 2. Get the current theme ('light' or 'dark')

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          position: "absolute",
          bottom: bottom + 10,
          left: 20,
          right: 20,
          borderRadius: 20,
          height: 60,
          paddingBottom: 5,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 0 },

          // 3. Set the background color based on the theme
          backgroundColor:
            colorScheme === "dark"
              ? "rgba(29, 29, 29, 0.8)" // Dark, translucent background
              : "rgba(255, 255, 255, 0.9)", // Light, translucent background
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Link",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="link" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Photos",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="photo" color={color} />
          ),
        }}
      />
      {/* ... your Tabs.Screen components ... */}
    </Tabs>
  );
}

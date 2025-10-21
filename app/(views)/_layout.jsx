// app/(tabs)/_layout.js
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind"; // 1. Import the hook
import AppBar from "../../componenets/Appbar";
import * as Haptics from "expo-haptics";

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme(); // 2. Get the current theme ('light' or 'dark')

  return (
    <Tabs
      screenOptions={{
        header: () => <AppBar />,

        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          position: "absolute",
          bottom: bottom > 0 ? bottom + 5 : 15,
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
      screenListeners={{
        tabPress: (e) => {
          // Trigger light haptic feedback on tab press
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        name="camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="camera" color={color} />
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
      <Tabs.Screen
        name="Camera"
        options={{
          href: null,
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="camera" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="coffee"
        options={{
          href: null,
          title: "Coffee",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="coffee" color={color} />
          ),
        }}
      />
      {/* ... your Tabs.Screen components ... */}
    </Tabs>
  );
}

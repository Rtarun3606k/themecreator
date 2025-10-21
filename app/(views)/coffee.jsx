// app/coffee.js
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as Haptics from "expo-haptics";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import { useColorScheme } from "nativewind"; // Make sure this is imported if you use it for the icon color

export default function CoffeePage() {
  const { colorScheme } = useColorScheme(); // Get current theme

  // --- Get App Info ---
  const appVersion = Constants.expoConfig?.version ?? "N/A";
  const appName = Constants.expoConfig?.name ?? "ThemeCreator"; // Get app name

  // --- Function to handle opening links ---
  const handleLinkPress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        await Linking.openURL(url);
      } else {
        await Haptics.impactAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Error", `Don't know how to open this URL: ${url}`);
      }
    } catch (e) {
      console.error("Failed to open URL:", e);
      Alert.alert("Error", "An error occurred while trying to open the link.");
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-gray-100 dark:bg-black">
      {/* --- Main Content Card --- */}
      <View className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-md items-center">
        {/* --- App Name --- */}
        <Text className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {appName}
        </Text>

        {/* --- App Description --- */}
        <Text className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Easily create beautiful color palettes from your favorite images.
          Perfect for designers, developers, and creatives!
        </Text>

        <FontAwesome5
          name="coffee"
          size={40}
          // Use NativeWind classes for consistent theming
          className="text-yellow-600 dark:text-yellow-400"
          color={colorScheme === "dark" ? "#FBBF24" : "#D97706"}
        />

        <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4">
          Support My Work
        </Text>

        <Text className="text-center text-base text-gray-600 dark:text-gray-400 mt-2 mb-8">
          If you find this app useful, please consider supporting me. It helps
          keep the app updated and free! ☕
        </Text>

        {/* --- GitHub Sponsors Button --- */}
        <TouchableOpacity
          className="w-full flex-row items-center justify-center py-4 bg-pink-500 rounded-lg active:opacity-80" // Changed color for Sponsor
          onPress={() =>
            handleLinkPress("https://github.com/sponsors/Rtarun3606k")
          }
        >
          <FontAwesome5
            name="github"
            size={18}
            color="white"
            style={{ marginRight: 12 }}
          />
          <Text className="text-base font-bold text-white">
            Sponsor on GitHub
          </Text>
        </TouchableOpacity>

        {/* --- LinkedIn Button --- */}
        <TouchableOpacity
          className="w-full flex-row items-center justify-center py-4 bg-blue-700 dark:bg-blue-600 rounded-lg mt-4 active:opacity-80" // LinkedIn color
          onPress={() =>
            handleLinkPress(
              "https://www.linkedin.com/in/tarun-nayaka-r-28612a27a/"
            )
          }
        >
          <FontAwesome5
            name="linkedin"
            size={18}
            color="white"
            style={{ marginRight: 12 }}
          />
          <Text className="text-base font-bold text-white">
            Connect on LinkedIn
          </Text>
        </TouchableOpacity>

        {/* --- App Version --- */}
        <Text className="text-xs text-gray-400 dark:text-gray-500 mt-8">
          Version: {appVersion}
        </Text>
      </View>
    </View>
  );
}

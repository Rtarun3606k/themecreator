// app/coffee.js
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useColorScheme } from "nativewind";

export default function CoffeePage() {
  const { colorScheme } = useColorScheme();
  // --- Function to handle opening links ---
  const handleLinkPress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", `Don't know how to open this URL: ${url}`);
      }
    } catch (e) {
      console.error("Failed to open URL:", e);
      Alert.alert("Error", "An error occurred while trying to open the link.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-black">
      {/* 1. Your custom AppBar at the top */}

      <View className="flex-1 justify-center p-6">
        {/* --- Main Content Card --- */}
        <View className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-md items-center">
          <FontAwesome5
            name="coffee"
            size={40}
            className="text-yellow-600 dark:text-yellow-400"
            color={colorScheme === "dark" ? "#FBBF24" : "#B45309"}
          />

          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4">
            Support My Work
          </Text>

          <Text className="text-center text-base text-gray-600 dark:text-gray-400 mt-2 mb-8">
            If you find this app useful, please consider supporting me with a
            coffee. It helps me stay caffeinated and motivated!
          </Text>

          {/* --- Buy Me a Coffee Button --- */}
          <TouchableOpacity
            className="w-full flex-row items-center justify-center py-4 bg-yellow-500 rounded-lg active:opacity-80"
            onPress={() =>
              handleLinkPress("https://buymeacoffee.com/rtarun3606k")
            } // <-- Replace with your URL
          >
            <FontAwesome5
              name="coffee"
              size={18}
              color="white"
              style={{ marginRight: 12 }}
            />
            <Text className="text-base font-bold text-white">
              Buy Me a Coffee
            </Text>
          </TouchableOpacity>

          {/* --- GitHub Button --- */}
          <TouchableOpacity
            className="w-full flex-row items-center justify-center py-4 bg-gray-800 dark:bg-gray-200 rounded-lg mt-4 active:opacity-80"
            onPress={() => handleLinkPress("https://github.com/rtarun3606k")} // <-- Replace with your URL
          >
            <FontAwesome5
              name="github"
              size={18}
              className="text-white dark:text-black"
              style={{ marginRight: 12 }}
            />
            <Text className="text-base font-bold text-white dark:text-black">
              View on GitHub
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

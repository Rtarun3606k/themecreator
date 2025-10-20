// componenets/AppBar.js
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";

const AppBar = () => {
  const { colorScheme } = useColorScheme();
  const handleCoffeePress = async () => {
    router.push("/coffee");
  };

  return (
    // Use SafeAreaView to handle notches and the status bar area
    <SafeAreaView edges={["top"]} className="bg-white dark:bg-black">
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {/* Left Side: TC Logo */}
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200">
            <Text className="text-sm font-bold text-white dark:text-gray-800">
              TC
            </Text>
          </View>
          <Text className="text-lg font-bold text-gray-800 dark:text-white">
            ThemeCreator
          </Text>
        </View>

        {/* Right Side: Coffee Button */}
        <TouchableOpacity
          className="p-2 rounded-full active:opacity-70"
          onPress={handleCoffeePress}
        >
          <FontAwesome5
            name="coffee"
            size={20}
            className="text-gray-600 dark:text-white-300"
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppBar;

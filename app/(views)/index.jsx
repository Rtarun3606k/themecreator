import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import useImageColors from "../../hooks/useImageColors"; // Your hook should also return loading and error states
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import PaletteCard from "../../componenets/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CSS from "../../componenets/CSS";

const Index = () => {
  // State for the input field
  const [text, setText] = useState("https://i.imgur.com/68jyjZT.jpg");
  // State for the URL to be submitted to the hook
  const [imageUrl, setImageUrl] = useState("https://i.imgur.com/68jyjZT.jpg");

  // The hook now uses the state variable `imageUrl`
  const { colors, loading, error } = useImageColors(imageUrl);

  // reff
  const viewShotRef = useRef(null);

  // Function to handle the button press
  const handleGenerate = () => {
    Keyboard.dismiss(); // Hide the keyboard
    setImageUrl(text); // Set the URL and trigger the hook
  };

  // 5. Create the function to handle exporting
  const handleExport = async () => {
    try {
      // Ask for permission to save to the photo library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need permission to save photos to your device."
        );
        return;
      }

      // Capture the component as an image
      const uri = await viewShotRef.current.capture();

      // Save the image to the media library
      await MediaLibrary.saveToLibraryAsync(uri);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Alert.alert("Success!", "Color palette saved to your photo gallery.");
    } catch (e) {
      console.error(e);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Could not save the image.");
    }
  };

  return (
    // <SafeAreaView >
    <ScrollView
      // --- UPDATE THIS PART ---
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20, // Keep side padding
        paddingTop: 20, // Keep top padding
        paddingBottom: 150,
      }}
      showsVerticalScrollIndicator={false} // --- END OF UPDATE ---
      keyboardShouldPersistTaps="handled"
      className="flex-1 bg-gray-100 dark:bg-black"
    >
      {/* --- Input Card --- */}
      <View className="w-full p-5 mb-5 bg-white rounded-2xl shadow-md dark:bg-gray-900">
        <Text className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-200">
          Image URL
        </Text>
        <TextInput
          className="h-12 px-4 mb-4 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          placeholder="Enter image URL here..."
          value={text}
          onChangeText={setText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          className="items-center py-4 bg-blue-500 rounded-lg"
          onPress={handleGenerate}
        >
          <Text className="text-base font-bold text-white">
            Generate Palette
          </Text>
        </TouchableOpacity>
      </View>

      {/* --- Conditional Rendering Logic --- */}
      {loading && (
        <View className="items-center justify-center mt-10">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {error && !loading && (
        <View className="items-center justify-center mt-10">
          <Text className="text-base text-red-500">{error}</Text>
        </View>
      )}

      {colors && !loading && (
        <>
          <PaletteCard ref={viewShotRef} colors={colors} imageUrl={imageUrl} />
          <TouchableOpacity
            className="items-center py-4 bg-green-500 rounded-lg w-full mt-5 flex-row justify-center gap-4"
            onPress={handleExport}
          >
            <FontAwesome
              name="download" // Use the icon name here
              size={18}
              color="white"
              style={{ marginRight: 10 }} // Add some space between the icon and text
            />
            <Text className="text-base font-bold text-white">
              Export as Image
            </Text>
          </TouchableOpacity>

          <CSS colors={colors} />
        </>
      )}
      {/* {colors && !loading && <PaletteCard colors={colors} imageUrl={text} />} */}
    </ScrollView>
    // </SafeAreaView>
  );
};

// Extracted the Palette Card into its own component for clarity

export default Index;

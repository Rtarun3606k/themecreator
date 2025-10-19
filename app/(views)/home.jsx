// Your main screen file (e.g., app/(tabs)/photos.js)
import { useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import PaletteCard from "../../componenets/Colors"; // Heads-up: Make sure this file is named correctly!
import useImageColors from "../../hooks/useImageColors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ImagePickerExample() {
  const [imageUrl, setImageUrl] = useState(null);
  const { colors, loading, error } = useImageColors(imageUrl);
  const CardRef = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const uri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImageUrl(uri);
    }
  };

  const handleExport = async () => {
    // ... (your handleExport function is correct and unchanged) ...
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need permission to save photos to your device."
        );
        return;
      }
      const uri = await CardRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Success!", "Color palette saved to your photo gallery.");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not save the image.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-black">
      <ScrollView
        // --- THIS IS THE KEY FIX ---
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 150, // Use paddingBottom, not marginBottom
        }}
        // --- END OF FIX ---
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            className="items-center py-4 bg-blue-500 rounded-lg w-full mb-5"
            onPress={pickImage}
          >
            <Text className="text-base font-bold text-white">
              Generate Palette From Gallery
            </Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
          )}

          {error && <Text className="text-red-500 mt-20">{error}</Text>}

          {/* --- CODE REFINEMENT --- */}
          {/* Grouped the card and button in a single conditional block */}
          {colors && !loading && (
            <>
              <PaletteCard ref={CardRef} colors={colors} imageUrl={imageUrl} />
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
            </>
          )}
          {/* --- END REFINEMENT --- */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

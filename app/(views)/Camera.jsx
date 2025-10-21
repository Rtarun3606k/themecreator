// Your main screen file (e.g., app/(tabs)/photos.js)
import { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router"; // Import router
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PaletteList from "../../componenets/PalletList"; // Ensure path is correct
import CSS from "../../componenets/CSS"; // Ensure path is correct
import useImageColors from "../../hooks/useImageColors";

export default function PhotoResultScreen() {
  // Renamed component for clarity
  const [dataUri, setDataUri] = useState(null); // For color extraction
  const [displayUri, setDisplayUri] = useState(null); // For displaying image
  const { colors, loading, error } = useImageColors(dataUri);
  const cardRef = useRef(null);
  const [isCardImageReady, setIsCardImageReady] = useState(false);
  const params = useLocalSearchParams();

  useEffect(() => {
    const processImage = async (uri) => {
      try {
        setIsCardImageReady(false);
        setDisplayUri(uri); // Set display URI

        // Read file and convert to Base64 for color hook
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64", // Use the string literal directly
        });
        const base64DataUri = `data:image/jpeg;base64,${base64}`;

        setDataUri(base64DataUri);
      } catch (e) {
        console.error("Failed to process image:", e);
        Alert.alert("Error", "Could not process the selected image.");
        // Optionally navigate back or reset state on error
        // router.back();
      }
    };

    if (params.imageUri) {
      console.log("Received image URI:", params.imageUri);
      processImage(params.imageUri);
    }
  }, [params.imageUri]);

  // Define handleExport within this component
  const handleExport = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need permission to save photos."
        );
        return;
      }
      const uri = await cardRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Success!", "Palette saved to gallery.");
    } catch (e) {
      console.error(e);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Could not save image.");
    }
  };

  // Define handleImageReady within this component
  const handleImageReady = () => {
    setTimeout(() => {
      setIsCardImageReady(true);
    }, 500);
  };

  // If no image URI is provided yet, show a placeholder or instructions
  if (!params.imageUri && !displayUri) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-100 dark:bg-black p-5">
        <Text className="text-lg text-center text-gray-600 dark:text-gray-400">
          Select an image from the gallery or capture one using the camera tab.
        </Text>
        {/* You might add buttons here to navigate */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-black">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 150,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center">
          {loading && (
            <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
          )}
          {error && (
            <Text className="text-red-500 mt-20">
              {error || "Error loading colors."}
            </Text>
          )}

          {/* Render content only when not loading and no error */}
          {!loading && !error && colors && displayUri && (
            <>
              <View className="w-full items-center  p-5 bg-white rounded-2xl shadow-md dark:bg-gray-900">
                <PaletteList ref={cardRef} colors={colors} imageUrl={dataUri} />
                <View className="w-full h-64 rounded-lg mt-8 overflow-hidden shadow-md">
                  {/* 3. The Image component is now styled with absolute positioning */}
                  <Image
                    source={{ uri: dataUri }}
                    // Use StyleSheet.absoluteFillObject to make the image fill the container
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                </View>
              </View>
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
              <TouchableOpacity
                className="items-center py-4 bg-blue-500 rounded-lg w-full mt-5 flex-row justify-center gap-4"
                onPress={() => {
                  router.push("/camera");
                }}
              >
                <FontAwesome
                  name="camera" // Use the icon name here
                  size={18}
                  color="white"
                  style={{ marginRight: 10 }} // Add some space between the icon and text
                />
                <Text className="text-base font-bold text-white">
                  Take Another Photo
                </Text>
              </TouchableOpacity>
              <View className="w-full h-auto">
                <CSS colors={colors} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

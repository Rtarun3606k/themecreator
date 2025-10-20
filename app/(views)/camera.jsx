// app/camera.js
import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  // --- Permission Handling ---
  if (!permission) {
    return <View />; // Or a loading indicator
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-center text-white mb-4">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          className="py-3 px-6 bg-blue-500 rounded-lg"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Main Functions ---
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(photo);
      } catch (e) {
        console.error("Failed to take picture:", e);
      }
    }
  };

  const usePhoto = () => {
    router.replace({
      pathname: "/Camera", // Make sure this matches your main screen's file name
      params: { imageUri: capturedPhoto.uri },
    });
  };

  // --- UI Rendering ---
  if (capturedPhoto) {
    // --- PREVIEW UI (FIXED) ---
    // ImageBackground fills the entire screen
    return (
      <ImageBackground
        source={{ uri: capturedPhoto.uri }}
        className="flex-1 justify-end"
      >
        <View className="flex-row justify-around items-center p-8 bg-black/50  bottom-[15%] ">
          <TouchableOpacity
            className="items-center"
            onPress={() => setCapturedPhoto(null)}
          >
            <FontAwesome name="repeat" size={24} color="white" />
            <Text className="text-white font-bold mt-1">Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={usePhoto}>
            <FontAwesome name="check" size={24} color="white" />
            <Text className="text-white font-bold mt-1">Use Photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // --- LIVE CAMERA UI (FIXED) ---
  // CameraView now fills the screen with no padding
  return (
    <CameraView ref={cameraRef} className=" h-full p-[120]">
      <View className=" flex justify-end items-end p-8 bg-black/50 h-full">
        <TouchableOpacity
          className="w-20 h-20 bg-white rounded-full border-4 border-gray-400 bottom-[15%] right-[40%]"
          onPress={takePicture}
        />
      </View>
    </CameraView>
  );
}

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ViewShot from "react-native-view-shot";

const PaletteCard = React.forwardRef(({ colors, imageUrl }, ref) => {
  console.log("PaletteCard colors:", colors, imageUrl);
  const colorData = Object.entries(colors).filter(
    ([key]) => key !== "platform"
  );

  return (
    <ViewShot
      ref={ref}
      options={{ fileName: "color-palette", format: "png", quality: 0.9 }}
    >
      <View className="w-full p-5 bg-white rounded-2xl shadow-md dark:bg-gray-900">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-5 dark:text-gray-200">
          Color Palette
        </Text>

        {/* This View holds the horizontal "shades" */}
        <View className="flex-row flex-wrap justify-center pb-5 mb-5 border-b border-gray-200 items-center">
          {colorData.map(([key, value]) => (
            <View
              key={key}
              className="w-10 h-10 m-px" // Your updated compact style
              style={{ backgroundColor: value }}
            />
          ))}
        </View>

        {/* This View lists the details of each color */}
        <View className="w-full flex justify-center items-center">
          {colorData.map(([key, value]) => (
            <View key={key} className="flex-row items-center my-1 px-2 ">
              <View
                className="w-5 h-5 mr-3 rounded"
                style={{ backgroundColor: value }}
              />
              <Text className="w-32 text-base font-bold text-gray-600 capitalize">
                {key}:
              </Text>
              <Text className="text-base text-gray-500 font-mono">{value}</Text>
            </View>
          ))}
          <View className="w-full h-64 rounded-lg mt-8 overflow-hidden shadow-md">
            {/* 3. The Image component is now styled with absolute positioning */}
            <Image
              source={{ uri: imageUrl }}
              // Use StyleSheet.absoluteFillObject to make the image fill the container
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </ViewShot>
  );
});

export default PaletteCard;

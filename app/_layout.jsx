// app/_layout.js
import { Slot } from "expo-router";
import "../global.css"; // Keep your global styles import
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Slot screenOptions={{}} />
    </View>
  );
}

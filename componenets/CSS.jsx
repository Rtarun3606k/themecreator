import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * Converts a JavaScript object into a string of CSS custom properties.
 * This function is moved outside the component because it doesn't need props or state.
 * @param {object} colorObject - An object of key-value color pairs.
 * @returns {string} A string of CSS variables.
 */
function convertToCssVariables(colorObject) {
  if (!colorObject || typeof colorObject !== "object") {
    return "";
  }
  return Object.entries(colorObject)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n"); // Use newline for better readability in the UI
}

const CSS = ({ colors }) => {
  const [cssString, setCssString] = useState("");
  const [copied, setCopied] = useState(false); // State for copy feedback

  useEffect(() => {
    setCssString(convertToCssVariables(colors));
  }, [colors]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(cssString);
    setCopied(true);
    // Reset the "Copied!" state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View className="mt-6 p-4 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg">
      {/* Header Section */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <FontAwesome
            name="css3"
            size={14}
            className=" text-black  dark:text-white"
          />
          <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            CSS Variables
          </Text>
        </View>

        {/* Custom Copy Button with Feedback */}
        <TouchableOpacity
          className="flex-row items-center gap-2 px-3 py-1.5 rounded-md bg-gray-200 dark:bg-slate-700 active:opacity-70"
          onPress={copyToClipboard}
          disabled={copied}
        >
          {copied ? (
            <>
              <FontAwesome name="check" size={14} className="text-green-500" />
              <Text className="text-sm font-medium text-green-600 dark:text-green-400">
                Copied!
              </Text>
            </>
          ) : (
            <>
              <FontAwesome
                name="clipboard"
                size={14}
                className="text-gray-600 dark:text-gray-300"
              />
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Copy
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Code Block Section */}
      <View className="mt-3 p-3 bg-gray-200 dark:bg-slate-900 rounded-md">
        <Text className="text-gray-800 dark:text-gray-300 font-mono text-xs leading-5">
          {cssString}
        </Text>
      </View>
    </View>
  );
};

export default CSS;

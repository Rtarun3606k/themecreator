// hooks/useImageColors.js
import React, { useState, useEffect } from "react";
import { getColors } from "react-native-image-colors";

const useImageColors = (url) => {
  const [colors, setColors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // console.log("useImageColors called with URL:", url);

  useEffect(() => {
    // Flag to prevent state updates if the component unmounts during fetch
    let isMounted = true;

    const fetchColors = async () => {
      // Don't proceed if the URL is empty
      if (!url) {
        setColors(null);
        return;
      }

      // 1. Set initial loading and error states
      setLoading(true);
      setError(null);

      try {
        const result = await getColors(url, {
          fallback: "#FFFFFF", // A neutral fallback color
          cache: true,
          key: url,
        });
        console.log("Image colors result:", result);

        if (isMounted) {
          // 2. Normalize the color data based on the platform
          let processedColors = {};
          switch (result.platform) {
            case "android":
              processedColors = {
                average: result.average,
                darkMuted: result.darkMuted,
                darkVibrant: result.darkVibrant,
                dominant: result.dominant,
                lightMuted: result.lightMuted,
                lightVibrant: result.lightVibrant,
                muted: result.muted,
                platform: "android",
                vibrant: "#386078",
              };
              break;
            case "web":
              processedColors = {
                dominant: result.dominant,
                vibrant: result.vibrant,
                darkVibrant: result.darkVibrant,
                lightVibrant: result.lightVibrant,
                darkMuted: result.darkMuted,
                lightMuted: result.lightMuted,
              };
              break;
            case "ios":
              processedColors = {
                background: result.background,
                primary: result.primary,
                secondary: result.secondary,
                detail: result.detail,
              };
              break;
            default:
              throw new Error("Unexpected platform for image colors");
          }
          setColors(processedColors);
        }
      } catch (e) {
        if (isMounted) {
          setError(
            "Could not get colors from this image. Please try another URL."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchColors();

    // Cleanup function to run when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [url]); // Re-run the effect only when the URL changes

  // 3. Return an object with all relevant states
  return { colors, loading, error };
};

export default useImageColors;

import type { PropsWithChildren, ReactElement } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedView } from "@/components/ThemedView";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  console.log("🚀 ~ colorScheme:", colorScheme);

  return (
    <ThemedView style={styles.container}>
      <StatusBar
        barStyle="dark-content" // Use "dark-content" for dark text/icons
        // backgroundColor="#6a51ae" // Set background color (Android only)
        hidden={false} // Hide or show the status bar
      />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <LinearGradient
          colors={["#fafafa", headerBackgroundColor[colorScheme]]}
          style={
            (styles.header,
            {
              overflow: "hidden",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            })
          }
        >
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            {/* {headerImage} */}
          </Animated.View>
        </LinearGradient>

        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 300,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});

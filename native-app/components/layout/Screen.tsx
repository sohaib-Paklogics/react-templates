import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { tokens } from "@/config/tokens";

export function Screen({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.base, { backgroundColor: theme.colors.bg }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg,
  },
});

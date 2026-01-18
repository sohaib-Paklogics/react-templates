import React from "react";
import { SafeAreaView, ScrollView, StyleProp, StyleSheet, View, ViewStyle, ScrollViewProps } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { tokens } from "@/config/tokens";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;

  /** If true, Screen becomes scrollable */
  scroll?: boolean;

  /** ScrollView content style (padding, gap etc.) */
  contentStyle?: StyleProp<ViewStyle>;

  /** Extra ScrollView props */
  scrollProps?: ScrollViewProps;
};

export function Screen({ children, style, scroll = false, contentStyle, scrollProps }: Props) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.base, { backgroundColor: theme.colors.bg }, style]}>
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, contentStyle]}
          {...scrollProps}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1 },

  // When scroll=false
  content: {
    flex: 1,
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg,
  },

  // When scroll=true (ScrollView content)
  scrollContent: {
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg,
    paddingBottom: tokens.spacing.xl, // keeps content above tab bar/FAB
    flexGrow: 1, // ✅ important for proper scrolling behavior
  },
});

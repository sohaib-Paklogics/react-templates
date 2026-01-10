import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/providers/ThemeProvider";
import { tokens } from "@/config/tokens";
import { AppText } from "./AppText";

type Variant = "primary" | "secondary" | "outline" | "ghost";

export function Button({
  title,
  onPress,
  loading,
  disabled,
  variant = "primary",
  style,
}: {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  style?: ViewStyle;
}) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  const base = [
    styles.base,
    { borderRadius: tokens.radii.md },
    variant === "outline" && { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: "transparent" },
    variant === "secondary" && { backgroundColor: theme.colors.surface2 },
    variant === "ghost" && { backgroundColor: "transparent" },
    isDisabled && { opacity: 0.6 },
    style,
  ] as any;

  const content = (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <AppText variant="h3" weight="600" color={variant === "primary" ? theme.colors.onBrand : theme.colors.text}>
          {title}
        </AppText>
      )}
    </>
  );

  if (variant === "primary") {
    return (
      <Pressable onPress={onPress} disabled={isDisabled} style={base}>
        <LinearGradient
          colors={[theme.colors.brand, theme.colors.brand2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { borderRadius: tokens.radii.md }]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={isDisabled} style={base}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fill: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

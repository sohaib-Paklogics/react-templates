import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/providers/ThemeProvider";

export function EmptyState({
  title = "No results found",
  subtitle = "Try changing filters or add your first record.",
  actionLabel,
  onAction,
  style,
}: {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}) {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, style]}>
      <AppText variant="h2" weight="600" style={{ textAlign: "center" }}>
        {title}
      </AppText>
      <AppText variant="body" color={theme.colors.muted} style={{ textAlign: "center", marginTop: 8 }}>
        {subtitle}
      </AppText>

      {!!actionLabel && !!onAction && (
        <View style={{ marginTop: 16, width: "100%" }}>
          <Button title={actionLabel} variant="secondary" onPress={onAction} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
});

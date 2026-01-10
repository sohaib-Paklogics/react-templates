import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { AppText } from "./AppText";

export function Divider({ label }: { label: string }) {
  const { theme } = useTheme();
  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
      <AppText variant="caption" color={theme.colors.muted} style={{ marginHorizontal: 10 }}>
        {label}
      </AppText>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  line: { flex: 1, height: 1 },
});

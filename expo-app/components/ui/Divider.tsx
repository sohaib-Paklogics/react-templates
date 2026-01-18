import React from "react";
import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

export function Divider({ text }: { text: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 18 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border, opacity: 0.65 }} />
      <AppText variant="caption" color={theme.colors.muted}>
        {text}
      </AppText>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border, opacity: 0.65 }} />
    </View>
  );
}

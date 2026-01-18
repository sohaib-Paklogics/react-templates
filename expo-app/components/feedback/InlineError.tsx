import React from "react";
import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

export function InlineError({ message }: { message?: string }) {
  const { theme } = useTheme();
  if (!message) return null;
  return (
    <View style={{ marginTop: 6 }}>
      <AppText variant="caption" color={theme.colors.danger}>
        {message}
      </AppText>
    </View>
  );
}

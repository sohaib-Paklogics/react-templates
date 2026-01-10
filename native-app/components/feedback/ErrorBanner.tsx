import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { X } from "lucide-react-native";

export function ErrorBanner({
  message,
  onClose,
}: {
  message?: string;
  onClose?: () => void;
}) {
  const { theme } = useTheme();
  if (!message) return null;

  return (
    <View style={[styles.wrap, { backgroundColor: "rgba(255,77,77,0.12)", borderColor: "rgba(255,77,77,0.35)" }]}>
      <AppText variant="small" color={theme.colors.danger} style={{ flex: 1 }}>
        {message}
      </AppText>
      {!!onClose && (
        <Pressable onPress={onClose} hitSlop={10}>
          <X size={18} color={theme.colors.danger} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
});

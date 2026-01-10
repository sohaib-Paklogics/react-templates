import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { AppText } from "@/components/ui/AppText";

export function FullscreenLoader({
  visible,
  text = "Loading...",
}: {
  visible: boolean;
  text?: string;
}) {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={[styles.backdrop, { backgroundColor: "rgba(0,0,0,0.65)" }]}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface2, borderColor: theme.colors.border }]}>
          <ActivityIndicator />
          <AppText variant="small" color={theme.colors.muted} style={{ marginTop: 10 }}>
            {text}
          </AppText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    minWidth: 160,
  },
});

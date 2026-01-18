import React from "react";
import { StyleSheet, View } from "react-native";
import { AppModal } from "./AppModal";
import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/providers/ThemeProvider";

export function ConfirmDialog({
  visible,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  destructive,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { theme } = useTheme();

  return (
    <AppModal visible={visible} onClose={onCancel}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface2, borderColor: theme.colors.border }]}>
        <AppText variant="h2" weight="600">
          {title}
        </AppText>
        <AppText variant="body" color={theme.colors.muted} style={{ marginTop: 8 }}>
          {message}
        </AppText>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Button title={cancelText} variant="outline" onPress={onCancel} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title={confirmText} variant={destructive ? "secondary" : "primary"} onPress={onConfirm} />
          </View>
        </View>

        {destructive && (
          <AppText variant="caption" color={theme.colors.danger} style={{ marginTop: 10 }}>
            Tip: This is a destructive action.
          </AppText>
        )}
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 18, padding: 16 },
  row: { flexDirection: "row", gap: 12, marginTop: 16 },
});

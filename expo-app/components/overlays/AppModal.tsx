import React from "react";
import { Modal, Pressable, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { appModalStyles as s } from "@/styles/appModalStyles";

export function AppModal({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[s.backdrop, { backgroundColor: theme.colors.overlay }]}>
        <Pressable style={s.backdropPress} onPress={onClose} />
        <View style={[s.card, { backgroundColor: theme.colors.surface2, borderColor: theme.colors.border }]}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

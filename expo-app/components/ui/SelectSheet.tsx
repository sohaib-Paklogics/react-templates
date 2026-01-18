import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/ThemeProvider";
import { AppText } from "@/components/ui/AppText";

type Item = { label: string; value: string };

export function SelectSheet({
  visible,
  title,
  items,
  value,
  onClose,
  onSelect,
}: {
  visible: boolean;
  title: string;
  items: Item[];
  value?: string;
  onClose: () => void;
  onSelect: (v: string) => void;
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]} />

      <View style={[styles.sheet, { paddingBottom: Math.max(14, insets.bottom) }]}>
        <View style={[styles.sheetInner, { backgroundColor: theme.colors.surface2, borderColor: theme.colors.border }]}>
          <AppText variant="h3" weight="700" style={{ textAlign: "center" }}>
            {title}
          </AppText>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
            {items.map((it) => {
              const active = it.value === value;
              return (
                <Pressable
                  key={it.value}
                  onPress={() => onSelect(it.value)}
                  style={[
                    styles.row,
                    { borderColor: theme.colors.border },
                    active && { borderColor: theme.colors.brand },
                  ]}
                >
                  <AppText variant="body" weight={active ? "700" : "500"}>
                    {it.label}
                  </AppText>
                </Pressable>
              );
            })}
          </ScrollView>

          <Pressable onPress={onClose} style={[styles.closeBtn, { borderColor: theme.colors.border }]}>
            <AppText variant="body" weight="700" color={theme.colors.brand}>
              Close
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },
  sheetInner: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  divider: { height: 1, marginVertical: 12 },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  closeBtn: {
    marginTop: 4,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

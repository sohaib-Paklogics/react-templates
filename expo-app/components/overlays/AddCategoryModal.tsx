import React, { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { AppText } from "@/components/ui/AppText";
import { TextField } from "@/components/ui/TextField";

export function AddCategoryModal({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}) {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | undefined>();

  const can = useMemo(() => name.trim().length >= 2, [name]);

  const submit = () => {
    if (!can) return setErr("Enter category name");
    setErr(undefined);
    onAdd(name.trim());
    setName("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]} onPress={onClose} />

      <View style={styles.center}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface2, borderColor: theme.colors.border }]}>
          <AppText variant="h3" weight="700" style={{ textAlign: "center" }}>
            Set Your Category Name
          </AppText>

          <View style={{ marginTop: 12 }}>
            <TextField value={name} onChangeText={setName} placeholder="Name Here" error={err} />
          </View>

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.actionBtn}>
              <AppText variant="body" weight="700" color={theme.colors.subtle}>
                Cancel
              </AppText>
            </Pressable>

            <Pressable onPress={submit} style={styles.actionBtn}>
              <AppText variant="body" weight="700" color={theme.colors.brand}>
                Set
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  card: { width: "100%", borderRadius: 18, borderWidth: 1, padding: 14 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, paddingHorizontal: 6 },
  actionBtn: { paddingVertical: 10, paddingHorizontal: 14 },
});

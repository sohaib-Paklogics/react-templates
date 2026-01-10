import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View, ViewStyle } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { tokens } from "@/config/tokens";
import { AppText } from "./AppText";
import { Eye, EyeOff } from "lucide-react-native";

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  secure,
  error,
  containerStyle,
}: {
  label?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  secure?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
}) {
  const { theme } = useTheme();
  const [hide, setHide] = useState(!!secure);

  const rightIcon = useMemo(() => {
    if (!secure) return null;
    const Icon = hide ? Eye : EyeOff;
    return (
      <Pressable onPress={() => setHide((p) => !p)} hitSlop={10}>
        <Icon size={18} color={theme.colors.subtle} />
      </Pressable>
    );
  }, [hide, secure, theme.colors.subtle]);

  return (
    <View style={containerStyle}>
      {!!label && (
        <AppText variant="label" color={theme.colors.muted} style={{ marginBottom: 8 }}>
          {label}
        </AppText>
      )}

      <View
        style={[
          styles.inputWrap,
          {
            backgroundColor: theme.colors.surface2,
            borderColor: theme.colors.border,
            borderRadius: tokens.radii.md,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.subtle}
          secureTextEntry={hide}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontFamily: "Poppins_400Regular",
            },
          ]}
        />

        {!!rightIcon && <View style={styles.right}>{rightIcon}</View>}
      </View>

      {!!error && (
        <AppText variant="caption" color={theme.colors.danger} style={{ marginTop: 6 }}>
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    height: 54,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  right: {
    marginLeft: 10,
  },
});

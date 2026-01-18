import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View, ViewStyle, TextInputProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/providers/ThemeProvider";
import { tokens } from "@/config/tokens";
import { AppText } from "./AppText";
import { Eye, EyeOff } from "lucide-react-native";

type Props = {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;

  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;

  secure?: boolean;

  /** optional convenience */
  editable?: boolean;
} & Omit<TextInputProps, "style" | "secureTextEntry" | "editable">;

export function TextField({
  label,
  error,
  containerStyle,
  leftIcon,
  rightSlot,
  secure,
  editable = true,

  // TextInputProps (value, onChangeText, keyboardType, etc.)
  value,
  onChangeText,
  placeholder,
  ...inputProps
}: Props) {
  const { theme } = useTheme();
  const [hide, setHide] = useState(!!secure);
  const [focused, setFocused] = useState(false);

  const rightIcon = useMemo(() => {
    if (rightSlot) return rightSlot;
    if (!secure) return null;

    const Icon = hide ? Eye : EyeOff;
    return (
      <Pressable onPress={() => setHide((p) => !p)} hitSlop={10}>
        <Icon size={18} color={theme.colors.subtle} />
      </Pressable>
    );
  }, [hide, secure, rightSlot, theme.colors.subtle]);

  const borderColor = error ? theme.colors.danger : focused ? theme.colors.brand : "rgba(255,255,255,0.12)";

  return (
    <View style={containerStyle}>
      {!!label && (
        <AppText variant="label" color={theme.colors.muted} style={{ marginBottom: 8 }}>
          {label}
        </AppText>
      )}

      <View
        style={[
          styles.wrap,
          {
            height: tokens.controls.h,
            borderRadius: tokens.radii.md,
            borderColor,
          },
        ]}
      >
        {/* base background */}
        <LinearGradient
          colors={["#24262A", "#17181B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* inset effects */}
        {/* <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={["rgba(255,255,255,0.22)", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ height: 12 }}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.25)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[StyleSheet.absoluteFill, { transform: [{ translateY: 10 }] }]}
          />
        </View> */}

        {!!leftIcon && <View style={styles.left}>{leftIcon}</View>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.subtle}
          secureTextEntry={secure ? hide : false}
          editable={editable}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontFamily: "Poppins_400Regular",
              opacity: editable ? 1 : 0.6,
            },
          ]}
          {...inputProps}
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
  wrap: {
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  left: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  right: { marginLeft: 10 },
});

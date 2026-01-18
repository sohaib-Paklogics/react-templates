import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/providers/ThemeProvider";
import { tokens } from "@/config/tokens";
import { AppText } from "./AppText";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

function mix(hex: string, hex2: string, p: number) {
  // small helper: mix two hex colors
  const n = (h: string) => parseInt(h.replace("#", ""), 16);
  const a = n(hex);
  const b = n(hex2);
  const ar = (a >> 16) & 255,
    ag = (a >> 8) & 255,
    ab = a & 255;
  const br = (b >> 16) & 255,
    bg = (b >> 8) & 255,
    bb = b & 255;
  const r = Math.round(ar + (br - ar) * p);
  const g = Math.round(ag + (bg - ag) * p);
  const bl = Math.round(ab + (bb - ab) * p);
  return `rgb(${r},${g},${bl})`;
}

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = true,
  style,
  iconLeft,
  iconRight,
  testID,
}: {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  style?: ViewStyle;

  // ✅ icons (use ButtonIcon wrapper outside)
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;

  testID?: string;
}) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  // Figma-ish sizing
  const height = size === "sm" ? 34 : size === "lg" ? 52 : tokens.controls.h;

  const radius = size === "sm" ? tokens.radii.md : tokens.radii.md;

  const px = size === "sm" ? 14 : 16;

  // colors (close to your figma screenshots)
  const primaryTop = mix(theme.colors.brand, "#FFFFFF", 0.18); // lighter top
  const primaryBottom = mix(theme.colors.brand, "#000000", 0.12); // darker bottom

  const secondaryTop = "#2B2E33";
  const secondaryBottom = "#17181B";

  const textColor = variant === "primary" ? theme.colors.onBrand : theme.colors.text;

  const borderColor =
    variant === "primary" ? mix(theme.colors.brand, "#000000", 0.18) : mix(theme.colors.border, "#FFFFFF", 0.12);

  const base: ViewStyle = {
    height,
    borderRadius: radius,
    paddingHorizontal: px,
    width: fullWidth ? "100%" : undefined,
    overflow: "hidden",
    borderWidth: variant === "ghost" ? 0 : 1,
    borderColor: variant === "outline" ? theme.colors.border : borderColor,
    backgroundColor: variant === "ghost" ? "transparent" : "transparent",
    opacity: isDisabled ? 0.6 : 1,
  };

  const content = (
    <View style={styles.contentRow}>
      {!!iconLeft && <View style={styles.iconWrap}>{iconLeft}</View>}

      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? theme.colors.onBrand : theme.colors.text} />
      ) : (
        <AppText
          variant={size === "sm" ? "small" : "h3"}
          weight="600"
          color={textColor}
          style={{ textAlign: "center" }}
        >
          {title}
        </AppText>
      )}

      {!!iconRight && <View style={styles.iconWrap}>{iconRight}</View>}
    </View>
  );

  const InnerEffects = (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* top thin highlight (like figma inner shadow white 22%) */}
      <LinearGradient
        colors={["rgba(255,255,255,0.22)", "rgba(255,255,255,0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ height: 12 }}
      />
      {/* soft inner glow */}
      <LinearGradient
        colors={["rgba(255,255,255,0.14)", "rgba(255,255,255,0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* bottom inner shade */}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.20)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[StyleSheet.absoluteFill, { transform: [{ translateY: 8 }] }]}
      />
    </View>
  );

  // PRIMARY (orange)
  if (variant === "primary") {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        disabled={isDisabled}
        style={({ pressed }) => [
          base,
          pressed && !isDisabled ? { transform: [{ scale: 0.99 }], opacity: 0.92 } : null,
          style,
        ]}
      >
        <LinearGradient
          colors={[primaryTop, theme.colors.brand, primaryBottom]}
          locations={[0, 0.55, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
        />
        {InnerEffects}
        {content}
      </Pressable>
    );
  }

  // SECONDARY (google / dark button)
  if (variant === "secondary") {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        disabled={isDisabled}
        style={({ pressed }) => [
          base,
          { height: tokens.controls.hGoogle }, // google looks 48px
          pressed && !isDisabled ? { transform: [{ scale: 0.99 }], opacity: 0.92 } : null,
          style,
        ]}
      >
        <LinearGradient
          colors={[secondaryTop, secondaryBottom]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {InnerEffects}
        {content}
      </Pressable>
    );
  }

  // OUTLINE
  if (variant === "outline") {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        disabled={isDisabled}
        style={({ pressed }) => [
          base,
          { backgroundColor: "transparent", borderColor: theme.colors.border },
          pressed && !isDisabled ? { opacity: 0.9 } : null,
          style,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  // GHOST
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        base,
        { borderWidth: 0, backgroundColor: "transparent" },
        pressed && !isDisabled ? { opacity: 0.85 } : null,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});

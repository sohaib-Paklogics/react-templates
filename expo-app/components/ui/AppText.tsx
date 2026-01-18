import React from "react";
import { Text, TextProps } from "react-native";
import { tokens } from "@/config/tokens";
import { useTheme } from "@/providers/ThemeProvider";

type Variant = "h1" | "h2" | "h3" | "body" | "small" | "caption" | "label";
type Weight = "300" | "400" | "500" | "600" | "700";

const fontByWeight: Record<Weight, string> = {
  "300": "Poppins_300Light",
  "400": "Poppins_400Regular",
  "500": "Poppins_500Medium",
  "600": "Poppins_600SemiBold",
  "700": "Poppins_700Bold",
};

export function AppText({
  variant = "body",
  color,
  weight = "400",
  style,
  ...props
}: TextProps & { variant?: Variant; color?: string; weight?: Weight }) {
  const { theme } = useTheme();

  const map = {
    h1: { fontSize: tokens.fontSize.h1, lineHeight: tokens.lineHeight.h1 },
    h2: { fontSize: tokens.fontSize.h2, lineHeight: tokens.lineHeight.h2 },
    h3: { fontSize: tokens.fontSize.h3, lineHeight: tokens.lineHeight.h3 },
    body: { fontSize: tokens.fontSize.body, lineHeight: tokens.lineHeight.body },
    small: { fontSize: tokens.fontSize.small, lineHeight: tokens.lineHeight.small },
    caption: { fontSize: tokens.fontSize.caption, lineHeight: tokens.lineHeight.caption },
    label: { fontSize: tokens.fontSize.small, lineHeight: tokens.lineHeight.small },
  }[variant];

  return (
    <Text
      {...props}
      style={[
        { color: color ?? theme.colors.text, fontFamily: fontByWeight[weight], ...map },
        style,
      ]}
    />
  );
}

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/ThemeProvider";
import { AppText } from "@/components/ui/AppText";
import { ChevronLeft } from "lucide-react-native";

export function AuthLayout({
  children,
  title,
  subtitle,
  showBack,
  onBack,
  topSlot,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  topSlot?: React.ReactNode;
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <LinearGradient
        colors={[theme.colors.bgTop, theme.colors.bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={{ paddingTop: insets.top + 18, paddingHorizontal: 20, flex: 1 }}>
        <View style={{ minHeight: 34, flexDirection: "row", alignItems: "center" }}>
          {showBack ? (
            <Pressable onPress={onBack} hitSlop={10} style={{ paddingRight: 10 }}>
              <ChevronLeft size={22} color={theme.colors.text} />
            </Pressable>
          ) : (
            <View style={{ width: 32 }} />
          )}

          <View style={{ flex: 1 }}>{topSlot}</View>
        </View>

        {!!title && (
          <AppText variant="h2" weight="700" style={{ marginTop: 18 }}>
            {title}
          </AppText>
        )}

        {!!subtitle && (
          <AppText variant="body" color={theme.colors.muted} style={{ marginTop: 10, lineHeight: 22 }}>
            {subtitle}
          </AppText>
        )}

        <View style={{ flex: 1, marginTop: 18 }}>{children}</View>
      </View>
    </View>
  );
}

import React from "react";
import { Pressable, View } from "react-native";
import { ArrowUpDown } from "lucide-react-native";

import { useTheme } from "@/providers/ThemeProvider";
import { AppText } from "@/components/ui/AppText";
import { historyStyles as s } from "@/styles/historyStyles";

export function ListHeader({ title, onPressSort }: { title: string; onPressSort?: () => void }) {
  const { theme } = useTheme();

  return (
    <View style={s.listHeaderRow}>
      <AppText variant="body" weight="600" color={theme.colors.muted}>
        {title}
      </AppText>

      <Pressable onPress={onPressSort} hitSlop={10} style={s.sortBtn}>
        <ArrowUpDown size={18} color={theme.colors.muted} />
      </Pressable>
    </View>
  );
}

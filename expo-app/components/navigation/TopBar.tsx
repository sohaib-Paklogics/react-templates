import React from "react";
import { Pressable, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/providers/ThemeProvider";
import { AppText } from "@/components/ui/AppText";
import { historyStyles as s } from "@/styles/historyStyles";

export function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.topBar, { paddingTop: insets.top }]}>
      <Pressable onPress={onBack} hitSlop={10} style={s.backBtn}>
        <ChevronLeft size={22} color={theme.colors.text} />
      </Pressable>

      <View style={s.topTitleWrap}>
        <AppText variant="h3" weight="700" style={{ textAlign: "center" }}>
          {title}
        </AppText>
      </View>

      {/* right spacer to keep center title perfectly aligned */}
      <View style={s.backBtn} />
    </View>
  );
}

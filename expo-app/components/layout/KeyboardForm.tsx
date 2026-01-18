import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function KeyboardForm({ children, bottomSpace = 18 }: { children: React.ReactNode; bottomSpace?: number }) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + bottomSpace,
      }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={Platform.OS === "ios" ? 14 : 22} // ✅ lifts focused input above keyboard
      extraHeight={Platform.OS === "ios" ? 14 : 22}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </KeyboardAwareScrollView>
  );
}

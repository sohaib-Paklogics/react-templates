import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AppProviders } from "@/providers/AppProviders";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { AuthGate } from "@/providers/AuthGate";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppProviders>
      <ThemeProvider>
        <ToastProvider>
          <NavThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <AuthGate>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
              </Stack>
            </AuthGate>
            <StatusBar style="auto" />
          </NavThemeProvider>
        </ToastProvider>
      </ThemeProvider>
    </AppProviders>
  );
}

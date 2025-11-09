import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../theme';
import { useAuthStore } from '@/store/auth.store';

export default function RootLayout() {
  const token = useAuthStore((s) => s.token);
  const t = useTheme('dark');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: t.bg } }}>
        {/* Auth and Tabs groups use nested layouts */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      {/* If you want automatic redirect at root: */}
      {!token ? <Redirect href="/(auth)/login" /> : <Redirect href="/(tabs)" />}
    </SafeAreaView>
  );
}

import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useTheme } from '../../theme';
import { useAuthStore } from '@/store/auth.store';

export default function AuthLayout() {
  const t = useTheme();
  const token = useAuthStore((s) => s.token);
  if (token) return <Redirect href="/(tabs)" />;

  return (
    <Stack screenOptions={{ headerShown:false, contentStyle:{ backgroundColor: t.bg } }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}

import { useAuthStore } from '@/store/auth.store';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { useTheme } from '../../theme';

export default function TabsLayout() {
  const t = useTheme();
  const token = useAuthStore((s) => s.token);
  if (!token) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: t.surface, borderTopColor: t.border },
        tabBarActiveTintColor: t.primary,
        tabBarInactiveTintColor: t.mutedText,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color, size}) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transactions', tabBarIcon: ({color, size}) => <Ionicons name="list" color={color} size={size} /> }} />
      <Tabs.Screen name="events" options={{ title: 'Events', tabBarIcon: ({color, size}) => <Ionicons name="calendar-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="reports" options={{ title: 'Reports', tabBarIcon: ({color, size}) => <Ionicons name="analytics-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({color, size}) => <Ionicons name="settings-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}

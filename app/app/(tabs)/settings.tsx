import React from 'react';
import { ScrollView } from 'react-native';
import { spacing, useTheme } from '../../theme';
import Heading from '../../components/primitives/Heading';
import Card from '../../components/primitives/Card';
import Button from '../../components/primitives/Button';
import Text from '../../components/primitives/Text';
import { useAuthStore } from '@/store/auth.store';

export default function SettingsScreen() {
  const t = useTheme();
  const clear = useAuthStore((s) => s.clear);
  return (
    <ScrollView style={{ flex:1, backgroundColor: t.bg }} contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}>
      <Heading level={1}>Settings</Heading>
      <Card>
        <Text muted>Profile & Preferences</Text>
        <Button title="Logout" variant="danger" onPress={() => clear()} />
      </Card>
    </ScrollView>
  );
}

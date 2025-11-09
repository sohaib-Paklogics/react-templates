import React from 'react';
import { ScrollView } from 'react-native';
import Card from '../../components/primitives/Card';
import Heading from '../../components/primitives/Heading';
import Text from '../../components/primitives/Text';
import { spacing, useTheme } from '../../theme';

export default function ReportsScreen() {
  const t = useTheme();
  return (
    <ScrollView style={{ flex:1, backgroundColor: t.bg }} contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}>
      <Heading level={1}>Reports</Heading>
      <Card><Text>Monthly summary, Category breakdown, Cashflow charts</Text></Card>
    </ScrollView>
  );
}

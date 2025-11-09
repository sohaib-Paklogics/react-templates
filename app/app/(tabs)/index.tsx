import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Card from '../../components/primitives/Card';
import Heading from '../../components/primitives/Heading';
import Text from '../../components/primitives/Text';
import { spacing, useTheme } from '../../theme';

export default function HomeScreen() {
  const t = useTheme();
  return (
    <View style={{ flex:1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}>
        <Heading level={1}>This Month</Heading>
        <View style={{ flexDirection:'row', gap: spacing.md }}>
          <Card style={{ flex:1 }}><Text muted>Income</Text><Heading level={2}>PKR 100,000</Heading></Card>
          <Card style={{ flex:1 }}><Text muted>Expense</Text><Heading level={2}>PKR 62,500</Heading></Card>
        </View>
        <View style={{ flexDirection:'row', gap: spacing.md }}>
          <Card style={{ flex:1 }}><Text muted>Saving</Text><Heading level={2}>PKR 37,500</Heading></Card>
          <Card style={{ flex:1 }}><Text muted>Saving Rate</Text><Heading level={2}>37.5%</Heading></Card>
        </View>
        <Heading level={3} style={{ marginTop: spacing.lg }}>Budgets</Heading>
        <Card><Text muted>Groceries</Text><Text>PKR 15,200 / 35,000</Text></Card>
      </ScrollView>

      <Link href="/modal" asChild>
        <Pressable
          style={{
            position:'absolute', right: spacing.lg, bottom: spacing.lg,
            backgroundColor: t.primary, width:56, height:56, borderRadius:28, alignItems:'center', justifyContent:'center'
          }}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      </Link>
    </View>
  );
}

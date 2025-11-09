import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme, spacing } from '../../theme';

export default function Card({ style, ...rest }: ViewProps) {
  const t = useTheme();
  return (
    <View
      {...rest}
      style={[
        { backgroundColor: t.card, borderColor: t.border, borderWidth: 1, borderRadius: 16, padding: spacing.md },
        style,
      ]}
    />
  );
}

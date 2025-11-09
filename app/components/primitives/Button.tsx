import React from 'react';
import { Pressable, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Text from './Text';
import { useTheme, spacing } from '../../theme';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary'|'ghost'|'danger';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};
export default function Button({ title, onPress, variant='primary', loading, style, textStyle, disabled }: Props) {
  const t = useTheme();
  const styles = StyleSheet.create({
    base: {
      borderRadius: 12, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg,
      alignItems: 'center', justifyContent: 'center',
      borderWidth: variant === 'ghost' ? 1 : 0, borderColor: t.border,
      backgroundColor: variant === 'primary' ? t.primary : variant === 'danger' ? t.danger : 'transparent',
      opacity: disabled ? 0.6 : 1,
    },
    title: { fontWeight: '600', color: variant === 'ghost' ? t.text : '#fff' },
  });
  return (
    <Pressable onPress={onPress} style={[styles.base, style]} disabled={disabled || loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={[styles.title, textStyle]}>{title}</Text>}
    </Pressable>
  );
}

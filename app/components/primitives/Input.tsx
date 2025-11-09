import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import Text from './Text';
import { useTheme, spacing } from '../../theme';

type Props = TextInputProps & { label?: string; error?: string; right?: React.ReactNode; };
export default function Input({ label, error, right, style, ...rest }: Props) {
  const t = useTheme();
  const styles = StyleSheet.create({
    label: { marginBottom: spacing.xs },
    container: {
      borderRadius: 12, borderWidth: 1, borderColor: error ? t.danger : t.border,
      backgroundColor: t.card, paddingHorizontal: spacing.sm, flexDirection: 'row', alignItems: 'center',
    },
    input: { flex: 1, color: t.text, paddingVertical: spacing.sm },
    right: { marginLeft: spacing.sm },
  });
  return (
    <View>
      {label ? <Text muted style={styles.label}>{label}</Text> : null}
      <View style={[styles.container, style]}>
        <TextInput placeholderTextColor={t.mutedText} style={styles.input} {...rest} />
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
      {error ? <Text style={{ color: t.danger, marginTop: spacing.xs }}>{error}</Text> : null}
    </View>
  );
}

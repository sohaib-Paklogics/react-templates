import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from '../../theme';

export default function Text(props: TextProps & { muted?: boolean }) {
  const t = useTheme();
  const color = props.muted ? t.mutedText : t.text;
  return <RNText {...props} style={[{ color }, props.style]} />;
}

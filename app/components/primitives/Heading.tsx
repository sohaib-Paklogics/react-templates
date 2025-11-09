import React from 'react';
import { Text, TextProps } from 'react-native';
import { typography, useTheme } from '../../theme';

type Level = 1|2|3;
const map: Record<Level, any> = { 1: typography.h1, 2: typography.h2, 3: typography.h3 };

export default function Heading({ children, style, level = 1, ...rest }: TextProps & { level?: Level }) {
  const t = useTheme();
  return <Text {...rest} style={[map[level], { color: t.text }, style]}>{children}</Text>;
}

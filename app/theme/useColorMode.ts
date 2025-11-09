import { useColorScheme } from 'react-native';
import { colors } from './colors';

export function useTheme(mode?: 'dark'|'light') {
  const system = useColorScheme();
  const effective = mode ?? system ?? 'dark';
  return effective === 'dark' ? colors.dark : colors.light;
}

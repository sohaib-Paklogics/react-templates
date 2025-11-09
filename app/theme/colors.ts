const dark = {
  primary: '#4F46E5',
  primaryHover: '#4338CA',
  accent: '#06B6D4',
  bg: '#0B1220',
  surface: '#0F172A',
  card: '#0F172A',
  border: '#1F2937',
  text: '#E5E7EB',
  mutedText: '#9CA3AF',
  danger: '#DC2626',
  warning: '#F59E0B',
  chart: ['#4F46E5', '#06B6D4', '#94A3B8', '#8B5CF6', '#F59E0B'],
} as const;

const light = {
  primary: '#4F46E5',
  primaryHover: '#4338CA',
  accent: '#0891B2',
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E5E7EB',
  text: '#0F172A',
  mutedText: '#6B7280',
  danger: '#DC2626',
  warning: '#F59E0B',
  chart: ['#4F46E5', '#06B6D4', '#94A3B8', '#8B5CF6', '#F59E0B'],
} as const;

export type ThemeColors = typeof dark;
export const colors = { dark, light };

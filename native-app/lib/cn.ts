import { StyleProp } from "react-native";
type ClassValue = string | undefined | null | false | 0;

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}

export function sx<T>(...styles: StyleProp<T>[]) {
  return styles;
}

import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { AppTheme, darkTheme, lightTheme } from "@/config/theme";

type ThemeContextValue = {
  theme: AppTheme;
  mode: "dark" | "light";
  setMode: (m: "dark" | "light") => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setMode] = useState<"dark" | "light">(system === "light" ? "light" : "dark");

  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

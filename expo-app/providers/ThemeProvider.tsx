import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type AppTheme = {
  isDark: boolean;
  colors: {
    bg: string;
    bgTop: string;
    surface2: string;
    card: string;
    text: string;
    muted: string;
    subtle: string;
    border: string;

    overlay: string;
    shadow: string;

    brand: string;
    onBrand: string;
    brandGlow: string;

    success: string;
    danger: string;
  };
};

const ThemeContext = createContext<{ theme: AppTheme } | null>(null);

const brand = "#E85002"; // matches your UI (can be overridden by env/theme later)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const theme = useMemo<AppTheme>(() => {
    if (isDark) {
      return {
        isDark: true,
        colors: {
          bg: "#0B0C0F",
          bgTop: "#0F1014",
          surface2: "#121318",
          card: "#121318",
          text: "#FFFFFF",
          muted: "rgba(255,255,255,0.72)",
          subtle: "rgba(255,255,255,0.50)",
          border: "rgba(255,255,255,0.10)",
          overlay: "rgba(0,0,0,0.55)",
          shadow: "rgba(0,0,0,0.45)",
          brand,
          onBrand: "#FFFFFF",
          brandGlow: "rgba(232,80,2,0.35)",
          success: "#2ECC71",
          danger: "#FF4D4D",
        },
      };
    }

    return {
      isDark: false,
      colors: {
        bg: "#FFFFFF",
        bgTop: "#F7F7F8",
        surface2: "#FFFFFF",
        card: "#F7F7F8",
        text: "#111111",
        muted: "rgba(17,17,17,0.70)",
        subtle: "rgba(17,17,17,0.45)",
        border: "rgba(17,17,17,0.12)",
        overlay: "rgba(0,0,0,0.35)",
        shadow: "rgba(0,0,0,0.15)",
        brand,
        onBrand: "#FFFFFF",
        brandGlow: "rgba(232,80,2,0.28)",
        success: "#1FAE5D",
        danger: "#E53935",
      },
    };
  }, [isDark]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const colors = {
  brand: "#E85002",
  black: "#000000",
  white: "#F9F9F9",
  gray: "#646464",
  lightGray: "#A7A7A7",
  darkGray: "#333333",

  success: "#2ECC71",
  danger: "#FF4D4D",
};

export type AppTheme = {
  mode: "dark" | "light";
  colors: {
    bg: string;
    bgTop: string; // ✅ added
    surface: string;
    surface2: string;
    border: string;

    text: string;
    muted: string;
    subtle: string;
    darkGray?: string;

    brand: string;
    brand2: string;
    onBrand: string;

    success: string;
    danger: string;

    shadow: string;
    brandGlow: string;
    overlay: string;
  };
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    bg: "#000000",
    bgTop: "#0B0B0B", // ✅ top gradient stop
    surface: "#0F0F10",
    surface2: "#151618",
    border: "#2A2A2A",

    text: colors.white,
    muted: colors.lightGray,
    subtle: colors.gray,
    darkGray: colors.darkGray,

    brand: colors.brand,
    brand2: "#C94400",
    onBrand: "#FFFFFF",
    overlay: "rgba(0,0,0,0.55)",

    success: colors.success,
    danger: colors.danger,

    shadow: "rgba(0,0,0,0.75)",
    brandGlow: "rgba(232,80,2,0.35)",
  },
};

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    bg: "#FFFFFF",
    bgTop: "#FFFFFF",
    surface: "#F6F6F6",
    surface2: "#FFFFFF",
    border: "#E5E5E5",

    text: "#0B0B0B",
    muted: "#6B6B6B",
    subtle: "#8A8A8A",

    brand: colors.brand,
    brand2: "#C94400",
    onBrand: "#FFFFFF",

    overlay: "rgba(0,0,0,0.35)",

    success: colors.success,
    danger: colors.danger,

    shadow: "rgba(0,0,0,0.75)",
    brandGlow: "rgba(232,80,2,0.35)",
  },
};

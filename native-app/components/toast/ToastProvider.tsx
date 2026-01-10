import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

type ToastType = "success" | "error" | "info";
type Toast = { id: string; title?: string; message: string; type: ToastType; duration?: number };

type ToastCtx = {
  show: (t: Omit<Toast, "id">) => void;
  hide: (id: string) => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const y = useRef(new Animated.Value(-30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const show = (t: Omit<Toast, "id">) => {
    const id = String(Date.now()) + Math.random().toString(16).slice(2);
    const toast: Toast = { id, duration: 2500, ...t };
    setToasts((prev) => [toast, ...prev].slice(0, 3));

    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start();

    setTimeout(() => hide(id), toast.duration);
  };

  const hide = (id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
    if (toasts.length <= 1) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(y, { toValue: -30, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  };

  const value = useMemo(() => ({ show, hide }), []);

  const palette = {
    success: { bg: "rgba(46,204,113,0.18)", border: "rgba(46,204,113,0.35)", text: theme.colors.text },
    error: { bg: "rgba(255,77,77,0.14)", border: "rgba(255,77,77,0.35)", text: theme.colors.text },
    info: { bg: "rgba(232,80,2,0.14)", border: "rgba(232,80,2,0.35)", text: theme.colors.text },
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Animated.View style={[styles.host, { opacity, transform: [{ translateY: y }] }]} pointerEvents="box-none">
        {toasts.map((t) => {
          const c = palette[t.type];
          return (
            <Pressable
              key={t.id}
              onPress={() => hide(t.id)}
              style={[styles.toast, { backgroundColor: c.bg, borderColor: c.border }]}
            >
              {!!t.title && (
                <AppText variant="small" weight="600" style={{ marginBottom: 2 }}>
                  {t.title}
                </AppText>
              )}
              <AppText variant="small" color={theme.colors.muted}>
                {t.message}
              </AppText>
            </Pressable>
          );
        })}
      </Animated.View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const styles = StyleSheet.create({
  host: {
    position: "absolute",
    top: 55,
    left: 14,
    right: 14,
    gap: 10,
  },
  toast: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
});

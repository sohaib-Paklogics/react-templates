import React, { useEffect, useMemo, useRef } from "react";
import { Animated, BackHandler, Modal, Pressable, StyleSheet, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/ThemeProvider";
import { tokens } from "@/config/tokens";
import { AppText } from "@/components/ui/AppText";
import { X } from "lucide-react-native";

export type QuickActionItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

export function QuickActionRadial({
  visible,
  onClose,
  actions,
  anchorBottomOffset = 78, // match your FAB position
}: {
  visible: boolean;
  onClose: () => void;
  actions: QuickActionItem[];
  anchorBottomOffset?: number;
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const hubScale = useRef(new Animated.Value(0.9)).current;

  const itemAnims = useMemo(
    () => actions.map(() => new Animated.Value(0)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actions.length],
  );

  // anchor point (center FAB position)
  const anchorX = SCREEN_W / 2;
  const anchorY = SCREEN_H - (Math.max(insets.bottom, 12) + anchorBottomOffset);

  // radial layout (arc)
  const R = 120;
  const startDeg = -160;
  const endDeg = -20;
  const count = actions.length;
  const step = count > 1 ? (endDeg - startDeg) / (count - 1) : 0;

  const closeWithAnim = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(hubScale, {
        toValue: 0.96,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  useEffect(() => {
    if (!visible) return;

    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      closeWithAnim();
      return true;
    });

    overlayOpacity.setValue(0);
    hubScale.setValue(0.9);
    itemAnims.forEach((v) => v.setValue(0));

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 170,
        useNativeDriver: true,
      }),
      Animated.spring(hubScale, {
        toValue: 1,
        damping: 16,
        stiffness: 220,
        mass: 0.9,
        useNativeDriver: true,
      }),
      Animated.stagger(
        40,
        itemAnims.map((v) =>
          Animated.spring(v, {
            toValue: 1,
            damping: 14,
            stiffness: 240,
            mass: 0.9,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();

    return () => sub.remove();
  }, [visible, overlayOpacity, hubScale, itemAnims]);

  if (!visible) return null;

  return (
    <Modal transparent statusBarTranslucent animationType="none" visible={visible} onRequestClose={closeWithAnim}>
      {/* Overlay */}
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: theme.colors.overlay,
            opacity: overlayOpacity,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={closeWithAnim} />
      </Animated.View>

      {/* Radial layer */}
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        {/* Hub circle */}
        <Animated.View
          style={[
            styles.hub,
            {
              left: anchorX - 160,
              top: anchorY - 160,
              backgroundColor: theme.colors.surface2,
              borderColor: theme.colors.border,
              transform: [{ scale: hubScale }],
              shadowColor: theme.colors.shadow,
            },
          ]}
        />

        {/* ✅ Center Close button (X) */}
        <Animated.View
          style={[
            styles.centerWrap,
            {
              left: anchorX - 32,
              top: anchorY - 32,
              transform: [{ scale: hubScale }],
            },
          ]}
        >
          <Pressable
            onPress={closeWithAnim}
            style={[
              styles.centerBtn,
              {
                backgroundColor: theme.colors.brand,
                borderColor: theme.colors.bg,
                shadowColor: theme.colors.brandGlow,
              },
            ]}
          >
            <X size={22} color={theme.colors.onBrand} />
          </Pressable>
        </Animated.View>

        {/* Action items */}
        {actions.map((a, i) => {
          const deg = startDeg + step * i;
          const rad = (deg * Math.PI) / 180;

          const x = Math.cos(rad) * R;
          const y = Math.sin(rad) * R;

          const t = itemAnims[i];
          const tx = t.interpolate({ inputRange: [0, 1], outputRange: [0, x] });
          const ty = t.interpolate({ inputRange: [0, 1], outputRange: [0, y] });
          const sc = t.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] });

          return (
            <Animated.View
              key={a.key}
              style={[
                styles.itemWrap,
                {
                  left: anchorX - 28,
                  top: anchorY - 28,
                  transform: [{ translateX: tx }, { translateY: ty }, { scale: sc }],
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  closeWithAnim();
                  setTimeout(() => a.onPress(), 120);
                }}
                style={[
                  styles.itemBtn,
                  {
                    backgroundColor: theme.colors.surface2,
                    borderColor: theme.colors.border,
                    shadowColor: theme.colors.shadow,
                  },
                ]}
              >
                {a.icon}
              </Pressable>

              <View style={styles.labelWrap}>
                <AppText variant="caption" color={theme.colors.text} style={{ textAlign: "center" }}>
                  {a.label}
                </AppText>
              </View>
            </Animated.View>
          );
        })}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  hub: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 999,
    borderWidth: 1,
    opacity: 0.95,
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 16,
  },

  centerWrap: {
    position: "absolute",
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },

  centerBtn: {
    width: 64,
    height: 64,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },

  itemWrap: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  itemBtn: {
    width: 56,
    height: 56,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  labelWrap: {
    marginTop: tokens.spacing.sm,
    width: 84,
  },
});

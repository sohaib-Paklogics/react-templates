import React from "react";
import { Pressable, View } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/ThemeProvider";
import { tabBarStyles as s } from "@/styles/tabBarStyles";
import {
  BarChart3,
  CreditCard,
  Home,
  Plus,
  User,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
} from "lucide-react-native";
import { QuickActionRadial, QuickActionItem } from "@/components/overlays/QuickActionRadial";

type TabKey = "index" | "analytics" | "cards/index" | "profile";

function iconFor(name: TabKey, color: string) {
  const size = 22;
  switch (name) {
    case "index":
      return <Home size={size} color={color} />;
    case "analytics":
      return <BarChart3 size={size} color={color} />;
    case "cards/index":
      return <CreditCard size={size} color={color} />;
    case "profile":
      return <User size={size} color={color} />;
  }
}

function normalizeRouteToTab(routeName: string): TabKey {
  if (routeName === "index") return "index";
  if (routeName.startsWith("analytics")) return "analytics";
  if (routeName.startsWith("cards")) return "cards/index"; // ✅ cards/*
  if (routeName.startsWith("profile")) return "profile";
  return "index";
}

function shouldHideTabBar(routeName: string) {
  // ✅ match figma: hide tab bar on add-bank screen
  return routeName === "cards/add-bank";
}

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const rawRoute = state.routes[state.index]?.name ?? "index";
  const activeTab = normalizeRouteToTab(rawRoute);

  if (shouldHideTabBar(rawRoute)) return null;

  const [quickOpen, setQuickOpen] = React.useState(false);

  const go = (name: TabKey) => navigation.navigate(name as never);

  const actions: QuickActionItem[] = [
    {
      key: "add-expense",
      label: "Expense",
      icon: <ArrowUpRight size={22} color={theme.colors.brand} />,
      onPress: () => {
        setQuickOpen(false);
        router.push("/transaction/add-expense");
      },
    },
    {
      key: "add-income",
      label: "Income",
      icon: <ArrowDownLeft size={22} color={theme.colors.brand} />,
      onPress: () => {
        setQuickOpen(false);
        router.push("/transaction/add-income");
      },
    },
    {
      key: "transfer",
      label: "Transfer",
      icon: <ArrowRightLeft size={22} color={theme.colors.brand} />,
      onPress: () => {
        setQuickOpen(false);
        router.push("/transaction/add-transfer");
      },
    },
  ];

  return (
    <View style={[s.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View
        style={[
          s.pill,
          {
            backgroundColor: theme.colors.surface2,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.35,
            shadowRadius: 18,
            elevation: 14,
          },
        ]}
      >
        <Pressable onPress={() => go("index")} style={s.tabBtn}>
          {iconFor("index", activeTab === "index" ? theme.colors.brand : theme.colors.subtle)}
          <View style={[s.dot, { opacity: activeTab === "index" ? 1 : 0, backgroundColor: theme.colors.brand }]} />
        </Pressable>

        <Pressable onPress={() => go("analytics")} style={s.tabBtn}>
          {iconFor("analytics", activeTab === "analytics" ? theme.colors.brand : theme.colors.subtle)}
          <View style={[s.dot, { opacity: activeTab === "analytics" ? 1 : 0, backgroundColor: theme.colors.brand }]} />
        </Pressable>

        <View style={s.centerSpacer} />

        <Pressable onPress={() => go("cards/index")} style={s.tabBtn}>
          {iconFor("cards/index", activeTab === "cards/index" ? theme.colors.brand : theme.colors.subtle)}
          <View
            style={[s.dot, { opacity: activeTab === "cards/index" ? 1 : 0, backgroundColor: theme.colors.brand }]}
          />
        </Pressable>

        <Pressable onPress={() => go("profile")} style={s.tabBtn}>
          {iconFor("profile", activeTab === "profile" ? theme.colors.brand : theme.colors.subtle)}
          <View style={[s.dot, { opacity: activeTab === "profile" ? 1 : 0, backgroundColor: theme.colors.brand }]} />
        </Pressable>

        {/* Center add button */}
        <Pressable
          onPress={() => setQuickOpen(true)}
          style={[
            s.fab,
            {
              backgroundColor: theme.colors.brand,
              borderColor: theme.colors.bg,
              shadowColor: theme.colors.brandGlow,
            },
          ]}
        >
          <Plus color={theme.colors.onBrand} size={28} />
        </Pressable>
      </View>

      <QuickActionRadial
        visible={quickOpen}
        onClose={() => setQuickOpen(false)}
        actions={actions}
        anchorBottomOffset={78}
      />
    </View>
  );
}

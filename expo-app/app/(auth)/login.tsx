import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { AppText } from "@/components/ui/AppText";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "@/providers/toast";

export default function LoginScreen() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email.trim() || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await authService.login({ email: email.trim(), password });
      await setToken(res.accessToken);
      router.replace("/(tabs)");
    } catch (e: any) {
      // apiClient already toasts globally; keep this quiet unless you want extra UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <Screen scroll contentStyle={{ gap: 16 }}>
        <View style={{ marginTop: 24 }}>
          <AppText variant="h1" weight="700">
            Welcome back
          </AppText>
          <AppText variant="body" style={{ marginTop: 8 }}>
            Sign in to continue
          </AppText>
        </View>

        <TextField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextField label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secure />

        <Button title="Sign in" onPress={onLogin} loading={loading} />
      </Screen>
    </KeyboardAvoidingView>
  );
}

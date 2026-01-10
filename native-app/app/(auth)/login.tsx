import { Screen } from "@/components/layout/Screen";
import { AppText, Button, Divider, TextField } from "@/components/ui";
import { useTheme } from "@/providers/ThemeProvider";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen style={{ paddingTop: 40 }}>
      <View style={{ gap: 18 }}>
        <TextField label="Email" value={email} onChangeText={setEmail} placeholder="youremail@gmail.com" />
        <TextField label="Password" value={password} onChangeText={setPassword} placeholder="********" secure />

        <Pressable style={{ alignSelf: "flex-end" }}>
          <AppText variant="small" weight="500" color={theme.colors.brand}>
            Forgot Password ?
          </AppText>
        </Pressable>

        <Button title="Log In" variant="primary" onPress={() => {}} />

        <View style={styles.signupRow}>
          <AppText variant="small" color={theme.colors.muted}>
            Don&apos;t have an account?
          </AppText>
          <Pressable>
            <AppText variant="small" weight="600" color={theme.colors.brand}>
              {"  "}Sign Up
            </AppText>
          </Pressable>
        </View>

        <Divider label="Or login with" />

        <Button title="Google" variant="secondary" onPress={() => {}} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  signupRow: { flexDirection: "row", justifyContent: "center", marginTop: 6 },
});

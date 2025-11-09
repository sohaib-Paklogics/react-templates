import React from 'react';
import { View } from 'react-native';
import { spacing, useTheme } from '../../theme';
import Heading from '../../components/primitives/Heading';
import Text from '../../components/primitives/Text';
import Input from '../../components/primitives/Input';
import Button from '../../components/primitives/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginInput } from '../../constants/schemas';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'expo-router';

export default function Login() {
  const t = useTheme();
  const { login, loading } = useAuth();
  const { register, setValue, handleSubmit, formState:{ errors } } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });

  React.useEffect(()=>{ register('email'); register('password'); }, [register]);
  async function onSubmit(values: LoginInput) { await login(values); }

  return (
    <View style={{ flex:1, backgroundColor: t.bg, padding: spacing.lg, gap: spacing.md, justifyContent:'center' }}>
      <Heading level={1}>Welcome to Xpensa</Heading>
      <Text muted>Sign in to continue</Text>
      <Input label="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(v)=>setValue('email', v, { shouldValidate:true })} error={errors.email?.message}/>
      <Input label="Password" secureTextEntry onChangeText={(v)=>setValue('password', v, { shouldValidate:true })} error={errors.password?.message}/>
      <Button title="Sign In" onPress={handleSubmit(onSubmit)} loading={loading}/>
      <Link href="/(auth)/signup" asChild><Button title="Create Account" variant="ghost" /></Link>
    </View>
  );
}

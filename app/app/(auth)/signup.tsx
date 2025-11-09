import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import Button from '../../components/primitives/Button';
import Heading from '../../components/primitives/Heading';
import Input from '../../components/primitives/Input';
import { SignupInput, SignupSchema } from '../../constants/schemas';
import { useAuth } from '../../hooks/useAuth';
import { spacing, useTheme } from '../../theme';

export default function Signup() {
  const t = useTheme();
  const router = useRouter();
  const { signup, loading } = useAuth();
  const { register, setValue, handleSubmit, formState:{ errors } } = useForm<SignupInput>({ resolver: zodResolver(SignupSchema) });

  React.useEffect(()=>{ register('username'); register('email'); register('password'); }, [register]);
  async function onSubmit(values: SignupInput) {
    await signup(values);
    Alert.alert('Account created', 'Please login now.');
    router.replace('/(auth)/login');
  }

  return (
    <View style={{ flex:1, backgroundColor: t.bg, padding: spacing.lg, gap: spacing.md, justifyContent:'center' }}>
      <Heading level={1}>Create account</Heading>
      <Input label="Username" onChangeText={(v)=>setValue('username', v, { shouldValidate:true })} error={errors.username?.message}/>
      <Input label="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(v)=>setValue('email', v, { shouldValidate:true })} error={errors.email?.message}/>
      <Input label="Password" secureTextEntry onChangeText={(v)=>setValue('password', v, { shouldValidate:true })} error={errors.password?.message}/>
      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} loading={loading}/>
    </View>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import Button from '../components/primitives/Button';
import Heading from '../components/primitives/Heading';
import Input from '../components/primitives/Input';
import { api } from '../config/api';
import { TransactionCreateSchema } from '../constants/schemas';
import { spacing, useTheme } from '../theme';

export default function AddTransactionModal() {
  const t = useTheme();
  const router = useRouter();
  const { register, setValue, handleSubmit, formState:{ errors } } = useForm({
    resolver: zodResolver(TransactionCreateSchema),
    defaultValues: { type: 'expense' as const },
  });

  React.useEffect(() => { register('amount'); register('type'); register('accountId'); register('categoryId'); register('notes'); }, [register]);

  async function onSubmit(values: any) {
    const payload: any = {
      date: new Date().toISOString(),
      type: values.type,
      amount: Number(values.amount),
      accountId: values.accountId,
      categoryId: values.categoryId,
      notes: values.notes,
    };
    await api.post('/transactions', payload);
    router.back();
  }

  return (
    <View style={{ flex:1, backgroundColor: t.bg, padding: spacing.lg, gap: spacing.md }}>
      <Heading level={2}>Add Transaction</Heading>
      <Input label="Type (expense/income/transfer)" defaultValue="expense" onChangeText={(v)=>setValue('type', v as any, { shouldValidate:true })}/>
      <Input label="Amount (PKR)" keyboardType="numeric" onChangeText={(v)=>setValue('amount', v, { shouldValidate:true })} error={errors.amount?.message as string}/>
      <Input label="Account ID" onChangeText={(v)=>setValue('accountId', v)} />
      <Input label="Category ID" onChangeText={(v)=>setValue('categoryId', v)} />
      <Input label="Notes" onChangeText={(v)=>setValue('notes', v)} />
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
      <Button title="Cancel" variant="ghost" onPress={()=>router.back()} />
    </View>
  );
}

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { queryClient } from "./queryClient";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toast />
    </QueryClientProvider>
  );
}

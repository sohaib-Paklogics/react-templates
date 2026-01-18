import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./queryClient";
import { router } from "@/app/router/routes";
import { ThemeProvider } from "@/components/theme-provider";
import { SonnerToaster } from "@/components/ui/sonner";

export default function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <RouterProvider router={router} />
        <SonnerToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

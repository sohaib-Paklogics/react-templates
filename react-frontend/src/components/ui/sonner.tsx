import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster
      richColors
      closeButton
      position="top-right"
      toastOptions={{ duration: 3500 }}
    />
  );
}

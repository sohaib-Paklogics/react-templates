export type ToastType = "success" | "error" | "info";

export type ToastImpl = {
  show: (args: { type: ToastType; message: string; title?: string }) => void;
};

let impl: ToastImpl | null = null;

export function registerToast(next: ToastImpl) {
  impl = next;
}

function fallback(type: ToastType, titleOrMessage: string, message?: string) {
  // eslint-disable-next-line no-console
  console.warn(`[toast:${type}]`, titleOrMessage, message ?? "");
}

export const toast = {
  success(titleOrMessage: string, message?: string) {
    if (!impl) return fallback("success", titleOrMessage, message);
    impl.show({ type: "success", title: message ? titleOrMessage : undefined, message: message ?? titleOrMessage });
  },
  error(titleOrMessage: string, message?: string) {
    if (!impl) return fallback("error", titleOrMessage, message);
    impl.show({ type: "error", title: message ? titleOrMessage : undefined, message: message ?? titleOrMessage });
  },
  info(titleOrMessage: string, message?: string) {
    if (!impl) return fallback("info", titleOrMessage, message);
    impl.show({ type: "info", title: message ? titleOrMessage : undefined, message: message ?? titleOrMessage });
  },
};

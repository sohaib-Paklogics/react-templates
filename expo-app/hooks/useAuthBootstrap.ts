import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export function useAuthBootstrap() {
  const booted = useAuthStore((s) => s.booted);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    if (!booted) {
      hydrate();
    }
  }, [booted, hydrate]);

  return booted;
}

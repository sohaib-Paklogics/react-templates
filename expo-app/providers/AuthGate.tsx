import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthBootstrap } from "../hooks/useAuthBootstrap";
import { useAuthStore } from "../store/auth.store";
import { useMeQuery } from "../queries/auth/useMeQuery";

// This is the RN equivalent of ProtectedLayout.
// It keeps navigation decisions OUT of axios interceptors.
export function AuthGate({ children }: PropsWithChildren) {
  const router = useRouter();

  const booted = useAuthBootstrap();
  const token = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);

  const { data: me, isLoading, isError } = useMeQuery();

  useEffect(() => {
    if (me) setUser(me);
  }, [me, setUser]);

  useEffect(() => {
    if (!booted) return;

    if (!token) {
      router.replace("/(auth)/login");
      return;
    }

    if (isError) {
      // 401 triggers logout; fallback for other errors.
      router.replace("/(auth)/login");
    }
  }, [booted, token, isError, router]);

  // While bootstrapping or validating /me, keep the current route but show children.
  // In most apps you'd show a loader screen here.
  if (!booted) return null;
  if (token && isLoading) return null;

  return <>{children}</>;
}

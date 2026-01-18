import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useMeQuery } from "@/queries/auth/useMeQuery";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/shared/constants/routes";
import { PageLoader } from "@/components/common/PageLoader";

export default function ProtectedLayout() {
  const token = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const location = useLocation();

  const { data: me, isLoading, isError } = useMeQuery();

  if (!token) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  if (isLoading) return <PageLoader />;
  if (isError) return <Navigate to={ROUTES.LOGIN} replace />;

  if (me) setUser(me);
  return <Outlet />;
}

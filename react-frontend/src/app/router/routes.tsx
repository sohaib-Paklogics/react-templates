import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

import PublicLayout from "@/layouts/PublicLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
  },
  {
    path: ROUTES.ROOT,
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

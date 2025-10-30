import { RouteObject, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";

import NotFoundPage from "../components/common/NotFoundPage";
import ClientsPage from "@/pages/clients/page";
import SingleClientPage from "@/pages/clients/ViewClient";
import ApiClientsPage from "@/pages/api-clients/page";
import NewAdminUserPage from "@/pages/admin-users/AddNewAdmin";
import AdminUsersPage from "@/pages/admin-users/page";
import ProfilePage from "@/pages/profile/page";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PATH } from "@/constants/path";
import LoginPage from "@/pages/auth/Login";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import ProtectedRoute from "./ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/", // Redirect root to /dashboard
    element: <Navigate to={PATH.DASHBOARD} replace />,
  },
  // {
  //   element: <ProtectedLayout />,
  //   children: [
  //     {
  //       element: <ProtectedRoute userTypes={["admin", "superadmin"]} />,
  //       children: [
  //         {
  //           element: <DashboardLayout />,
  //           children: [
  //             {
  //               path: PATH.DASHBOARD,
  //               element: <Dashboard />,
  //             },
  //             {
  //               path: PATH.CLIENT,
  //               element: <ClientsPage />,
  //             },
  //             {
  //               path: PATH.VIEWCLIENT,
  //               element: <SingleClientPage />,
  //             },
  //             {
  //               path: PATH.APICLIENT,
  //               element: <ApiClientsPage />,
  //             },

  //             {
  //               path: PATH.ADMINUSER,
  //               element: <AdminUsersPage />,
  //             },
  //             {
  //               path: PATH.NEWADMINUSER,
  //               element: <NewAdminUserPage />,
  //             },
  //             {
  //               path: PATH.PROFILE,
  //               element: <ProfilePage />,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: PATH.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PATH.CLIENT,
        element: <ClientsPage />,
      },
      {
        path: PATH.VIEWCLIENT,
        element: <SingleClientPage />,
      },
      {
        path: PATH.APICLIENT,
        element: <ApiClientsPage />,
      },

      {
        path: PATH.ADMINUSER,
        element: <AdminUsersPage />,
      },
      {
        path: PATH.NEWADMINUSER,
        element: <NewAdminUserPage />,
      },
      {
        path: PATH.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

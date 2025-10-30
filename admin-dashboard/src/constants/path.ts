// src/constants/path.ts

export const PATH = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  CLIENT: "/dashboard/clients",
  VIEWCLIENT: "/dashboard/clients/:id",
  APICLIENT: "/dashboard/api-clients",
  ADMINUSER: "/dashboard/admin-users",
  NEWADMINUSER: "/dashboard/admin-users/new",
  PROFILE: "/dashboard/profile",
  SETTING: "/dashboard/setting",

  // Add more paths here...
} as const;

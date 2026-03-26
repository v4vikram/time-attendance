// src/app/router/routes.ts

import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import EmployeePage from "@/modules/employees/pages/EmployeePage";
import { LoginPage } from "@/modules/auth/pages/LoginPage";

export const routes = [
  {
    path: "/",
    element: <LoginPage />,
    roles: ["admin", "employee"],
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    roles: ["admin", "employee"],
  },
  {
    path: "/employees",
    element: <EmployeePage />,
    roles: ["admin"],
  },
];
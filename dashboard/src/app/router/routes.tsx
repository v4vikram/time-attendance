// src/app/router/routes.ts

import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import EmployeePage from "@/modules/employees/pages/EmployeePage";

export const routes = [
  {
    path: "/",
    element: <DashboardPage />,
    roles: ["admin", "employee"],
  },
  {
    path: "/employees",
    element: <EmployeePage />,
    roles: ["admin"],
  },
];
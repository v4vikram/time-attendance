
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import EmployeePage from "@/modules/employees/pages/EmployeePage";
import type { AppRoute } from "@/shared/types";
import { LayoutDashboard, Users, Settings, List } from "lucide-react";



export const routes: AppRoute[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    element: <DashboardPage />,
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "employee"],
  },
  {
    id: "employees",
    path: "/employees",
    element: <EmployeePage />,
    label: "Employees",
    icon: Users,
    roles: ["admin"],
    children: [
      {
        id: "employees-list",
        path: "/employees",
        element: <h1>Profile Page</h1>,
        label: "Emnployee List",
        icon: List,
        roles: ["admin", "employee"],
      },
      {
        id: "security",
        path: "/settings/security",
        element: <h1>securty page</h1>,
        label: "Security",
        roles: ["admin"],
      },
    ],
  },
  {
    id: "settings",
    path: "/settings",
    label: "Settings",
    icon: Settings,
    roles: ["admin"],
    children: [
      {
        id: "profile",
        path: "/settings/profile",
        element: <h1>Profile Page</h1>,
        label: "Profile",
        roles: ["admin", "employee"],
      },
      {
        id: "security",
        path: "/settings/security",
        element: <h1>securty page</h1>,
        label: "Security",
        roles: ["admin"],
      },
    ],
  },
];
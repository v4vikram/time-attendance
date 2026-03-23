// src/app/router/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { ProtectedRoute } from "./ProtectedRoute";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { LoginPage } from "@/modules/auth/pages/LoginPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}

        </Route>
      </Route>
    </Routes>
  );
};
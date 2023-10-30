import { lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { appRoute } from "../../constants";
import { AuthPage } from "../../pages/identity/AuthPage/AuthPage.tsx";
import { NotFoundPage } from "../../pages/common/NotFoundPage";
import { Loading } from "../../components/Loading";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { DashboardLayout } from "../../layouts";

const DashboardRouteLazy: LazyExoticComponent<() => JSX.Element> = lazy(
  async () => {
    const module: typeof import("../DashboardRoute") = await import(
      "../DashboardRoute"
    );

    return { default: module.DashboardRoute };
  },
);

/**
 * Application root routes
 * @returns {JSX.Element} Component
 */
export function AppRoute(): JSX.Element {
  return (
    <Routes>
      <Route path="" element={<Navigate to={appRoute.LOGIN} />} />
      <Route path={appRoute.LOGIN} element={<AuthPage />} />

      <Route
        path={`/*`}
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <DashboardRouteLazy />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

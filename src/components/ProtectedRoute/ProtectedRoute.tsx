import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../features/identity/identity.slice";
import { appRoute } from "../../constants";

/**
 * Component with protection
 * @param {PropsWithChildren} props Component properties
 * @returns {JSX.Element} Protected component
 */
export function ProtectedRoute({ children }: PropsWithChildren): JSX.Element {
  const isAuthenticated: boolean = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={appRoute.LOGIN} replace />;
  }

  return <>{children}</>;
}

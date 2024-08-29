import { useUserRole } from "@hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export function RequireAdmin({ children }: Props) {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return <span>loading...</span>;
  }

  if (role === "admin") {
    return children;
  } else {
    return <Navigate to="/access-denied"></Navigate>;
  }
}

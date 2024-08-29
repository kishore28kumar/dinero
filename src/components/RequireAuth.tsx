import { useApproved } from "@hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

type Props = {
  children: ReactNode;
};

export function RequireAuth({ children }: Props) {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { approved, isLoading } = useApproved();

  if (status === "loading" || isLoading) {
    return <span>loading...</span>;
  }

  if (signInCheckResult.signedIn === true) {
    if (approved) {
      return children;
    } else if (!approved) {
      return <Navigate to="/sign-in/approval"></Navigate>;
    }
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

import { useApproved } from "@hooks";
import { UserNotApprovedPage } from "@pages";
import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export function RequireAuth({ children }) {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { approved, isLoading } = useApproved();

  if (status === "loading" || isLoading) {
    return <span>loading...</span>;
  }

  if (signInCheckResult.signedIn === true) {
    if (approved) {
      return children;
    } else if (!approved) {
      return <UserNotApprovedPage />;
    }
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

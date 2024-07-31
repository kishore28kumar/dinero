import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export function RequireAuth({ children }) {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <span>loading...</span>;
  }

  if (signInCheckResult.signedIn === true) {
    return children;
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

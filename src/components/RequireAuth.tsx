import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import { IdTokenResult } from "firebase/auth";

export function RequireAuth({ children }) {
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { status, data: signInCheckResult } = useSigninCheck();
  
  useEffect(() => {
    if (status === "success") {
      signInCheckResult.user
        ?.getIdTokenResult(true)
        .then((token: IdTokenResult) => {
          console.log("token", token);
          console.log("hereeee")
          console.log(token.claims)
          setRole(token.claims.role as string);
          setIsLoading(false);
        });
    }
  }, [status]);

  if (status === "loading") {
    return <span>loading...</span>;
  }

  if (signInCheckResult.signedIn === true) {
    return children;
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

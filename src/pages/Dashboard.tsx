import { useSigninCheck } from "reactfire";
import { Navigate } from "react-router-dom";

export function Dashboard() {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <span>loading...</span>;
  }

  if (signInCheckResult.signedIn === true) {
    return (
      <>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Welcome Back, {signInCheckResult.user.displayName}!
            </h1>
          </div>
        </main>
      </>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

import { useFunctions, useSigninCheck } from "reactfire";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { httpsCallable } from "firebase/functions";
import { toast } from "sonner";

export function Dashboard() {
  const { status, data: signInCheckResult } = useSigninCheck();
  const functions = useFunctions();

  if (status === "loading") {
    return <span>loading...</span>;
  }

  function callTest(): void {
    httpsCallable(functions, "test")();
  }

  if (signInCheckResult.signedIn === true) {
    return (
      <>
        <div className="flex align-middle p-4">
          <h1 className="text-lg font-semibold md:text-2xl">
            Welcome Back, {signInCheckResult.user.displayName}!
          </h1>
          <Button className="ml-5" onClick={() => callTest()}>
            Button
          </Button>
        </div>
        <main className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"></div> */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </main>
      </>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

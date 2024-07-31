import { useSigninCheck } from "reactfire";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IdTokenResult } from "firebase/auth";
import { useEffect, useState } from "react";

export function Profile() {
  const { status, data: signInCheckResult } = useSigninCheck();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    if (status === "success") {
      signInCheckResult.user
        ?.getIdTokenResult(true)
        .then((token: IdTokenResult) => {
          console.log("token", token);
          setRole(token.claims.role as string);
          setIsLoading(false);
        });
    }
  }, [status]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!isLoading) {
    console.log("signInCheckResult", signInCheckResult.user);

    return (
      <>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Display Name"
                        value={signInCheckResult.user!.displayName}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Email"
                        value={signInCheckResult.user!.email}
                        disabled
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label
                        htmlFor="emailVerified"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email Verified
                      </label>
                      <Checkbox
                        id="emailVerified"
                        checked={signInCheckResult.user!.emailVerified}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        placeholder="Role"
                        value={role}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="creationTime">Creation Time</Label>
                      <Input
                        id="creationTime"
                        placeholder="Creation Time"
                        value={signInCheckResult.user!.metadata.creationTime}
                        disabled
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {/* <Button variant="outline">Cancel</Button> */}
                {/* <Button>Deploy</Button> */}
              </CardFooter>
            </Card>
          </div>
        </main>
      </>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

import { RequireAdmin } from "@/components/RequireAdmin";
import { DataTable } from "@/components/DataTable";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { useFunctions } from "reactfire";
import { toast } from "sonner";
import { User } from "@models/User.model";
import { UserColumns } from "@pages/Users/UserColumns";

type UsersResponse = {
  data: User[];
  nextPageToken: string;
};

export function UsersPage() {
  const [users, setUsers] = useState([] as User[]);
  const [isLoading, setIsLoading] = useState(true);

  const functions = useFunctions();
  useEffect(() => {
    const getAllUsers = httpsCallable(functions, "getAllUsers");
    getAllUsers({ nextPageToken: undefined })
      .then((result) => {
        setUsers((result.data as UsersResponse).data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }, [functions]);

  return (
    <RequireAdmin>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <h1 className="text-5xl">Users</h1>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <DataTable columns={UserColumns} data={users} />
        )}
      </main>
    </RequireAdmin>
  );
}

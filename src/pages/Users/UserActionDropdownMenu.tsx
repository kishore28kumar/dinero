import { User } from "@models/User.model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { useFunctions } from "reactfire";
import { toast } from "sonner";

type Props = {
  user: User;
};

type ApproveUserResponse = {
  message: string;
};

export function UserActionDropdownMenu({ user }: Props) {
  const functions = useFunctions();
  const approveUser = httpsCallable(functions, "approveUser");
  function onApprove(user: User) {
    approveUser({ uid: user.uid })
      .then((result) => {
        toast.info(`${(result.data as ApproveUserResponse).message}`);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onApprove(user)}>
          Approve
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

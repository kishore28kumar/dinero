import { Link, useNavigate } from "react-router-dom";
import { useFirebaseApp, useFirestore, useUser } from "reactfire";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileSideNav } from "./MobileSideNav";
import { clearIndexedDbPersistence, terminate } from "firebase/firestore";
import { useOnlineStatus } from "@hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppTopBar() {
  let navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const authInstance = getAuth(useFirebaseApp());
  const db = useFirestore();
  const { data: user, status } = useUser();

  async function onLogout() {
    // FIXME: On logout and login, firestore stays terminated
    // await terminate(db);
    // clearIndexedDbPersistence(db).then(() => {
    signOut(authInstance).then(() => {
      navigate("/");
    });
    // });
  }

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSideNav />
      <div className="w-full flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <span className="sr-only">Toggle user menu</span>
            <div className="relative">
              <Avatar>
                <AvatarImage alt={user?.displayName!} />
                <AvatarFallback>
                  {" "}
                  {user
                    ?.displayName!.split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isOnline ? (
                <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              ) : (
                <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-col">
            <span>My Account</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-xs">Last Sign In Time:</span>
            <span className="text-xs">{user?.metadata.lastSignInTime}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

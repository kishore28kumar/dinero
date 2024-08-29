import { Outlet } from "react-router-dom";
import { Bell, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppTopBar } from "./AppTopBar";
import { SideNav } from "./SideNav";
import { RequireAuth } from "../components/RequireAuth";
import { Badge } from "@/components/ui/badge";

export function UserHome() {
  return (
    <RequireAuth>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <div className="flex items-center gap-2 font-semibold">
                <IndianRupee className="h-6 w-6" />
                <span className="text-3xl">Dinero</span>
                <Badge className="text-xs">v1.0-beta</Badge>
              </div>
              {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button> */}
            </div>
            <div className="flex-1">
              <SideNav />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <AppTopBar />
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  );
}

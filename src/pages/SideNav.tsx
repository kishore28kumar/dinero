import { useUserRole } from "@hooks";
import {
  Home,
  Coins,
  WalletCards,
  Sparkles,
  Users,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export function SideNav() {
  const { role, isLoading } = useUserRole();
  // FIXME: Protect the routes of the Admin Pages
  const menuItems = [
    {
      path: "/user-home/dashboard",
      label: "Dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      path: "/user-home/transactions",
      label: "Transactions",
      icon: <Coins className="h-4 w-4" />,
    },
    {
      path: "/user-home/payment-instruments",
      label: "Payment Instruments",
      icon: <WalletCards className="h-4 w-4" />,
    },
    {
      path: "/user-home/categories",
      label: "Categories",
      icon: <Sparkles className="h-4 w-4" />,
      role: "admin",
    },
    {
      path: "/user-home/users",
      label: "Users",
      icon: <Users className="h-4 w-4" />,
      role: "admin",
    },
    {
      path: "/user-home/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {menuItems.map((menuItem) => {
        if (menuItem.role == undefined || menuItem.role == role)
          return (
            <NavLink
              to={menuItem.path}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              key={menuItem.label}
            >
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                {menuItem.icon}
                {menuItem.label}
              </div>
            </NavLink>
          );
      })}
    </nav>
  );
}

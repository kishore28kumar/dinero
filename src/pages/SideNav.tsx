import { Home, Coins, WalletCards } from "lucide-react";
import { NavLink } from "react-router-dom";

export function SideNav() {
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
  ];

  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {menuItems.map((menuItem) => (
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
        ))}
      </nav>
    </>
  );
}

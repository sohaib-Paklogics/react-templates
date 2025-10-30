import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  UserCog,
  ShoppingCart,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: BarChart3 },
  { title: "Clients", href: "/dashboard/clients", icon: Users },
  { title: "Admin Users", href: "/admin-users", icon: UserCog },
  { title: "API Clients", href: "/api-clients", icon: ShoppingCart },
];

const accountItems: NavItem[] = [
  { title: "Profile", href: "/profile", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6" />
            <span>Admin Dashboard</span>
          </Link>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setOpen(false)}
            >
              X
            </Button>
          )}
        </div>

        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}

          <div className="pt-4">
            <div className="px-3 text-xs font-semibold text-muted-foreground">
              Account
            </div>

            {accountItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

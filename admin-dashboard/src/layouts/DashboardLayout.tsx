import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Topbar goes first */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { AdminUserForm } from "@/components/admin-user-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewAdminUserPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/dashboard/admin-users">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add New Admin User
          </h1>
          <p className="text-muted-foreground">
            Create a new administrator account with appropriate permissions.
          </p>
        </div>
      </div>

      <AdminUserForm />
    </div>
  );
}

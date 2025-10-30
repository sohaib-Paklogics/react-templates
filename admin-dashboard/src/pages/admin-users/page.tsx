import { AdminUsersTable } from "@/components/admin-users-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Users</h1>
          <p className="text-muted-foreground">
            Manage admin users and their permissions.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/admin-users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Admin User
          </Link>
        </Button>
      </div>

      <AdminUsersTable />
    </div>
  );
}


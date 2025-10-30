import { ApiClientsTable } from "@/components/api-clients-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ApiClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Clients</h1>
          <p className="text-muted-foreground">
            Manage clients who have purchased API access.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/api-clients/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add API Client
          </Link>
        </Button>
      </div>

      <ApiClientsTable />
    </div>
  );
}

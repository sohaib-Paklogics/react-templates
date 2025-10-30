import { Suspense } from "react";
import { ClientsTable } from "@/components/clients-table";
import { ClientsTableSkeleton } from "@/components/clients-table-skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your clients and their information.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/clients/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ClientsTableSkeleton />}>
        <ClientsTable />
      </Suspense>
    </div>
  );
}

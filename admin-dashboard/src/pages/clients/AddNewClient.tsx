import { ClientForm } from "@/components/client-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewClientPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Client</h1>
          <p className="text-muted-foreground">
            Create a new client record in the system.
          </p>
        </div>
      </div>

      <ClientForm />
    </div>
  );
}

import { ClientForm } from "@/components/client-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// In a real app, you would fetch the client data based on the ID
const getClientById = (id: string) => {
  return {
    id,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    joinedDate: "2023-04-23",
    address: "123 Main St, Anytown, USA",
    notes: "VIP client with multiple accounts",
  };
};

export default function SingleClientPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard/clients">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
            <p className="text-muted-foreground">Client ID not provided.</p>
          </div>
        </div>
      </div>
    );
  }

  const client = getClientById(id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
          <p className="text-muted-foreground">
            Update client information for {client.name}.
          </p>
        </div>
      </div>

      <ClientForm defaultValues={client} />
    </div>
  );
}

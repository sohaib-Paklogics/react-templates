import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentClients = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "active",
    date: "Apr 23, 2023",
    amount: "$1,999.00",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "pending",
    date: "Apr 24, 2023",
    amount: "$39.00",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "active",
    date: "Apr 25, 2023",
    amount: "$299.00",
  },
  {
    id: "4",
    name: "William Kim",
    email: "will.kim@email.com",
    status: "inactive",
    date: "Apr 25, 2023",
    amount: "$99.00",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    status: "active",
    date: "Apr 26, 2023",
    amount: "$599.00",
  },
]

export function RecentClients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Clients</CardTitle>
        <CardDescription>Recently added clients and their status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentClients.map((client) => (
            <div key={client.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?${client.id}`} alt={client.name} />
                <AvatarFallback>
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.email}</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <Badge
                  variant={
                    client.status === "active" ? "default" : client.status === "pending" ? "outline" : "secondary"
                  }
                  className={client.status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                >
                  {client.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{client.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


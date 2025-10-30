import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ArrowUpDown,
  Pencil,
  Trash2,
  Key,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample data - in a real app, this would come from an API
const data = [
  {
    id: "1",
    name: "Acme Corporation",
    plan: "enterprise",
    apiKey: "sk_acme_123456789",
    status: "active",
    requestsThisMonth: 15420,
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Globex Inc",
    plan: "pro",
    apiKey: "sk_globex_987654321",
    status: "active",
    requestsThisMonth: 8750,
    createdAt: "2023-02-20T14:45:00Z",
  },
  {
    id: "3",
    name: "Initech LLC",
    plan: "basic",
    apiKey: "sk_initech_456789123",
    status: "inactive",
    requestsThisMonth: 0,
    createdAt: "2023-03-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Umbrella Corp",
    plan: "enterprise",
    apiKey: "sk_umbrella_789123456",
    status: "active",
    requestsThisMonth: 22340,
    createdAt: "2023-01-05T16:20:00Z",
  },
  {
    id: "5",
    name: "Stark Industries",
    plan: "pro",
    apiKey: "sk_stark_321654987",
    status: "active",
    requestsThisMonth: 9870,
    createdAt: "2023-02-15T11:10:00Z",
  },
];

type ApiClient = {
  id: string;
  name: string;
  plan: "basic" | "pro" | "enterprise";
  apiKey: string;
  status: "active" | "inactive";
  requestsThisMonth: number;
  createdAt: string;
};

export function ApiClientsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<ApiClient>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => {
        const plan = row.getValue("plan") as string;
        return (
          <Badge
            variant={
              plan === "enterprise"
                ? "default"
                : plan === "pro"
                ? "outline"
                : "secondary"
            }
            className={
              plan === "enterprise" ? "bg-blue-500 hover:bg-blue-600" : ""
            }
          >
            {plan}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "apiKey",
      header: "API Key",
      cell: ({ row }) => {
        const apiKey = row.getValue("apiKey") as string;
        const maskedKey = `${apiKey.substring(0, 8)}...${apiKey.substring(
          apiKey.length - 4
        )}`;
        return (
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <code className="rounded bg-muted px-2 py-1 text-sm">
              {maskedKey}
            </code>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={
              status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : ""
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "requestsThisMonth",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Requests
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const requests = row.getValue("requestsThisMonth") as number;
        return <div className="text-right">{requests.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(client.apiKey)}
              >
                Copy API key
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/api-clients/${client.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate API key
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              table.getColumn("plan")?.setFilterValue("enterprise")
            }
          >
            Enterprise
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.getColumn("plan")?.setFilterValue("pro")}
          >
            Pro
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.getColumn("plan")?.setFilterValue("basic")}
          >
            Basic
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.getColumn("plan")?.setFilterValue(null)}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

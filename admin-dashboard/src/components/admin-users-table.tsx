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
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

// Sample data - in a real app, this would come from an API
const data = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "admin",
    lastActive: "2023-05-01T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "super-admin",
    lastActive: "2023-05-02T14:45:00Z",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    role: "editor",
    lastActive: "2023-05-01T09:15:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "admin",
    lastActive: "2023-04-30T16:20:00Z",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "editor",
    lastActive: "2023-04-29T11:10:00Z",
  },
];

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super-admin" | "editor";
  lastActive: string;
};

export function AdminUsersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<AdminUser>[] = [
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
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`/placeholder.svg?${row.original.id}`}
              alt={row.getValue("name")}
            />
            <AvatarFallback>
              {row
                .getValue<string>("name")
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium">{row.getValue("name")}</div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <Badge
            variant={
              role === "super-admin"
                ? "default"
                : role === "admin"
                ? "outline"
                : "secondary"
            }
            className={
              role === "super-admin" ? "bg-purple-500 hover:bg-purple-600" : ""
            }
          >
            {role === "super-admin" && <Shield className="mr-1 h-3 w-3" />}
            {role}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "lastActive",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Active
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastActive"));
        return <div>{date.toLocaleString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

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
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/admin-users/${user.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
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
              table.getColumn("role")?.setFilterValue("super-admin")
            }
          >
            Super Admin
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.getColumn("role")?.setFilterValue("admin")}
          >
            Admin
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.getColumn("role")?.setFilterValue("editor")}
          >
            Editor
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.getColumn("role")?.setFilterValue(null)}
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

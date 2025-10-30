import { useState } from "react"
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
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ArrowUpDown,
  Pencil,
  Trash2,
} from "lucide-react"
import { Link } from "react-router-dom"

// Sample data - in a real app, this would come from an API
const data = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    joinedDate: "2023-04-23",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    phone: "+1 (555) 234-5678",
    status: "pending",
    joinedDate: "2023-04-24",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    joinedDate: "2023-04-25",
  },
  {
    id: "4",
    name: "William Kim",
    email: "will.kim@email.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    joinedDate: "2023-04-25",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    joinedDate: "2023-04-26",
  },
  {
    id: "6",
    name: "Liam Johnson",
    email: "liam.johnson@email.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    joinedDate: "2023-04-27",
  },
  {
    id: "7",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 (555) 789-0123",
    status: "pending",
    joinedDate: "2023-04-28",
  },
  {
    id: "8",
    name: "Noah Martinez",
    email: "noah.martinez@email.com",
    phone: "+1 (555) 890-1234",
    status: "active",
    joinedDate: "2023-04-29",
  },
  {
    id: "9",
    name: "Ava Thompson",
    email: "ava.thompson@email.com",
    phone: "+1 (555) 901-2345",
    status: "inactive",
    joinedDate: "2023-04-30",
  },
  {
    id: "10",
    name: "Ethan Anderson",
    email: "ethan.anderson@email.com",
    phone: "+1 (555) 012-3456",
    status: "active",
    joinedDate: "2023-05-01",
  },
  {
    id: "11",
    name: "Charlotte Garcia",
    email: "charlotte.garcia@email.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    joinedDate: "2023-05-02",
  },
  {
    id: "12",
    name: "Mason Brown",
    email: "mason.brown@email.com",
    phone: "+1 (555) 234-5678",
    status: "pending",
    joinedDate: "2023-05-03",
  },
]

type Client = {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "pending" | "inactive"
  joinedDate: string
}

export function ClientsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "active" ? "default" : status === "pending" ? "outline" : "secondary"}
            className={status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "joinedDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Joined Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("joinedDate"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original

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
                onClick={() => navigator.clipboard.writeText(client.id)}
              >
                Copy client ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/dashboard/clients/${client.id}`}>
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
  ]

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
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.getColumn("status")?.setFilterValue("active")}>
            Active
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.getColumn("status")?.setFilterValue("pending")}>
            Pending
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.getColumn("status")?.setFilterValue("inactive")}>
            Inactive
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.getColumn("status")?.setFilterValue(null)}>
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
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
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
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
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
  )
}


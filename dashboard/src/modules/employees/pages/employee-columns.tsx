import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import {DeleteConfirmDialog} from "@/shared/components"
import type { Employee } from "../types/employees.types"

type Params = {
  handleEdit: (employee: Employee) => void
  handleDelete: (id: string) => void
  isAdmin: boolean
  isDeleting: boolean
}

export const getEmployeeColumns = ({
  handleEdit,
  handleDelete,
  isAdmin,
  isDeleting,
}: Params): ColumnDef<Employee>[] => [
  {
    accessorKey: "name",
    header: "Employee",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => row.original.role || "-",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => row.original.department || "-",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original

      return (
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleEdit(employee)}
            disabled={!isAdmin}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <DeleteConfirmDialog
            trigger={
              <Button variant="destructive" size="icon">
                <Trash2 size={16} />
              </Button>
            }
            title="Delete Employee"
            description="Are you sure you want to delete?"
            onConfirm={() => handleDelete(employee._id)}
            loading={isDeleting}
          />
        </div>
      )
    },
  },
]
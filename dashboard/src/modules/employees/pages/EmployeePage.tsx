import { useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { AddEmployeeModal } from "@/modules/employees/components/AddEmployeeModal"
import { AppBreadcrumb } from "@/shared/components/AppBreadcrumb"
import Heading from "@/shared/components/Heading"
import { useEmployees } from "../hooks/useEmployees"
import { DataTable } from "@/shared/components/DataTable"
import { SearchTable } from "@/shared/components/SearchTable"
import { Pagination } from "@/shared/components/Pagination"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type{ ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<any>[] = [
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

  // 🔥 Actions Column
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
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => handleDelete(employee._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

const EmployeePage = () => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAuth()
  const perPage = 5

  const { employees, total, totalPages, isLoading } = useEmployees({
    page,
    limit: perPage,
    q: filter.trim() || undefined,
  })



  const isAdmin = user?.role === "admin"

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Employees" },
          ]}
        />
        <div className="flex items-end justify-between">
        <Heading as="h4">Employees Management</Heading>
          {isAdmin && (
            <Button
              onClick={() => setModalOpen(true)}
              className="cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          )}
        </div>
        <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Employee Directory</CardTitle>
        <SearchTable
          value={filter}
          onChange={(val) => {
            setFilter(val)
            setPage(1) // reset page on search
          }}
        />
      </CardHeader>

      <CardContent>
        <DataTable data={employees} columns={columns} isLoading={isLoading} />
      </CardContent>

      <CardFooter>
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          perPage={perPage}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
      </div>

      {isAdmin && (
        <AddEmployeeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

export default EmployeePage

import { useMemo, useState } from "react"
import { Plus, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { AddEmployeeModal } from "@/modules/employees/components/AddEmployeeModal"
import {
  AppBreadcrumb,
  DataTable,
  SearchTable,
  Pagination,
} from "@/shared/components"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EditEmployeeModal } from "../components/EditEmployeeModal"
import type { Employee } from "@/modules/employees/types/employees.types"
import { useEmployeesQuery } from "../hooks/useEmployeesQuery"
import { useEmployeeMutations } from "../hooks/useEmployeeMutations"
import { getEmployeeColumns } from "./employee-columns"

const EmployeePage = () => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  )
  const { user } = useAuth()

  const perPage = 5

  const { employees, total, totalPages, isLoading } = useEmployeesQuery({
    page,
    limit: perPage,
    q: filter.trim() || undefined,
  })
  const { deleteEmployee, isDeleting } = useEmployeeMutations()

  const isAdmin = user?.role === "admin"

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setEditModalOpen(true)
  }

  const handleDelete = async (employeeId: string) => {
    await deleteEmployee(employeeId)
  }

  const columns = useMemo(
    () =>
      getEmployeeColumns({
        handleEdit,
        handleDelete,
        isAdmin,
        isDeleting,
      }),
    [handleEdit, handleDelete, isAdmin, isDeleting]
  )

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
        <div className="flex items-end justify-end">
          {/* <Heading as="h4">Employees Management</Heading> */}
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
            <DataTable
              data={employees}
              columns={columns}
              isLoading={isLoading}
            />
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
        <>
          <AddEmployeeModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
          <EditEmployeeModal
            isOpen={editModalOpen}
            employee={selectedEmployee}
            onClose={() => {
              setEditModalOpen(false)
              setSelectedEmployee(null)
            }}
          />
        </>
      )}
    </div>
  )
}

export default EmployeePage

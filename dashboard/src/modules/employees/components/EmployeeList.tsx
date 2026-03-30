import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { DataTable, Pagination, SearchTable } from "@/shared/components"
import { useEmployeesQuery } from "../hooks/useEmployeesQuery"

export const EmployeeList = () => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")

  const perPage = 5

  const { employees, total, totalPages, isLoading } = useEmployeesQuery({
    page,
    limit: perPage,
    q: filter.trim() || undefined,
  })

  const columns = [
    {
      key: "name",
      header: "Employee",
      render: (emp: any) => emp.name,
    },
    {
      key: "role",
      header: "Role",
      render: (emp: any) => (emp.role ? emp.role : "-"),
    },
    {
      key: "email",
      header: "Email",
      render: (emp: any) => emp.email,
    },
    {
      key: "department",
      header: "Department",
      render: (emp: any) => (emp.department ? emp.department : "-"),
    },
    {
      key: "status",
      header: "Status",
      render: (emp: any) => emp.status,
    },
  ]

  return (
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
  )
}

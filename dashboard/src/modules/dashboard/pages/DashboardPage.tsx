import React, { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useAuth } from "@/modules/auth/hooks/useAuth"
import { StatCards } from "@/modules/dashboard/components/StatCards"
import { WorkforceOverview } from "@/modules/dashboard/components/WorkforceOverview"
import { EmployeeDirectory } from "@/modules/dashboard/components/EmployeeDirectory"
import { RecentActivity } from "@/modules/dashboard/components/RecentActivity"
import { AddEmployeeModal } from "@/modules/dashboard/components/AddEmployeeModal"
import { AppBreadcrumb } from "@/shared/components/AppBreadcrumb"

const DashboardPage: React.FC = () => {
  const { searchValue, setSearchValue } = useOutletContext<{
    searchValue: string
    setSearchValue: (value: string) => void
  }>()
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        <AppBreadcrumb
          items={[
            { label: "", href: "/dashboard" },
            { label: "Dashboard", href: "/dashboard" },

          ]}
        />
        <div className="flex items-end justify-between">
          <div>
            <h1 className="mb-1 text-xl font-semibold text-foreground">
              Employee Management
            </h1>
            <p className="text-muted-foreground">
              Overview of your workforce metrics and team data.
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-brand-primary hover:bg-brand-primary-hover gap-2 text-white"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          )}
        </div>

        <StatCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <WorkforceOverview />
            <EmployeeDirectory
              filterValue={searchValue}
              setFilterValue={setSearchValue}
            />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
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

export default DashboardPage

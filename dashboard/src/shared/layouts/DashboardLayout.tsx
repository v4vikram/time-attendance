import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/shared/layouts/AppSidebar"
import { Outlet } from "react-router-dom"
import { Topbar } from "@/shared/layouts/Topbar"
import type { Role } from "../types"
import { useAuth } from "@/modules/auth/hooks/useAuth"


export default function DashboardLayout() {
  const [searchValue, setSearchValue] = useState("")
  const {user} = useAuth()
  const role: Role = user?.role ?? "employee";

  return (
    <SidebarProvider>
      <aside className="sticky top-0 z-50 h-screen">
        <AppSidebar role={role}/>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 min-h-screen bg-background relative">
        <div className="hidden md:flex sticky top-0 z-50">
          <div className="flex-1">
            <Topbar searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>
        <div className="flex-1 overflow-auto flex flex-col">
          <Outlet context={{ searchValue, setSearchValue }} />
        </div>
      </main>
    </SidebarProvider>
  )
}
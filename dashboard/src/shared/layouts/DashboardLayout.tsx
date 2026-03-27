import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/shared/layouts/AppSidebar"
import { Outlet } from "react-router-dom"
import { Topbar } from "@/shared/components/layout/Topbar"

export default function DashboardLayout() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <SidebarProvider>
      <aside className="sticky top-0 z-50 h-screen">
        <AppSidebar />
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
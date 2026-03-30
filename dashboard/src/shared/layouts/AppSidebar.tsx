import  { useState } from "react"
import { ChevronDown, Box } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { routes } from "@/app/router/routes"
import type { AppRoute, Role } from "../types"

interface SidebarProps {
  role: Role
}

export const AppSidebar = ({ role }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // ✅ filter routes directly
  const filteredRoutes = routes.filter((route) => route.roles.includes(role))

  const isActive = (path?: string) => location.pathname === path

  const isChildActive = (route: AppRoute) =>
    route.children?.some(
      (child) => child.roles.includes(role) && location.pathname === child.path
    )

  const NavItem = ({ route }: { route: AppRoute }) => {
    // ✅ filter children directly
    const children = route.children?.filter((child) =>
      child.roles.includes(role)
    )

    const open = openMenus[route.id] || isChildActive(route)
    const active = isActive(route.path) || isChildActive(route)
    const Icon = route.icon

    return (
      <div className="mb-1">
        <button
          onClick={() => {
            if (children && children.length > 0) {
              toggleMenu(route.id)
            } else if (route.path) {
              navigate(route.path)
            }
          }}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors",
            active
              ? "bg-brand-subtle text-brand-primary font-medium"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <div className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4" />}
            {route.label}
          </div>

          {children && children.length > 0 && (
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                open && "rotate-180"
              )}
            />
          )}
        </button>

        {/* CHILDREN */}
        {children && children.length > 0 && open && (
          <div className="mt-1 mb-2 flex flex-col gap-1 pl-3">
            {children.map((child) => {
              const childActive = isActive(child.path)
              const Icon =  child.icon

              return (
                <button
                key={child.id}
                onClick={() => navigate(child.path)}
                className={cn(
                  "flex items-center gap-2 rounded-lg  py-1.5 text-left px-3 text-xs transition-colors",
                  childActive
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {/* ✅ ICON */}
                {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      
                {/* ✅ LABEL */}
                <span>{child.label}</span>
              </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-border bg-card">
      {/* HEADER */}
      <div className="flex h-16 items-center gap-2 border-b border-border p-4">
        <div className="bg-brand-primary flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
          <Box className="h-4 w-4 text-white" />
        </div>
        <span className="font-semibold">TimeWatch</span>
      </div>

      {/* NAV */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredRoutes.map((route) => (
          <NavItem key={route.id} route={route} />
        ))}
      </div>
    </aside>
  )
}

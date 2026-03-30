import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export type Role = "admin" | "employee"

export type AppRoute = {
  id: string
  path: string
  element?: ReactNode
  label: string
  icon?: LucideIcon
  roles: Role[]
  children?: AppRoute[]
}

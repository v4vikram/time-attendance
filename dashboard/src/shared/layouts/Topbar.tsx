import React from "react"
import { Search, Moon, Bell, ChevronDown, Sun } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/app/providers/ThemeProvider"

interface TopbarProps {
  searchValue: string
  setSearchValue: (value: string) => void
}

export const Topbar: React.FC<TopbarProps> = ({
  searchValue,
  setSearchValue,
}) => {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex w-[300px] items-center gap-2">
        <SidebarTrigger />
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search employees, departments..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-9 border-border bg-card pl-9 text-[13px] text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
          title="Toggle Theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-[6px] right-[8px] h-1.5 w-1.5 rounded-full bg-destructive"></span>
        </Button>
        <div className="mx-2 h-6 w-[1px] bg-border"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="group flex cursor-pointer items-center gap-3">
              <Avatar className="h-8 w-8 bg-muted text-muted-foreground">
                <AvatarImage
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  alt="Eleanor Pena"
                />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[13px] leading-tight font-medium transition-colors group-hover:text-primary">
                  {user?.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {user?.role}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleLogout}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

import React from 'react';
import { Search, Moon, Bell, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ searchValue, setSearchValue }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/")
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="w-[300px] flex items-center gap-2">
        <SidebarTrigger />
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search employees, departments..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 h-9 border-border bg-card text-[13px] text-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg" title="Toggle Theme">
          <Moon className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg">
          <Bell className="w-4 h-4" />
          <span className="absolute top-[6px] right-[8px] w-1.5 h-1.5 bg-destructive rounded-full"></span>
        </Button>
        <div className="w-[1px] h-6 bg-border mx-2"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
              <Avatar className="h-8 w-8 bg-muted text-muted-foreground">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Eleanor Pena" />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-[13px] leading-tight group-hover:text-primary transition-colors">{user?.name}</span>
                <span className="text-[11px] text-muted-foreground">{user?.role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout} >Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

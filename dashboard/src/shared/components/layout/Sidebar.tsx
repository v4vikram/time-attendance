import React from 'react';
import {
  LayoutGrid,
  Users,
  Calendar,
  DollarSign,
  Layers,
  BarChart2,
  Settings,
  ChevronDown,
  Box,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasChildren?: boolean;
}

interface SidebarProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  employeesExpanded: boolean;
  setEmployeesExpanded: (expanded: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  setActiveNav,
  employeesExpanded,
  setEmployeesExpanded,
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'employees', label: 'Employees', icon: <Users className="w-4 h-4" />, hasChildren: true },
    { id: 'attendance', label: 'Attendance', icon: <Calendar className="w-4 h-4" /> },
    { id: 'payroll', label: 'Payroll', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
  ];

  const adminItems: NavItem[] = [
    { id: 'reports', label: 'Reports', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveNav(item.id);
    if (item.hasChildren) {
      setEmployeesExpanded(!employeesExpanded);
    }
  };

  const NavItemComponent = ({ item }: { item: NavItem }) => {
    const isActive = activeNav === item.id;
    return (
      <div className="mb-1">
        <button
          onClick={() => handleNavClick(item)}
          className={cn(
            'flex items-center justify-between w-full px-3 py-2 rounded-lg text-[13px] transition-colors',
            isActive
              ? 'bg-brand-subtle text-brand-primary font-medium'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          )}
        >
          <div className={cn("flex items-center gap-3", isActive && "text-brand-primary")}>
            {item.icon}
            {item.label}
          </div>
          {item.hasChildren && (
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", employeesExpanded && "rotate-180")} />
          )}
        </button>
        {item.hasChildren && employeesExpanded && (
          <div className="pl-9 flex flex-col gap-1 mt-1 mb-2">
            {['All Employees', 'Departments', 'Designations'].map((sub, i) => (
              <button
                key={sub}
                className={cn(
                  'text-left px-3 py-1.5 rounded-lg text-xs transition-colors',
                  i === 0
                    ? 'text-foreground font-medium hover:bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-[500px] bg-card border-r border-border flex flex-col shrink-0">
      <div className="h-16 flex items-center px-5 font-bold text-base text-foreground border-b border-border gap-3 tracking-tight">
        <div className="w-6 h-6 bg-brand-primary rounded-md flex items-center justify-center text-primary-foreground">
          <Box className="w-4 h-4" />
        </div>
        Workforce1
      </div>
      <nav className="p-3 overflow-y-auto flex-1 custom-scrollbar">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-4 mb-2 ml-3">
          Main Menu
        </div>
        {navItems.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}

        <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-6 mb-2 ml-3">
          Admin
        </div>
        {adminItems.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </nav>
    </aside>
  );
};

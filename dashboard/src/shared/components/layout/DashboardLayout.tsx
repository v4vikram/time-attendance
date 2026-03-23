import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, searchValue, setSearchValue }) => {
  const [activeNav, setActiveNav] = useState('employees');
  const [employeesExpanded, setEmployeesExpanded] = useState(true);

  return (
    <div className="flex bg-background text-foreground h-screen overflow-hidden text-[13px] leading-relaxed font-sans">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        employeesExpanded={employeesExpanded}
        setEmployeesExpanded={setEmployeesExpanded}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* <Topbar searchValue={searchValue} setSearchValue={setSearchValue} /> */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

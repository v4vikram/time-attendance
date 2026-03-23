import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { StatCards } from '@/modules/dashboard/components/StatCards';
import { WorkforceOverview } from '@/modules/dashboard/components/WorkforceOverview';
import { EmployeeDirectory } from '@/modules/dashboard/components/EmployeeDirectory';
import { RecentActivity } from '@/modules/dashboard/components/RecentActivity';
import { AddEmployeeModal } from '@/modules/dashboard/components/AddEmployeeModal';

const DashboardPage: React.FC = () => {
  const { searchValue, setSearchValue } = useOutletContext<{ searchValue: string; setSearchValue: (value: string) => void }>();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-xl font-semibold text-foreground mb-1">Employee Management</h1>
            <p className="text-muted-foreground">Overview of your workforce metrics and team data.</p>
          </div>
          <Button onClick={() => setModalOpen(true)} className="bg-brand-primary hover:bg-brand-primary-hover text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>
        
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <WorkforceOverview />
            <EmployeeDirectory filterValue={searchValue} setFilterValue={setSearchValue} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
      
      <AddEmployeeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default DashboardPage;
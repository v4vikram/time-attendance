import React from 'react';
import { Users, CheckCircle, Calendar, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const StatCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      <Card className="shadow-sm">
        <CardHeader className="p-5 flex flex-row items-center justify-between pb-2 space-y-0 border-b-0 border-none">
          <span className="text-xs text-muted-foreground font-medium">Total Employees</span>
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground">
            <Users className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex flex-col gap-3">
          <div className="text-[28px] font-semibold text-foreground leading-none">2,420</div>
          <div className="text-xs flex items-center gap-1 mt-2 text-[#059669]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>12% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="p-5 flex flex-row items-center justify-between pb-2 space-y-0 border-none">
          <span className="text-xs text-muted-foreground font-medium">Active Employees</span>
          <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex flex-col gap-3">
          <div className="text-[28px] font-semibold text-foreground leading-none">2,385</div>
          <div className="text-xs flex items-center gap-1 mt-2 text-muted-foreground">
            <span>98% active rate</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="p-5 flex flex-row items-center justify-between pb-2 space-y-0 border-none">
          <span className="text-xs text-muted-foreground font-medium">On Leave</span>
          <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#D97706] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex flex-col gap-3">
          <div className="text-[28px] font-semibold text-foreground leading-none">35</div>
          <div className="text-xs flex items-center gap-1 mt-2 text-destructive">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-5% from last week</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="p-5 flex flex-row items-center justify-between pb-2 space-y-0 border-none">
          <span className="text-xs text-muted-foreground font-medium">New Joinees</span>
          <div className="w-8 h-8 rounded-lg bg-brand-subtle text-brand-primary flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex flex-col gap-3">
          <div className="text-[28px] font-semibold text-foreground leading-none">12</div>
          <div className="text-xs flex items-center gap-1 mt-2 text-muted-foreground">
            <span>This month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

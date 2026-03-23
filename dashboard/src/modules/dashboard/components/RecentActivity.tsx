import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const activityData = [
  { id: 1, color: 'bg-brand-primary', title: 'New Employee Added', desc: 'Sarah Jenkins was added to Design by Admin.', time: '10 minutes ago' },
  { id: 2, color: 'bg-[#059669]', title: 'Leave Approved', desc: 'Guy Hawkins leave request (Oct 12-15) approved.', time: '2 hours ago' },
  { id: 3, color: 'bg-muted-foreground', title: 'System Update', desc: 'Payroll module updated to version 2.4.1.', time: 'Yesterday, 14:30' },
  { id: 4, color: 'bg-[#D97706]', title: 'Role Change', desc: 'Jenny Wilson promoted to Product Manager.', time: 'Oct 8, 2023' },
  { id: 5, color: 'bg-brand-primary', title: 'Project Assigned', desc: "Engineering team assigned to 'Project Alpha'.", time: 'Oct 5, 2023' },
];

export const RecentActivity: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? activityData : activityData.slice(0, 5);

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="p-5 border-b border-border space-y-0 pb-4">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 flex-1 relative">
        <div className="flex flex-col">
          {displayed.map((item, idx) => (
            <div
              key={item.id}
              className={cn(
                "flex gap-4 py-4 relative",
                idx !== displayed.length - 1 ? "border-b border-border" : "pb-0"
              )}
            >
              <div className="relative flex flex-col items-center mt-1.5">
                <div className={cn("w-2 h-2 rounded-full z-10 ring-4 ring-card", item.color)} />
                {idx < displayed.length - 1 && (
                  <div className="absolute top-[14px] -bottom-[20px] w-px bg-border z-0" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</div>
                <div className="text-[11px] text-muted-foreground opacity-70 mt-1">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-3 border-t border-border flex justify-center mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="text-brand-primary text-xs font-medium hover:text-brand-primary-hover hover:bg-transparent"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'View All Activity'}
        </Button>
      </CardFooter>
    </Card>
  );
};

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const WorkforceOverview: React.FC = () => {
  const bars = [30, 45, 40, 60, 55, 80, 100];

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0 border-b border-border">
        <CardTitle className="text-sm font-semibold">Workforce Overview</CardTitle>
        <Button variant="secondary" size="sm" className="h-[26px] px-3 text-xs flex gap-1 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg">
          This Year <ChevronDown className="w-3 h-3" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-5 grid grid-cols-2 gap-5 h-[200px]">
        {/* Employee Growth Chart */}
        <div className="flex flex-col h-full">
          <div className="text-xs text-muted-foreground mb-3">Employee Growth</div>
          <div className="bg-muted rounded-lg flex items-end p-4 gap-2 relative flex-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t-sm transition-all duration-300",
                  i === bars.length - 1 ? "bg-brand-primary" : i % 2 === 1 ? "bg-ring" : "bg-border"
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Department Distribution */}
        <div className="flex flex-col h-full">
          <div className="text-xs text-muted-foreground mb-3">Department Distribution</div>
          <div className="flex justify-center items-center flex-1">
            <div 
              className="w-[120px] h-[120px] rounded-full shrink-0"
              style={{
                background: 'conic-gradient(var(--brand-primary) 0% 45%, var(--ring) 45% 75%, var(--border) 75% 100%)'
              }}
            />
            <div className="flex flex-col gap-2 text-[11px] ml-5">
              <div className="flex items-center gap-1.5 text-foreground">
                <span className="w-2 h-2 rounded-[2px] bg-brand-primary inline-block"></span> Engineering
              </div>
              <div className="flex items-center gap-1.5 text-foreground">
                <span className="w-2 h-2 rounded-[2px] bg-ring inline-block"></span> Product
              </div>
              <div className="flex items-center gap-1.5 text-foreground">
                <span className="w-2 h-2 rounded-[2px] bg-border inline-block"></span> Design
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

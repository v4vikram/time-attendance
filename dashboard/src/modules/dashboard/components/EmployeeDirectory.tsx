import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { listEmployeesApi } from '@/modules/employees/api/employees.api';
import type { Employee } from '@/modules/employees/types/employees.types';


interface EmployeeDirectoryProps {
  filterValue: string;
  setFilterValue: (value: string) => void;
}

export const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({ filterValue, setFilterValue }) => {
  const [page, setPage] = useState(1);
  const perPage = 5;

  const q = filterValue.trim();

  const { data, isLoading } = useQuery({
    queryKey: ['employees', page, perPage, q],
    queryFn: () =>
      listEmployeesApi({
        page,
        limit: perPage,
        q: q ? q : undefined,
      }),
  });

  const employees: Employee[] = data?.employees ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-[#ECFDF5] text-[#059669] hover:bg-[#ECFDF5]/80 font-medium border-transparent shadow-none">Active</Badge>;
      case 'On Leave':
        return <Badge className="bg-[#FFF7ED] text-[#D97706] hover:bg-[#FFF7ED]/80 font-medium border-transparent shadow-none">On Leave</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 font-medium border-transparent shadow-none">{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden flex flex-col">
      <CardHeader className="p-5 flex flex-row justify-between items-center border-b border-border space-y-0">
        <CardTitle className="text-sm font-semibold">Employee Directory</CardTitle>
        <div className="relative w-[200px] flex items-center">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter..."
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              setPage(1);
            }}
            className="pl-8 h-8 text-xs border-border bg-card shadow-sm"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-border">
              {['Employee', 'Role', 'Department', 'Status', 'Action'].map((h, i) => (
                <TableHead
                  key={h}
                  className={`py-3 px-5 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold h-auto ${
                    i === 4 ? 'text-right' : ''
                  }`}
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-[13px]">
                  Loading...
                </TableCell>
              </TableRow>
            ) : employees.length > 0 ? (
              employees.map((emp) => (
                <TableRow key={emp._id} className="border-b-border hover:bg-accent/50 transition-colors">
                  <TableCell className="p-4 px-5 align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
                          className="text-xs font-semibold"
                        >
                          {emp.name?.charAt(0) || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground text-[13px]">{emp.name}</span>
                        <span className="text-xs text-muted-foreground">{emp.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 px-5 align-middle text-[13px]">{emp.role}</TableCell>
                  <TableCell className="p-4 px-5 align-middle text-[13px]">{emp.department}</TableCell>
                  <TableCell className="p-4 px-5 align-middle">
                    {getStatusBadge(emp.status)}
                  </TableCell>
                  <TableCell className="p-4 px-5 align-middle text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-[13px]">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="p-3 px-5 border-t border-border flex justify-between items-center text-xs text-muted-foreground bg-card">
        <span>
          Showing {total === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} entries
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 px-3 text-xs bg-muted hover:bg-muted/80 text-foreground shadow-none"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-7 px-3 text-xs bg-muted hover:bg-muted/80 text-foreground shadow-none"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const allEmployees = [
  { id: 1, name: 'Cameron Williamson', email: 'cameron.w@company.com', role: 'Senior Frontend Dev', department: 'Engineering', status: 'Active', src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 2, name: 'Jenny Wilson', email: 'jenny.w@company.com', role: 'Product Manager', department: 'Product', status: 'Active', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
  { id: 3, name: 'Guy Hawkins', email: 'guy.h@company.com', role: 'UI/UX Designer', department: 'Design', status: 'On Leave', src: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
  { id: 4, name: 'Robert Fox', email: 'robert.f@company.com', role: 'DevOps Engineer', department: 'Engineering', status: 'Active', initials: 'RW', bgColor: '#E0E7FF', color: '#5C65F6' },
  { id: 5, name: 'Kathryn Murphy', email: 'kathryn.m@company.com', role: 'Marketing Coord.', department: 'Marketing', status: 'Offline', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
];

interface EmployeeDirectoryProps {
  filterValue: string;
  setFilterValue: (value: string) => void;
}

export const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({ filterValue, setFilterValue }) => {
  const [page, setPage] = useState(0);
  const perPage = 5;

  const filtered = allEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      e.department.toLowerCase().includes(filterValue.toLowerCase()) ||
      e.role.toLowerCase().includes(filterValue.toLowerCase())
  );

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
              setPage(0);
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
            {filtered.slice(page * perPage, page * perPage + perPage).map((emp) => (
              <TableRow key={emp.id} className="border-b-border hover:bg-accent/50 transition-colors">
                <TableCell className="p-4 px-5 align-middle">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={emp.src} alt={emp.name} />
                      <AvatarFallback
                        style={{
                          backgroundColor: emp.bgColor || 'var(--muted)',
                          color: emp.color || 'var(--muted-foreground)',
                        }}
                        className="text-xs font-semibold"
                      >
                        {emp.initials || emp.name.charAt(0)}
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
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
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
          Showing {filtered.length === 0 ? 0 : page * perPage + 1} to{' '}
          {Math.min(page * perPage + perPage, filtered.length)} of {filtered.length} entries
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 px-3 text-xs bg-muted hover:bg-muted/80 text-foreground shadow-none"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-7 px-3 text-xs bg-muted hover:bg-muted/80 text-foreground shadow-none"
            disabled={(page + 1) * perPage >= filtered.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DeleteConfirmDialog } from '@/shared/components';
import { Pencil, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import type { AttendanceRecord } from '@/modules/attendance/types/attendance.types';

type Params = {
  handleEdit: (attendance: AttendanceRecord) => void;
  handleDelete: (id: string) => void;
  isAdmin: boolean;
  isDeleting: boolean;
};

const formatTime = (value?: string | null) =>
  value ? dayjs(value).format('HH:mm') : '-';

export const getAttendanceColumns = ({
  handleEdit,
  handleDelete,
  isAdmin,
  isDeleting,
}: Params): ColumnDef<AttendanceRecord>[] => [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => dayjs(row.original.date).format('MMM D, YYYY'),
  },
  {
    accessorKey: 'employee',
    header: 'Employee ID',
  },
  {
    accessorKey: 'checkIn',
    header: 'Check-in',
    cell: ({ row }) => formatTime(row.original.checkIn),
  },
  {
    accessorKey: 'checkOut',
    header: 'Check-out',
    cell: ({ row }) => formatTime(row.original.checkOut),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status.replace('_', ' '),
  },
  {
    accessorKey: 'workingHours',
    header: 'Hours',
    cell: ({ row }) => row.original.workingHours?.toFixed(2) ?? '-',
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
    cell: ({ row }) => row.original.remarks || '-',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const attendance = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleEdit(attendance)}
            disabled={!isAdmin}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <DeleteConfirmDialog
            trigger={
              <Button variant="destructive" size="icon">
                <Trash2 size={16} />
              </Button>
            }
            title="Delete Attendance"
            description="This attendance record will be removed permanently."
            onConfirm={() => handleDelete(attendance.id)}
            loading={isDeleting}
          />
        </div>
      );
    },
  },
];

"use client"

import { useMemo, useState, useEffect } from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AppBreadcrumb, DataTable, Pagination } from '@/shared/components';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useAttendanceQuery } from '@/modules/attendance/hooks/useAttendanceQuery';
import { useTodayAttendanceQuery } from '@/modules/attendance/hooks/useTodayAttendanceQuery';
import { useAttendanceMutations } from '@/modules/attendance/hooks/useAttendanceMutations';
import { getAttendanceColumns } from './attendance-columns';
import { AttendanceModal } from '@/modules/attendance/components/AttendanceModal';
import { useInactivityTimer } from '@/modules/attendance/hooks/useInactivityTimer';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import type { AttendanceRecord } from '@/modules/attendance/types/attendance.types';
import type { AttendanceFormType } from '@/modules/attendance/validations/attendance.schema';

const AttendancePage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [page, setPage] = useState(1);
  const [employeeIdFilter, setEmployeeIdFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceRecord | null>(null);

  const { attendances, total, totalPages, isLoading } = useAttendanceQuery({
    page,
    limit: 10,
    employeeId: isAdmin ? employeeIdFilter : user?.id,
    from: fromDate,
    to: toDate,
  });

  const {
    createAttendance,
    updateAttendance,
    deleteAttendance,
    checkIn,
    checkOut,
    isCreating,
    isUpdating,
    isDeleting,
    isCheckingIn,
    isCheckingOut,
    pause,
    resume,
  } = useAttendanceMutations();

  const { attendance: todayAttendance, isLoading: isTodayLoading } = useTodayAttendanceQuery();

  const canCheckIn = !todayAttendance?.checkIn;
  const canCheckOut = Boolean(todayAttendance?.checkIn && !todayAttendance?.checkOut);
  const isCurrentlyPaused = Boolean(todayAttendance?.isPaused);

  const [liveActiveMins, setLiveActiveMins] = useState(0);

  useEffect(() => {
    if (!todayAttendance) {
      setLiveActiveMins(0);
      return;
    }
    const updateTimer = () => {
      let mins = todayAttendance.totalActiveMinutes || 0;
      if (!todayAttendance.isPaused && todayAttendance.activeSince) {
        const diff = (Date.now() - new Date(todayAttendance.activeSince).getTime()) / (1000 * 60);
        mins += diff;
      }
      setLiveActiveMins(Math.max(0, mins));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // 1 minute
    return () => clearInterval(interval);
  }, [todayAttendance]);

  useInactivityTimer({
    timeoutMs: 1 * 60 * 1000, // 1 minute
    isActive: canCheckOut && !isAdmin, // ✅ FIXED
    onIdle: () => {
      pause(undefined, {
        onSuccess: () => toast.info('Paused due to inactivity'),
      });
    },
    onActive: () => {
      resume(undefined, {
        onSuccess: () => toast.success('Resumed automatically'),
      });
    },
  });

  const formatTime = (totalMins: number) => {
    const h = Math.floor(totalMins / 60);
    const m = Math.floor(totalMins % 60);
    return `${h}h ${m}m`;
  };

  const handleCheckIn = () => {
    checkIn(false, {
      onSuccess: () => {
        toast.success('Checked in successfully');
      },
      onError: (err: any) => {
        toast.error(err?.message || 'Unable to check in');
      },
    });
  };

  const handleCheckOut = () => {
    checkOut(false, {
      onSuccess: () => {
        toast.success('Checked out successfully');
      },
      onError: (err: any) => {
        toast.error(err?.message || 'Unable to check out');
      },
    });
  };

  const handleCreate = (values: AttendanceFormType) => {
    const payload = {
      ...values,
      employeeId: isAdmin ? values.employeeId : user?.id || '',
    };

    createAttendance(payload, {
      onSuccess: () => {
        toast.success('Attendance recorded successfully');
        setIsModalOpen(false);
      },
      onError: (err: any) => {
        toast.error(err?.message || 'Unable to record attendance');
      },
    });
  };

  const handleEdit = (attendance: AttendanceRecord) => {
    setSelectedAttendance(attendance);
    setEditModalOpen(true);
  };

  const handleUpdate = (values: AttendanceFormType) => {
    if (!selectedAttendance) return;

    updateAttendance(
      {
        id: selectedAttendance.id,
        date: values.date,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        remarks: values.remarks,
        isAutoCheckout: values.isAutoCheckout,
      },
      {
        onSuccess: () => {
          toast.success('Attendance updated successfully');
          setEditModalOpen(false);
          setSelectedAttendance(null);
        },
        onError: (err: any) => {
          toast.error(err?.message || 'Unable to update record');
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteAttendance(id, {
      onSuccess: () => {
        toast.success('Attendance deleted');
      },
      onError: (err: any) => {
        toast.error(err?.message || 'Unable to delete record');
      },
    });
  };

  const columns = useMemo(
    () =>
      getAttendanceColumns({
        handleEdit,
        handleDelete,
        isAdmin,
        isDeleting,
      }),
    [handleEdit, handleDelete, isAdmin, isDeleting]
  );

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
        <AppBreadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Attendance' },
          ]}
        />

        {!isAdmin && (
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg">Today's Attendance</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Check in / check out for your current shift.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={handleCheckIn}
                  disabled={!canCheckIn || isCheckingIn || isTodayLoading}
                >
                  {isCheckingIn ? 'Checking in...' : canCheckIn ? 'Check in' : 'Checked in'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCheckOut}
                  disabled={!canCheckOut || isCheckingOut || isTodayLoading}
                >
                  {isCheckingOut ? 'Checking out...' : canCheckOut ? 'Check out' : 'Checked out'}
                </Button>
                {canCheckOut && (
                  <Button
                    variant={isCurrentlyPaused ? "default" : "outline"}
                    onClick={() => {
                      if (isCurrentlyPaused) resume(undefined, { onSuccess: () => toast.success('Resumed') });
                      else pause(undefined, { onSuccess: () => toast.info('Paused') });
                    }}
                    disabled={isTodayLoading}
                  >
                    {isCurrentlyPaused ? 'Resume Work' : 'Pause Work'}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="grid gap-3 sm:grid-cols-3">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="text-base font-medium">{isTodayLoading ? 'Loading...' : todayAttendance?.status ?? 'absent'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Check-in</div>
                <div className="text-base font-medium">
                  {todayAttendance?.checkIn ? dayjs(todayAttendance.checkIn).format('HH:mm') : '-'}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Time</div>
                <div className="text-base font-medium">
                  {isTodayLoading ? '-' : formatTime(liveActiveMins)} {isCurrentlyPaused && <span className="text-xs text-amber-500 font-normal ml-1">(Paused)</span>}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Check-out</div>
                <div className="text-base font-medium">
                  {todayAttendance?.checkOut ? dayjs(todayAttendance.checkOut).format('HH:mm') : '-'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 flex gap-2 sm:flex max-w-[800px]">
            {isAdmin && (
              <Input
                placeholder="Filter employee ID"
                value={employeeIdFilter}
                onChange={(event) => {
                  setEmployeeIdFilter(event.target.value);
                  setPage(1);
                }}
              />
            )}
            <Input
              type="date"
              value={fromDate}
              onChange={(event) => {
                setFromDate(event.target.value);
                setPage(1);
              }}
              placeholder="From"
            />
            <Input
              type="date"
              value={toDate}
              onChange={(event) => {
                setToDate(event.target.value);
                setPage(1);
              }}
              placeholder="To"
            />
          </div>

          {isAdmin && (
            <Button onClick={() => setIsModalOpen(true)} className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Attendance
            </Button>
          )}
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-lg">Attendance Records</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Showing records for {isAdmin ? 'all employees' : 'your account'}
            </div>
          </CardHeader>

          <CardContent>
            <DataTable
              data={attendances}
              columns={columns}
              isLoading={isLoading}
              emptyText="No attendance records found"
            />
          </CardContent>

          <CardFooter>
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              perPage={10}
              onPageChange={setPage}
            />
          </CardFooter>
        </Card>
      </div>

      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        isSaving={isCreating}
        error={null}
        isAdmin={isAdmin}
      />

      <AttendanceModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedAttendance(null);
        }}
        onSubmit={handleUpdate}
        isSaving={isUpdating}
        error={null}
        initialValues={
          selectedAttendance
            ? {
              employeeId: selectedAttendance.employee,
              date: selectedAttendance.date,
              checkIn: selectedAttendance.checkIn ?? '',
              checkOut: selectedAttendance.checkOut ?? '',
              remarks: selectedAttendance.remarks,
              isAutoCheckout: false,
            }
            : undefined
        }
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default AttendancePage;

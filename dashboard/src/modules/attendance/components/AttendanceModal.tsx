"use client"

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { attendanceSchema, type AttendanceFormType } from '@/modules/attendance/validations/attendance.schema';
import ErrorText from '@/shared/components/ErrorText';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AttendanceFormType) => void;
  isSaving: boolean;
  error?: unknown;
  initialValues?: AttendanceFormType;
  isAdmin: boolean;
}

export const AttendanceModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSaving,
//   error,
  initialValues,
  isAdmin,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttendanceFormType>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      employeeId: '',
      date: '',
      checkIn: '',
      checkOut: '',
      remarks: '',
      isAutoCheckout: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        employeeId: initialValues?.employeeId || '',
        date: initialValues?.date
          ? dayjs(initialValues.date).format('YYYY-MM-DD')
          : '',
        checkIn: initialValues?.checkIn
          ? dayjs(initialValues.checkIn).format('YYYY-MM-DDTHH:mm')
          : '',
        checkOut: initialValues?.checkOut
          ? dayjs(initialValues.checkOut).format('YYYY-MM-DDTHH:mm')
          : '',
        remarks: initialValues?.remarks || '',
        isAutoCheckout: initialValues?.isAutoCheckout ?? false,
      });
    }
  }, [isOpen, initialValues, reset]);

  const handleFormSubmit = (values: AttendanceFormType) => {
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden rounded-xl p-0 sm:max-w-[520px]">
        <DialogHeader className="border-b border-border p-5 px-6">
          <DialogTitle className="text-base font-semibold">
            {initialValues ? 'Edit Attendance' : 'Record Attendance'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-6">
          {isAdmin ? (
            <div>
              <Label className="text-xs">Employee ID</Label>
              <Input
                {...register('employeeId')}
                className="h-9 text-[13px]"
                placeholder="Employee ObjectId"
              />
              {errors.employeeId && <ErrorText message={errors.employeeId.message} />}
            </div>
          ) : (
            <input type="hidden" {...register('employeeId')} />
          )}

          <div>
            <Label className="text-xs">Date</Label>
            <Input
              {...register('date')}
              type="date"
              className="h-9 text-[13px]"
            />
            {errors.date && <ErrorText message={errors.date.message} />}
          </div>

          <div>
            <Label className="text-xs">Check-in</Label>
            <Input
              {...register('checkIn')}
              type="datetime-local"
              className="h-9 text-[13px]"
            />
            {errors.checkIn && <ErrorText message={errors.checkIn.message} />}
          </div>

          <div>
            <Label className="text-xs">Check-out</Label>
            <Input
              {...register('checkOut')}
              type="datetime-local"
              className="h-9 text-[13px]"
            />
            {errors.checkOut && <ErrorText message={errors.checkOut.message} />}
          </div>

          <div>
            <Label className="text-xs">Remarks</Label>
            <Input
              {...register('remarks')}
              className="h-9 text-[13px]"
              placeholder="Optional explanation"
            />
            {errors.remarks && <ErrorText message={errors.remarks.message} />}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isAutoCheckout"
              type="checkbox"
              className="h-4 w-4"
              {...register('isAutoCheckout')}
            />
            <Label htmlFor="isAutoCheckout" className="text-xs">
              Auto-checkout record
            </Label>
          </div>

          {/* {error && (
            <ErrorText message={(error as any)?.message || 'Something went wrong'} />
          )} */}

          <DialogFooter className="flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : initialValues ? 'Save changes' : 'Create record'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

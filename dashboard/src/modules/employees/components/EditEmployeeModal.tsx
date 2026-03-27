import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  updateEmployeeApi,
} from '@/modules/employees/api/employees.api';

import type {
  Employee,
  EmployeeStatus,
} from '@/modules/employees/types/employees.types';

interface EditEmployeeModalProps {
  isOpen: boolean;
  employee: Employee | null;
  onClose: () => void;
}

export const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  employee,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active' as EmployeeStatus,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!employee) return;

    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role || '',
      department: employee.department || '',
      status: employee.status,
    });
    setError(null);
    setSubmitted(false);
  }, [employee, isOpen]);

  const updateMutation = useMutation({
    mutationFn: updateEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setError(null);
      setSubmitted(false);
      onClose();
    },
    onError: (e: any) => {
      setSubmitted(false);
      const message =
        e?.message ||
        e?.data?.message ||
        e?.response?.data?.message ||
        'Failed to update employee';
      setError(message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, status: value as EmployeeStatus });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee?._id) return;
    setSubmitted(true);
    setError(null);
    updateMutation.mutate({
      id: employee._id,
      ...formData,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden gap-0 rounded-xl">
        <DialogHeader className="p-5 px-6 border-b border-border">
          <DialogTitle className="text-base font-semibold text-foreground">Edit Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name" className="text-xs font-medium text-foreground">
              Full Name
            </Label>
            <Input
              id="edit-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-email" className="text-xs font-medium text-foreground">
              Email
            </Label>
            <Input
              id="edit-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-role" className="text-xs font-medium text-foreground">
              Role
            </Label>
            <Input
              id="edit-role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-department" className="text-xs font-medium text-foreground">
              Department
            </Label>
            <Input
              id="edit-department"
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-status" className="text-xs font-medium text-foreground">
              Status
            </Label>
            <Select value={formData.status} onValueChange={handleSelectChange} required>
              <SelectTrigger id="edit-status" className="text-[13px] h-9">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active" className="text-[13px]">Active</SelectItem>
                <SelectItem value="On Leave" className="text-[13px]">On Leave</SelectItem>
                <SelectItem value="Offline" className="text-[13px]">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-destructive text-xs">{error}</p>}

          <DialogFooter className="mt-2 sm:justify-end gap-2 flex-col sm:flex-row">
            <Button
              type="button"
              variant="secondary"
              className=""
              onClick={onClose}
              disabled={submitted}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className=""
              disabled={submitted}
            >
              {submitted ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import React, { useState } from 'react';
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
import { createEmployeeApi, type EmployeeStatus } from '@/modules/employees/services/employees.api';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: string;
    department: string;
    status: EmployeeStatus;
  }>({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setError(null);
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', role: '', department: '', status: 'Active' });
    },
    onError: (e: any) => {
      setSubmitted(false);
      const message =
        e?.message ||
        e?.data?.message ||
        e?.response?.data?.message ||
        'Failed to add employee';
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
    setSubmitted(true);
    setError(null);
    createMutation.mutate({ ...formData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden gap-0 rounded-xl">
        <DialogHeader className="p-5 px-6 border-b border-border">
          <DialogTitle className="text-base font-semibold text-foreground">Add New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-xs font-medium text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. John Smith"
              required
              value={formData.name}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs font-medium text-foreground">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. john@company.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role" className="text-xs font-medium text-foreground">
              Role
            </Label>
            <Input
              id="role"
              name="role"
              placeholder="e.g. Senior Developer"
              required
              value={formData.role}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department" className="text-xs font-medium text-foreground">
              Department
            </Label>
            <Input
              id="department"
              name="department"
              placeholder="e.g. Engineering"
              required
              value={formData.department}
              onChange={handleChange}
              className="text-[13px] h-9"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status" className="text-xs font-medium text-foreground">
              Status
            </Label>
            <Select value={formData.status} onValueChange={handleSelectChange} required>
              <SelectTrigger id="status" className="text-[13px] h-9">
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
              className="text-[13px] h-9"
              onClick={onClose}
              disabled={submitted}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-[13px] h-9 bg-brand-primary hover:bg-brand-primary-hover text-white"
              disabled={submitted}
            >
              {submitted ? 'Adding...' : 'Add Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

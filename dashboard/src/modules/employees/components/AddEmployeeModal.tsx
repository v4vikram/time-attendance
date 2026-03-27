"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  employeeSchema,
  type EmployeeFormType,
} from "@/modules/employees/validations/employee.schema"

import { useEmployeeMutations } from "@/modules/employees/hooks/useEmployeeMutations"
import ErrorText from "@/shared/components/ErrorText"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createEmployee, isCreating, createError } = useEmployeeMutations()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      department: "",
      status: "Active",
    },
  })

  const onSubmit = (data: EmployeeFormType) => {
    createEmployee(data, {
      onSuccess: () => {
        reset()
        onClose()
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden rounded-xl p-0 sm:max-w-[480px]">
        {/* Header */}
        <DialogHeader className="border-b border-border p-5 px-6">
          <DialogTitle className="text-base font-semibold">
            Add New Employee
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
          {/* Name */}
          <div>
            <Label className="text-xs">Full Name</Label>
            <Input {...register("name")} className="h-9 text-[13px]" />
            {errors.name && <ErrorText message={errors.name.message} />}
          </div>

          {/* Email */}
          <div>
            <Label className="text-xs">Email</Label>
            <Input
              {...register("email")}
              type="email"
              className="h-9 text-[13px]"
            />
            {errors.email && <ErrorText message={errors.email.message} />}
          </div>

          {/* Role */}
          <div>
            <Label className="text-xs">Role</Label>
            <Input {...register("role")} className="h-9 text-[13px]" />
            {errors.role && <ErrorText message={errors.role.message} />}
          </div>

          {/* Department */}
          <div>
            <Label className="text-xs">Department</Label>
            <Input {...register("department")} className="h-9 text-[13px]" />
            {errors.department && (
              <ErrorText message={errors.department.message} />
            )}
          </div>

          {/* Status */}
          <div>
            <Label className="text-xs">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-9 text-[13px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* API Error */}
          {createError && (
            <ErrorText
              message={(createError as any)?.message || "Something went wrong"}
            />
          )}

          {/* Footer */}
          <DialogFooter className="flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Adding..." : "Add Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client";

import * as React from "react";
import { useFormikContext } from "formik";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuCalendar } from "react-icons/lu";

interface BirthDateInputProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  placeholder?: string;
}

export const BirthDateInput = React.forwardRef<
  HTMLDivElement,
  BirthDateInputProps
>(({ name, placeholder = "Select date", className, ...props }, ref) => {
  const formik = useFormikContext<any>();
  const fieldValue = formik?.values?.[name];

  const date =
    fieldValue instanceof Date
      ? fieldValue
      : fieldValue
      ? new Date(fieldValue)
      : undefined;

  const [open, setOpen] = React.useState(false);

  const handleSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    formik.setFieldValue(name, newDate.toISOString());
    formik.setFieldTouched(name, true, false);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={name}
            className="justify-between"
            type="button"
          >
            {date ? (
              date.toLocaleDateString("en-AU")
            ) : (
              <p className="text-muted-foreground">{placeholder}</p>
            )}
            <LuCalendar />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

BirthDateInput.displayName = "BirthDateInput";

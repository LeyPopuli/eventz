import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DateTimePicker({ form, fieldName }: { form: any; fieldName: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
    if (selectedDate) {
      const [hours, minutes] = event.target.value.split(":").map(Number);
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours);
      updatedDate.setMinutes(minutes);
      form.setValue(fieldName, updatedDate);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      form.setValue(fieldName, date);
    } else {
      form.setValue(fieldName, date || null);
    }
  };

  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="text-muted-foreground hover:bg-transparent">
            {selectedDate ? (
              format(selectedDate, "P", { locale: es })
            ) : (
              <span>Selecciona la fecha</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => handleDateSelect(date ?? new Date())}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-2">
        <Input
          id="time-picker"
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="text-muted-foreground"
        />
      </div>
    </div>
  );
}
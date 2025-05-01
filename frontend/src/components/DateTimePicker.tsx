import React from 'react';
import { format } from 'date-fns';

interface DateTimePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  className?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  onChange,
  minDate,
  className
}) => {
  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  return (
    <input
      type="datetime-local"
      value={formatDate(selectedDate)}
      min={minDate ? formatDate(minDate) : undefined}
      onChange={(e) => onChange(new Date(e.target.value))}
      className={className}
    />
  );
};

export default DateTimePicker; 
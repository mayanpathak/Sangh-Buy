import React from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className }) => {
  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={minDate}
      className={className}
    />
  );
};

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
}; 
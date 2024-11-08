// components/atoms/DatePickerComponent.tsx
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerComponentProps {
  selectedDate: Date | null
  onChange: (date: Date | null) => void
  label: string
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  onChange,
  label,
}) => {
  return (
    <div>
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className="p-2 border border-gray-300 rounded-md"
        placeholderText="Select a date"
      />
    </div>
  )
}

export default DatePickerComponent

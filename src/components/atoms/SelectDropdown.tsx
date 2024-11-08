import React from 'react'

interface SelectFieldProps {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { label: string; value: string }[] | string[]
  placeholder?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="rounded px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {Array.isArray(options) &&
          options.map((option) =>
            typeof option === 'string' ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
      </select>
    </div>
  )
}

export default SelectField

import React from 'react'

interface InputFieldProps {
  label?: string
  placeholder?: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  type?: string
  className?: string
  error?: string | boolean // Add the error prop here
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = 'Enter text...',
  value,
  name,
  onChange,
  onBlur,
  type = 'text',
  className,
  error, // Destructure error
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-gray-500">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`rounded px-4 py-2 border border-gray-300 focus:outline-none w-full text-gray-500 ${className}`}
      />
      {error && <div className="text-xs text-red-600">{error}</div>}{' '}
      {/* Display error */}
    </div>
  )
}

export default InputField

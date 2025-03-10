import React from 'react'

interface InputFieldProps {
  label?: string
  placeholder?: string
  value: string | number
  name: string
  compulsory?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  type?: string
  className?: string
  error?: string | boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = 'Enter text...',
  value,
  name,
  compulsory,
  onChange,
  onBlur,
  type = 'text',
  className,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-gray-500">
          {label}{' '}
          <span className="text-red-600">{compulsory === true ? '*' : ''}</span>
        </label>
      )}
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
    </div>
  )
}

export default InputField

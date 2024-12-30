interface TextAreaFieldProps {
  label?: string
  placeholder?: string
  name: string
  value: string
  compulsory?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  rows?: number
  error?: string | boolean
  maxLength?: number // Optional maxLength for character limit
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder = 'Enter text...',
  name,
  value,
  compulsory,
  onChange,
  onBlur,
  rows = 4,
  error,
  maxLength,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-gray-500">
          {label}
          <span className="text-red-600">{compulsory ? '*' : ''}</span>
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
      />
      {error && <div className="text-xs text-red-600">{error}</div>}
      <div className="flex justify-end text-sm text-gray-500">
        {value.length} {maxLength ? `/ ${maxLength}` : ''} characters
      </div>
    </div>
  )
}

export default TextAreaField

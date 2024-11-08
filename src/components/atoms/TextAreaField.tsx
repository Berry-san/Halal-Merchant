interface TextAreaFieldProps {
  label?: string
  placeholder?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  rows?: number
  error?: string | boolean // Add the error prop here
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder = 'Enter text...',
  name,
  value,
  onChange,
  onBlur,
  rows = 4,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label>{label}</label>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className="rounded px-4 py-2 border border-gray-300 focus:outline-none"
      />
      {error && <div className="text-red-600 text-xs">{error}</div>}{' '}
    </div>
  )
}

export default TextAreaField

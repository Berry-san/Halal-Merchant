// components/atoms/SearchBar.tsx
import React from 'react'

interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <label htmlFor="search">Search</label>
      <input
        type="search"
        name="search"
        value={value}
        onChange={onChange}
        className="rounded w-full md:w-1/3 lg:w-1/3 px-5 py-2 border-b border-secondary text-sm text-gray-500 bg-[#f4f4f4] focus:outline-none"
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  )
}

export default SearchBar

// ActionDropdown.tsx
import React, { useState, useRef, useEffect } from 'react'

interface ActionDropdownProps {
  onEdit: () => void
  onDelete: () => void
  disabled?: boolean
}

interface DropdownButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

// Reusable button component with TypeScript props
const DropdownButton: React.FC<DropdownButtonProps> = ({
  onClick,
  className = '',
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 ${className}`}
  >
    {children}
  </button>
)

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  onEdit,
  onDelete,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Type guard to ensure target is Element
      if (!(event.target instanceof Element)) return

      // Close dropdown if clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
      // Close confirmation if clicking outside
      if (
        confirmationRef.current &&
        !confirmationRef.current.contains(event.target)
      ) {
        setShowConfirmation(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDelete = (): void => {
    setShowConfirmation(true)
    setIsOpen(false)
  }

  const confirmDelete = (): void => {
    onDelete()
    setShowConfirmation(false)
  }

  // SVG Components with proper TypeScript types
  const EllipsisIcon: React.FC = () => (
    <svg
      className="w-5 h-5 text-gray-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )

  const EditIcon: React.FC = () => (
    <svg
      className="w-4 h-4 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  )

  const DeleteIcon: React.FC = () => (
    <svg
      className="w-4 h-4 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Ellipsis Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`inline-flex p-1 rounded-full transition-colors ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-100 cursor-pointer'
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        disabled={disabled}
      >
        <EllipsisIcon />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 w-32 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            <DropdownButton
              onClick={() => {
                onEdit()
                setIsOpen(false)
              }}
              className="text-gray-700"
            >
              <EditIcon />
              Edit
            </DropdownButton>
            <DropdownButton onClick={handleDelete} className="text-red-600">
              <DeleteIcon />
              Delete
            </DropdownButton>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div
            ref={confirmationRef}
            className="relative max-w-sm p-6 mx-4 bg-white rounded-lg"
          >
            <h3 className="mb-4 text-lg font-semibold">Confirm Delete</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionDropdown

import React, { useEffect } from 'react'

interface ActionMenuProps {
  onEdit: () => void
  onDelete: () => void
  isOpen: boolean
  onClose: () => void
  onOpen: () => void // Separate handler for opening
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  onEdit,
  onDelete,
  isOpen,
  onClose,
  onOpen,
}) => {
  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.action-menu')) {
        onClose()
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  // Toggle menu open/close without directly invoking onEdit
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  return (
    <div className="relative action-menu">
      <button
        onClick={handleMenuToggle}
        className="text-4xl text-gray-500 hover:text-gray-700"
      >
        &#x2026; {/* ellipsis icon for actions */}
      </button>
      {isOpen && (
        <div className="fixed right-0 z-10 w-40 mt-2 bg-white border border-gray-200 rounded shadow-lg">
          <button
            onClick={() => {
              onEdit()
              onClose()
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete()
              onClose()
            }}
            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ActionMenu

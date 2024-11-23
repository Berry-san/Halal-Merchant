import React, { ReactNode, MouseEvent } from 'react'

interface ModalProps {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
  className?: string // Accept additional class names as a prop
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  className,
}) => {
  if (!isVisible) return null

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'backdrop') {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center m-0 bg-black bg-opacity-25 backdrop-blur-sm"
      id="backdrop"
      onClick={handleClose}
    >
      <div
        className={`relative flex flex-col mx-3 space-y-4 bg-white rounded ${
          className || ''
        }`}
      >
        <div className="text-black">{children}</div>
      </div>
    </div>
  )
}

export default Modal

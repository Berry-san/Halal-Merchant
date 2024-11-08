import React, { ReactNode, MouseEvent } from 'react'

interface ModalProps {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
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
      <div className="relative flex flex-col max-w-2xl p-4 mx-3 space-y-4 bg-white rounded">
        <div className="p-4 text-black scroll-black">{children}</div>
      </div>
    </div>
  )
}

export default Modal
